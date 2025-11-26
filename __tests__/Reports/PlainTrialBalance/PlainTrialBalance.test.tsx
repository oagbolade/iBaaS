jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/reports/usePlainTrialBalance', () => ({ useGetPlainTrialBalance: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));


jest.mock('../../../components/Loaders', () => ({ 
  FormSkeleton: () => <div data-testid="loading-skeleton" /> 
}));

jest.mock('../../../features/Report/Overview/TopOverViewSingleCalenderSection', () => ({ 
  TopOverViewSingeCalendarSection: () => <div>TopOverView</div> 
}));

jest.mock('../../../components/Revamp/TableV2', () => ({
  TableV2: ({ data, showHeader, isSearched }: any) => (
    <div>
      {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
      <div data-testid="table-body">
        {Array.isArray(data) &&
          data.map((r: any, i: number) => (
            <div key={i}>{r.acctName || JSON.stringify(r)}</div>
          ))}
      </div>
      {isSearched && <div data-testid="search-flag">searched</div>}
    </div>
  )
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetPlainTrialBalance } = require('../../../api/reports/usePlainTrialBalance');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { PlainTrialBalance } = require('../../../features/Report/CustomReport/PlainTrialBalance');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterAll(() => {
  (console.warn as jest.Mock).mockRestore();
});

describe('PlainTrialBalance Component', () => {
  const mockBranches = [{ id: '1', name: 'HQ' }];

  const pagedResponse = {
    plainTrialBalanceList: {
      pagedRecords: [
        { glNumber: '1000', oldGLno: '1000', acctName: 'Cash', dr: 5000, cr: 0 }
      ]
    },
    isLoading: false,
    totalRecords: 1
  };

  const renderWithQuery = (ui: React.ReactElement) =>
    render(
      <QueryClientProvider client={new QueryClient()}>
        {ui}
      </QueryClientProvider>
    );

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

    (useGetPlainTrialBalance as jest.Mock).mockReturnValue({
      plainTrialBalanceList: { pagedRecords: [] },
      isLoading: false,
      totalRecords: 0
    });

    const mockDownloadCtx = {
      setExportData: jest.fn(),
      setReportType: jest.fn()
    };

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <PlainTrialBalance />
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

    (useGetPlainTrialBalance as jest.Mock).mockReturnValue(pagedResponse);

    const mockDownloadCtx = {
      setExportData: jest.fn(),
      setReportType: jest.fn()
    };

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <PlainTrialBalance />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Cash/i)).toBeInTheDocument();
      expect(screen.getByTestId('search-flag')).toBeInTheDocument();
    });
  });
});
