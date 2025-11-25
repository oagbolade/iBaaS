
jest.mock('../../../api/general/useBranches', () => ({
  useGetBranches: jest.fn()
}));

jest.mock('../../../api/setup/useProduct', () => ({
  useGetProductClass: jest.fn()
}));

jest.mock('../../../api/reports/useStatementOfAccount', () => ({
  useGetStatementOfAccount: jest.fn()
}));

jest.mock('../../../utils/hooks/usePersistedSearch', () => ({
  usePersistedSearch: jest.fn()
}));

jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({
  useGlobalLoadingState: jest.fn()
}));


jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn() })
}));


jest.mock('../../../components/Loaders', () => ({
  FormSkeleton: () => <div data-testid="loading-skeleton" />
}));



import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetProductClass } = require('../../../api/setup/useProduct');
const { useGetStatementOfAccount } = require('../../../api/reports/useStatementOfAccount');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

import { DateRangePickerContext } from '../../../context/DateRangePickerContext';
import { DownloadReportContext } from '../../../context/DownloadReportContext';
const { StatementAccount } = require('../../../features/Report/CustomReport/StatementAccount');

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  (console.warn as jest.Mock).mockRestore();
});


describe('StatementAccount Component', () => {
  const mockBranches = [{ id: '1', name: 'Branch 1' }];
  const mockProducts = [{ prodclass: '01', name: 'Product 1' }];
  const mockStatementData = {
    fullname: 'John Doe',
    accountnumber: '123456',
    pagedRecords: [
      {
        trandate: '2025-11-20T10:00:00Z',
        narration: 'Test transaction',
        refNo: 'TXN123'
      }
    ]
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

  const renderWithQuery = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        {ui}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
    (useGetProductClass as jest.Mock).mockReturnValue({ products: mockProducts });
    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: false });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: {},
      setSearchParams: jest.fn(),
      searchActive: false,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn()
    });
  });


  it('renders statement of account data when search is active', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { accountNumber: '123456' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn()
    });

    (useGetStatementOfAccount as jest.Mock).mockReturnValue({
      rptStatementList: mockStatementData,
      isLoading: false,
      totalRecords: 1
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <DateRangePickerContext.Provider value={mockDateRangeContext as any}>
          <StatementAccount />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('123456')).toBeInTheDocument();
      expect(screen.getByText('Test transaction')).toBeInTheDocument();
    });
  });


  it('shows skeleton loader while loading', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { accountNumber: '123456' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn()
    });

    (useGetStatementOfAccount as jest.Mock).mockReturnValue({
      rptStatementList: null,
      isLoading: true
    });

    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx as any}>
        <DateRangePickerContext.Provider value={mockDateRangeContext as any}>
          <StatementAccount />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );


    await waitFor(async () => {
      const skeletons = screen.getAllByTestId('loading-skeleton');
      expect(skeletons.length).toBeGreaterThan(0);
    });
  });
});
