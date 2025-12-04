jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: '/'
  })
}));

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/reports/useGetProductSummary', () => ({ useGetProductSummary: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));

jest.mock('../../../components/Loaders', () => ({ FormSkeleton: () => <div data-testid="loading-skeleton" /> }));
jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({ TopOverViewSection: () => <div data-testid="top-overview" /> }));

jest.mock('../../../components/Revamp/TableV2', () => ({
  TableV2: ({ data, showHeader }: any) => (
    <div>
      {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
      {showHeader?.secondaryTitle && <p data-testid="secondary-title">{showHeader.secondaryTitle}</p>}
      <div data-testid="table-body">
        {Array.isArray(data) && data.map((r: any, i: number) => (
          <div key={i}>
            {r.productcode} - {r.productname} - {r.noofaccts}
          </div>
        ))}
      </div>
    </div>
  )
}));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetProductSummary } = require('../../../api/reports/useGetProductSummary');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { ProductSummary } = require('../../../features/Report/CustomReport/ProductSummary');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});
afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  (console.warn as jest.Mock).mockRestore();
});

describe('ProductSummary Component', () => {
  const mockBranches = [{ id: '1', name: 'HQ' }];

  const samplePaged = {
    pagedProductSummaries: [
      {
        productcode: 'SAV001',
        productname: 'Savings Account',
        noofaccts: '150',
        crproductbalance: 5000000,
        drproductbalance: 2000000,
        totproductbalance: 7000000,
        branchcode: '1'
      }
    ],
    totalAccount: 150,
    totalCr: 5000000,
    totalDr: 2000000,
    totalProductBal: 7000000,
    isLoading: false,
    totalRecords: 1
  };

  const sampleDownload = {
    pagedProductSummaries: [
      {
        productcode: 'SAV001',
        productname: 'Savings Account',
        noofaccts: '150',
        crproductbalance: 5000000,
        drproductbalance: 2000000,
        totproductbalance: 7000000,
        branchcode: '1'
      }
    ],
    totalAccount: 150,
    totalCr: 5000000,
    totalDr: 2000000,
    totalProductBal: 7000000
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
    mockDownloadCtx.setExportData.mockReset();
    mockDownloadCtx.setReportType.mockReset();
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
    (useGetProductSummary as jest.Mock).mockReturnValue({
      productSummaryList: [],
      isLoading: true,
      totalRecords: 0
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <ProductSummary />
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
      setPage: jest.fn()
    });

 (useGetProductSummary as jest.Mock).mockImplementation((params: any) => {
  if (params?.getAll) {
    return {
      productSummaryList: sampleDownload,
      isLoading: false,
      totalRecords: sampleDownload.pagedProductSummaries.length
    };
  }

  return {
    productSummaryList: samplePaged,
    isLoading: false,
    totalRecords: samplePaged.pagedProductSummaries.length
  };
});

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <ProductSummary />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('table-body')).toBeInTheDocument();
      expect(screen.getByText(/SAV001 - Savings Account - 150/)).toBeInTheDocument();
      expect(mockDownloadCtx.setExportData).toHaveBeenCalled();
      expect(mockDownloadCtx.setReportType).toHaveBeenCalledWith('ProductSummary');
    });
  });
});