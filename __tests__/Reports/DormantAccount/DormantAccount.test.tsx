jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/reports/useDormantAccount', () => ({ useGetAllDormantAccount: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));

jest.mock('../../../components/Loaders', () => ({
    FormSkeleton: () => <div data-testid="loading-skeleton" />
}));

jest.mock('../../../components/Table', () => ({
    MuiTableContainer: (props: any) => {
        const { data, showHeader } = props;

        return (
            <div data-testid="mock-table">
                {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
                {showHeader?.secondaryTitle && <p>{showHeader.secondaryTitle}</p>}

                <div data-testid="table-body">
                    {Array.isArray(data) &&
                        data.map((row: any, index: number) => (
                            <div key={index}>
                                {row.accountnumber || row.accountNumber} -{" "}
                                {row.accounttitle || row.acctName} -{" "}
                                {row.officerName || row.customerId}
                            </div>
                        ))}
                </div>
            </div>
        );
    },
    TableSingleAction: () => <div />
}));

jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({
    TopOverViewSection: () => <div />
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetAllDormantAccount } = require('../../../api/reports/useDormantAccount');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { DormantAccount } = require('../../../features/Report/CustomReport/DormantAccount');
const { DateRangePickerContext } = require('../../../context/DateRangePickerContext');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => { }));
afterAll(() => (console.error as jest.Mock).mockRestore());

describe('DormantAccount Component', () => {
    const mockBranches = [{ id: '1', name: 'HQ' }];

    const sampleDormantData = [
        {
            accountnumber: '123456789',
            accounttitle: 'Dormant Account 1',
            officerName: 'Officer One',
            bkbalance: 5000,
            averagebal: 1000,
            customerId: 'CUST001'
        }
    ];

    const renderWithQuery = (ui: React.ReactElement) =>
        render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

    const mockDateRangeContext = {
        dateValue: [null, null],
        isDateFilterApplied: false,
        setDateValue: jest.fn(),
        setIsDateFilterApplied: jest.fn()
    };

    const mockDownloadCtx = { setExportData: jest.fn(), setReportType: jest.fn() };

    beforeEach(() => {
        jest.clearAllMocks();
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
        (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: false });
    });

    it('shows skeleton loader while loading', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn()
        });


        (useGetAllDormantAccount as jest.Mock).mockReturnValue({
            dormantAccountList: [],
            isLoading: true,
            totalRecords: 0
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx as any}>
                <DateRangePickerContext.Provider value={mockDateRangeContext as any}>
                    <DormantAccount />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            const skeletons = screen.getAllByTestId('loading-skeleton');
            expect(skeletons.length).toBeGreaterThan(0);
        });
    });

    it('renders table data when search is active and API returns results', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn()
        });

        (useGetAllDormantAccount as jest.Mock).mockReturnValue({
            dormantAccountList: sampleDormantData,
            isLoading: false,
            totalRecords: 1
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx as any}>
                <DateRangePickerContext.Provider value={mockDateRangeContext as any}>
                    <DormantAccount />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText("Dormant Account")).toBeInTheDocument();
            expect(
                screen.getByText(
                    "See a directory of all dormant account on this system."
                )
            ).toBeInTheDocument();
        });
    });
});
