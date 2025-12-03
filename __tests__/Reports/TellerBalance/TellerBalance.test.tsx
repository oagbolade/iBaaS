jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/'
  })
}));

jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/reports/useGetTellerBalanceReport', () => ({ useGetTellerBalanceReport: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));


jest.mock('../../../components/Table', () => ({
  MuiTableContainer: ({ data, showHeader }: any) => (
    <div>
      {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
      {showHeader?.secondaryTitle && <p data-testid="secondary-title">{showHeader.secondaryTitle}</p>}
      <div data-testid="table-body">
        {Array.isArray(data) && data.map((r: any, i: number) => <div key={i}>{r.tillNumber} - {r.tillName} - {r.staffName}</div>)}
      </div>
    </div>
  )
}));
jest.mock('../../../components/Table', () => ({
  __esModule: true,
  MuiTableContainer: ({ data, showHeader }: any) => (
    <div>
      {showHeader?.mainTitle && (
        <h1 data-testid="main-title">{showHeader.mainTitle}</h1>
      )}

      {showHeader?.secondaryTitle && (
        <p data-testid="secondary-title">{showHeader.secondaryTitle}</p>
      )}

      <div data-testid="table-body">
        {Array.isArray(data) &&
          data.map((r: any, i: number) => (
            <div key={i}>{r.tillNumber} - {r.tillName} - {r.staffName}</div>
          ))}
      </div>
    </div>
  ),
  renderEmptyTableBody: () => (
    <div data-testid="empty-table">No data</div>
  )
}));



jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({ TopOverViewSection: () => <div data-testid="top-overview" /> }));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetTellerBalanceReport } = require('../../../api/reports/useGetTellerBalanceReport');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { TellerBalance } = require('../../../features/Report/CustomReport/TellerBalance');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  (console.warn as jest.Mock).mockRestore();
});

describe('TellerBalance Component', () => {
  const mockBranches = [{ id: '1', name: 'HQ' }];
  const samplePaged = {
    tellerBalanceList: [
      {
        tillNumber: 'TILL001',
        tillName: 'Main Till',
        staffName: 'John Doe',
        branchName: 'HQ',
        userid: 'user1',
        bkBalance: 10000
      }
    ],
    isLoading: false
  };
  const sampleDownload = {
    tellerBalanceList: [
      {
        tillNumber: 'TILL001',
        tillName: 'Main Till',
        staffName: 'John Doe',
        branchName: 'HQ',
        userid: 'user1',
        bkBalance: 10000
      }
    ]
  };

  const mockDownloadCtx = {
    exportData: [],
    setExportData: jest.fn(),
    reportType: '',
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
      page: 1,
      setPage: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn()
    });
    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });
    (useGetTellerBalanceReport as jest.Mock).mockReturnValue({ tellerBalanceList: [], isLoading: true });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <TellerBalance />
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
      page: 1,
      setPage: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn()
    });

    (useGetTellerBalanceReport as jest.Mock).mockImplementation((params: any) => {
      if (params?.getAll) return sampleDownload;
      return samplePaged;
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <TellerBalance />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('table-body')).toBeInTheDocument();
      expect(screen.getByText(/TILL001 - Main Till - John Doe/i)).toBeInTheDocument();
      expect(mockDownloadCtx.setExportData).toHaveBeenCalled();
      expect(mockDownloadCtx.setReportType).toHaveBeenCalledWith('TellerBalance');
    });
  });
});