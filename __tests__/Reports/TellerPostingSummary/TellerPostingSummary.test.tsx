// Mocks
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TellerPosting } from '../../../features/Report/CustomReport/TellerPosting';
import { DownloadReportContext } from '../../../context/DownloadReportContext';

jest.mock('../../../api/reports/useGetTellerPosting', () => ({
  useGetTellerPosting: jest.fn(),
}));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({
  usePersistedSearch: jest.fn(),
}));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({
  useGlobalLoadingState: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/',
    query: {},
  }),
}));

jest.mock('../../../components/Table', () => ({
  MuiTableContainer: ({ data, showHeader }: any) => (
    <div>
      {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
      {showHeader?.secondaryTitle && (
        <p data-testid="secondary-title">{showHeader.secondaryTitle}</p>
      )}
      <div data-testid="table-body">
        {Array.isArray(data) &&
          data.map((r: any, i: number) => (
            <div key={i}>
              {r.accountNumber || r.accountnumber} -{' '}
              {r.accounttitle || r.acctName} - {r.narration || r.narr}
            </div>
          ))}
      </div>
    </div>
  ),
  TableSingleAction: () => <div>View More</div>,
}));

jest.mock('../../../components/Loaders', () => ({
  FormSkeleton: () => <div data-testid="loading-skeleton" />,
}));

jest.mock('@mui/material/Accordion', () => ({ children }: any) => <div>{children}</div>);
jest.mock('@mui/material/AccordionSummary', () => ({ children }: any) => <div>{children}</div>);
jest.mock('@mui/material/AccordionDetails', () => ({ children }: any) => <div>{children}</div>);
jest.mock('@mui/material/IconButton', () => ({ children }: any) => <div>{children}</div>);

// Import hooks after mocking
import { useGetTellerPosting } from '../../../api/reports/useGetTellerPosting';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '../../../utils/hooks/useGlobalLoadingState';
import { ReportType } from '@/constants/downloadReport';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  (console.warn as jest.Mock).mockRestore();
});

describe('TellerPosting Component (summary tests)', () => {
  const samplePaged = {
    tellerPostByDateList: [
      {
        accountNumber: '999888777',
        accounttitle: 'Teller Account',
        narration: 'Teller narration',
        valuedate: '2025-01-01',
        refNo: 'REF001',
      },
    ],
    isLoading: false,
    totalRecords: 1,
  };

  const sampleDownload = {
    tellerPostByDateList: [
      {
        accountNumber: '999888777',
        accounttitle: 'Teller Account',
        narration: 'Teller narration',
        valuedate: '2025-01-01',
        refNo: 'REF001',
      },
    ],
  };

  const renderWithQuery = (ui: React.ReactElement) =>
    render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

  
  const mockDownloadCtx = {
    exportData: [],
    setExportData: jest.fn(),
    reportType: 'TellerPostingSummary' as ReportType, 
    setReportType: jest.fn(),
    reportQueryParams: {},
    setReportQueryParams: jest.fn(),
    reportDescription: '',
    setReportDescription: jest.fn(),
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockDownloadCtx.setExportData.mockReset();
    mockDownloadCtx.setReportType.mockReset();
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

    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });

    (useGetTellerPosting as jest.Mock).mockReturnValue({
      tellerPostByDateList: [],
      isLoading: true,
      totalRecords: 0,
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <TellerPosting />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });
  });

  it('renders table data when search is active and API returns results and sets export data', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: {},
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGetTellerPosting as jest.Mock).mockImplementation((params: any) => {
      if (params?.getAll) return sampleDownload;
      return samplePaged;
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <TellerPosting />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('secondary-title')).toHaveTextContent(
        'See a directory of all teller posting in this system.'
      );
      expect(mockDownloadCtx.setExportData).toHaveBeenCalled();
      expect(mockDownloadCtx.setReportType).toHaveBeenCalledWith('TellerPostingSummary');
    });
  });
});
