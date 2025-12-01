import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetBranches } from '../../../api/general/useBranches';
import { useGetCustomerBalance } from '../../../api/reports/useCustomerbalance';
import { useGetProductTypeByid } from '../../../api/setup/useProduct';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '../../../utils/hooks/useGlobalLoadingState';

import { CustomerBalances } from '../../../features/Report/CustomReport/CustomerBalances';
import { DateRangePickerContext } from '../../../context/DateRangePickerContext';
import { DownloadReportContext } from '../../../context/DownloadReportContext';
import { ReportType } from '@/constants/downloadReport';


jest.mock('../../../api/general/useBranches');
jest.mock('../../../api/reports/useCustomerbalance');
jest.mock('../../../api/setup/useProduct');
jest.mock('../../../utils/hooks/usePersistedSearch');
jest.mock('../../../utils/hooks/useGlobalLoadingState');


jest.mock('../../../components/Revamp/TableV2', () => ({
    TableV2: ({ data, showHeader }: any) => (
        <div data-testid="mock-table">
            {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
            {showHeader?.secondaryTitle && <p>{showHeader.secondaryTitle}</p>}

            <div data-testid="table-body">
                {Array.isArray(data) &&
                    data.map((r: any, i: number) => (
                        <div key={i}>
                            {r.accountnumber || r.accountNumber} - {r.accounttitle || r.acctName} -{' '}
                            {String(r.bkbalance || r.bkBal)}
                        </div>
                    ))}
            </div>
        </div>
    ),
}));

jest.mock('../../../features/Report/Overview/TopOverViewSingleCalenderSection', () => ({
    TopOverViewSingeCalendarSection: () => <div />,
}));


beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => { }));
afterAll(() => (console.error as jest.Mock).mockRestore());


describe('CustomerBalances Component', () => {
    const mockBranches = [{ id: '1', name: 'HQ' }];

    const samplePaged = {
        customerBalanceList: {
            pagedCustomerBalances: [
                {
                    accountnumber: '1234567890',
                    accounttitle: 'Customer One',
                    bkbalance: 5000,
                    availBal: 2500,
                },
            ],
            grandTotal: 5000,
            totalAvaiBal: 2500,
            totalBkBal: 5000,
        },
        isLoading: false,
        totalRecords: 1,
    };

    const sampleDownload = {
        customerBalanceList: {
            pagedCustomerBalances: [
                {
                    accountnumber: '1234567890',
                    accounttitle: 'Customer One',
                    bkbalance: 5000,
                    availBal: 2500,
                },
            ],
        },
        isLoading: false,
    };

    const mockDateRangeContext = {
        dateValue: [dayjs(), dayjs()] as [Dayjs, Dayjs],
        isDateFilterApplied: false,
        setDateValue: jest.fn(),
        setIsDateFilterApplied: jest.fn(),
    };

    const mockDownloadCtx = {
        exportData: [],
        setExportData: jest.fn(),
        reportType: 'CustomerBalance' as ReportType,
        setReportType: jest.fn(),
        reportQueryParams: {},
        setReportQueryParams: jest.fn(),
        reportDescription: '',
        setReportDescription: jest.fn(),
    };

    // Helper renderer
    const renderWithQuery = (ui: React.ReactElement) =>
        render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

    beforeEach(() => {
        jest.clearAllMocks();
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
        (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: false });
        (useGetProductTypeByid as jest.Mock).mockReturnValue({ data: [] });
    });

    it('shows skeleton loader while loading', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn(),
        });

        (useGetCustomerBalance as jest.Mock).mockReturnValue({
            customerBalanceList: [],
            isLoading: true,
            totalRecords: 0,
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <CustomerBalances />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
        });
    });

    it('renders table data when search is active and API returns results', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn(),
        });

        (useGetCustomerBalance as jest.Mock).mockImplementation((params: any) => {
            if (params?.getAll) return sampleDownload;
            return samplePaged;
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <CustomerBalances />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Customer Balances/i)).toBeInTheDocument();
            expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
            expect(screen.getByText(/Customer One/i)).toBeInTheDocument();
            expect(screen.getByText(/5000/i)).toBeInTheDocument();
        });
    });
});
