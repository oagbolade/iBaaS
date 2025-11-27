import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetBranches } from '../../../api/general/useBranches';
import { useGetProductClass } from '../../../api/setup/useProduct';
import { useGetStatementOfAccount } from '../../../api/reports/useStatementOfAccount';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '../../../utils/hooks/useGlobalLoadingState';

import { DateRangePickerContext } from '../../../context/DateRangePickerContext';
import { DownloadReportContext } from '../../../context/DownloadReportContext';
import { StatementAccount } from '../../../features/Report/CustomReport/StatementAccount';
import { ReportType } from '@/constants/downloadReport';

jest.mock('../../../api/general/useBranches');
jest.mock('../../../api/setup/useProduct');
jest.mock('../../../api/reports/useStatementOfAccount');
jest.mock('../../../utils/hooks/usePersistedSearch');
jest.mock('../../../utils/hooks/useGlobalLoadingState');

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: jest.fn() }),
}));


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
        refNo: 'TXN123',
      },
    ],
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
    reportType: 'StatementOfAccount' as ReportType, 
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
    (useGetProductClass as jest.Mock).mockReturnValue({ products: mockProducts });
    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: false });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: {},
      setSearchParams: jest.fn(),
      searchActive: false,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });
  });

it('shows skeleton loader while loading', async () => {
  (usePersistedSearch as jest.Mock).mockReturnValue({
    searchParams: { accountNumber: '123456' },
    setSearchParams: jest.fn(),
    searchActive: true,
    setSearchActive: jest.fn(),
    page: 1,
    setPage: jest.fn(),
  });

  (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });

  (useGetStatementOfAccount as jest.Mock).mockReturnValue({
    rptStatementList: null,
    isLoading: true,
  });

  renderWithQuery(
    <DownloadReportContext.Provider value={mockDownloadCtx}>
      <DateRangePickerContext.Provider value={mockDateRangeContext}>
        <StatementAccount />
      </DateRangePickerContext.Provider>
    </DownloadReportContext.Provider>
  );

  await waitFor(() => {
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});


  it('renders statement of account data when search is active', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { accountNumber: '123456' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGetStatementOfAccount as jest.Mock).mockReturnValue({
      rptStatementList: mockStatementData,
      isLoading: false,
      totalRecords: 1,
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateRangeContext}>
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
});
