jest.mock('../../../api/general/useBranches', () => ({
    useGetBranches: jest.fn(),
}));

jest.mock('../../../api/reports/useStandingInstructions', () => ({
    useGetStandingIntruction: jest.fn(),
}));

jest.mock('../../../utils/hooks/usePersistedSearch', () => ({
    usePersistedSearch: jest.fn(),
}));

jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({
    useGlobalLoadingState: jest.fn(),
}));


jest.mock('../../../components/Table', () => ({
    MuiTableContainer: ({ data, showHeader }: any) => (
        <div>
            {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
            {showHeader?.secondaryTitle && <p>{showHeader.secondaryTitle}</p>}
            <div data-testid="table-body">
                {Array.isArray(data) &&
                    data.map((r: any, i: number) => (
                        <div key={i}>
                            {r.fromaccountnumber || r.fromAccount} -{' '}
                            {r.toaccountnumber || r.toAccount} -{' '}
                            {r.frequency || r.sifrequency}
                        </div>
                    ))}
            </div>
        </div>
    ),
    TableSingleAction: () => <div />,
}));


jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({
    TopOverViewSection: () => <div />,
}));

import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetBranches } from '../../../api/general/useBranches';
import { useGetStandingIntruction } from '../../../api/reports/useStandingInstructions';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '../../../utils/hooks/useGlobalLoadingState';

import { StandingInstructions } from '../../../features/Report/CustomReport/StandingInstructions';
import { DateRangePickerContext } from '../../../context/DateRangePickerContext';
import { DownloadReportContext } from '../../../context/DownloadReportContext';
import { ReportType } from '@/constants/downloadReport';

// Silence console errors/warnings for cleaner test output
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
});

describe('StandingInstructions Component', () => {
    const mockBranches = [{ id: '1', name: 'HQ' }];

    const sampleSI = [
        {
            sinumber: 'SI001',
            fromaccountnumber: '111111',
            toaccountnumber: '222222',
            create_dt: moment().toISOString(),
            nextDate: moment().add(1, 'day').toISOString(),
            frequency: 'Monthly',
            sireason: 'Test reason',
        },
    ];

    const mockDateRangeContext = {
        dateValue: [dayjs(), dayjs()] as [Dayjs, Dayjs],
        isDateFilterApplied: false,
        setDateValue: jest.fn(),
        setIsDateFilterApplied: jest.fn(),
    };

    const mockDownloadCtx = {
        exportData: [],
        setExportData: jest.fn(),
        reportType: 'StandingInstruction' as ReportType,
        setReportType: jest.fn(),
        reportQueryParams: {},
        setReportQueryParams: jest.fn(),
        reportDescription: '',
        setReportDescription: jest.fn(),
    };

    const renderWithQuery = (ui: React.ReactElement) =>
        render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

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
            setPage: jest.fn(),
        });

        (useGetStandingIntruction as jest.Mock).mockReturnValue({
            siTransactions: [],
            isLoading: true,
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <StandingInstructions />
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

        (useGetStandingIntruction as jest.Mock).mockImplementation((params: any) => {
            if (params?.getAll) return { siTransactions: sampleSI };
            return { siTransactions: sampleSI, isLoading: false };
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <StandingInstructions />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            // header
            expect(screen.getAllByText(/Standing Instructions/i)[0]).toBeInTheDocument();

            // table row
            expect(screen.getByText(/111111 - 222222 - Monthly/i)).toBeInTheDocument();

            // subtitle
            expect(
                screen.getAllByText(/See a directory of all standing instructions this system\./i)[0]
            ).toBeInTheDocument();
        });
    });
});
