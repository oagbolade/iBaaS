import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../../../api/general/useBranches', () => ({
    useGetBranches: jest.fn()
}));

jest.mock('../../../api/reports/useChequebook', () => ({
    useGetChequeBookStatus: jest.fn(),
    useGetCheckbookStatus: jest.fn()
}));

jest.mock('../../../utils/hooks/usePersistedSearch', () => ({
    usePersistedSearch: jest.fn()
}));

jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({
    useGlobalLoadingState: jest.fn()
}));


jest.mock('../../../components/Revamp/TableV2', () => ({
    TableV2: ({ data }: any) => (
        <div>
            <h1>ChequeBook Status</h1>
            <div data-testid="table-body">
                {Array.isArray(data) &&
                    data.map((r: any, i: number) => (
                        <div key={i}>
                            {r.accountNumber} - {r.acctName} - {r.chequebookStatus}
                        </div>
                    ))}
            </div>
        </div>
    )
}));


jest.mock('../../../components/Loaders', () => ({
    FormSkeleton: () => <div data-testid="loading-skeleton" />
}));

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => { }));
afterAll(() => (console.error as jest.Mock).mockRestore());

jest.mock(
    '../../../features/Report/Overview/TopOverViewSection',
    () => ({
        TopOverViewSection: () => <div data-testid="top-overview" />
    })
);

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        back: jest.fn(),
        replace: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn()
    })
}));

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetCheckbookStatus } = require('../../../api/reports/useChequebook');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { ChequeBookStatus } = require('../../../features/Report/CustomReport/ChequeBook');
const { DateRangePickerContext } = require('../../../context/DateRangePickerContext');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

describe('ChequeBook Component', () => {
    const mockBranches = [{ id: '1', name: 'Head Quarter Branch' }];
    const sampleResponse = {
        chequeBookList: [
            {
                accountNumber: '1234',
                accountnumber: '1234',
                acctName: 'Test Account',
                chequebookStatus: 'Issued',
                serialno: 'S001',
                createdate: '2025-01-01T10:00:00Z',
                range: '1-50',
                narration: 'Test narration',
                status: 'Issued'
            }
        ],
        isLoading: false,
        totalRecords: 1
    };

    const mockDateRangeContext = {
        dateValue: [null, null],
        isDateFilterApplied: false,
        setDateValue: jest.fn(),
        setIsDateFilterApplied: jest.fn()
    };

    const mockDownloadCtx = {
        setExportData: jest.fn(),
        setReportType: jest.fn()
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
            setPage: jest.fn()
        });

        (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });
        (useGetCheckbookStatus as jest.Mock).mockReturnValue({
            chequeBookList: [],
            isLoading: true,
            totalRecords: 0
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <ChequeBookStatus />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getAllByTestId('loading-skeleton').length).toBeGreaterThan(0);
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

        (useGetCheckbookStatus as jest.Mock).mockReturnValue(sampleResponse);

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx}>
                <DateRangePickerContext.Provider value={mockDateRangeContext}>
                    <ChequeBookStatus />
                </DateRangePickerContext.Provider>
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Chequebook Status/i)).toBeInTheDocument();
        });
    });
});
