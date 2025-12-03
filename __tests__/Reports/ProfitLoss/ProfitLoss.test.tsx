jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
}));


jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/setup/useGeneralNode', () => ({ useGetGLType: jest.fn() }));
jest.mock('../../../api/reports/useGetProfitAndLossGroup', () => ({ useGetProfitAndLossGroup: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));


jest.mock('../../../features/Report/CustomReport/ProfitLoss/FilterSection', () => ({
  FilterSection: () => <div data-testid="filter-section" />
}));

jest.mock('../../../components/Typography', () => ({
  PageTitle: () => <div data-testid="page-title" />
}));

jest.mock('../../../components/Table/Table', () => ({
  renderEmptyTableBody: () => <div data-testid="empty-table" />
}));


jest.mock('@mui/material/Accordion', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@mui/material/AccordionSummary', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@mui/material/AccordionDetails', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@mui/material/Grid', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('@mui/material/Stack', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));


jest.mock('../../../components/Loaders', () => ({
  FormSkeleton: () => <div data-testid="loading-skeleton" />
}));

jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({
  TopOverViewSection: () => <div />
}));

jest.mock('../../../features/Report/CustomReport/ProfitLoss/ShortCardWithAccordion', () => ({
  ShortCardWithAccordion: ({ title, assetValue }: any) => (
    <div data-testid="accordion-card">
      <h3>{title}</h3>
      <p>{assetValue}</p>
    </div>
  ),
}));

import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useGetBranches } from '../../../api/general/useBranches';
import { useGetGLType } from '../../../api/setup/useGeneralNode';
import { useGetProfitAndLossGroup } from '../../../api/reports/useGetProfitAndLossGroup';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '../../../utils/hooks/useGlobalLoadingState';

import { ProfitLoss } from '../../../features/Report/CustomReport/ProfitLoss';
import { DateRangePickerContext } from '../../../context/DateRangePickerContext';
import { DownloadReportContext } from '../../../context/DownloadReportContext';
import { ReportType } from '@/constants/downloadReport';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
  (console.warn as jest.Mock).mockRestore();
});

describe('ProfitLoss Component', () => {
  const mockBranches = [{ id: '1', name: 'HQ' }];

  const samplePaged = [
    {
      groupName: 'Operating Income',
      totalBal: 50000,
      groupItem: [
        { itemDesc: 'Interest Income', balance: 30000 },
        { itemDesc: 'Fee Income', balance: 20000 },
      ],
    },
  ];

  const sampleDownload = samplePaged;

  const mockDateRangeContext = {
    dateValue: [dayjs(), dayjs()] as [Dayjs, Dayjs], 
    isDateFilterApplied: false,
    setDateValue: jest.fn(),
    setIsDateFilterApplied: jest.fn(),
  };
  
  const mockDownloadCtx = {
    exportData: [],
    setExportData: jest.fn(),
    reportType: 'ProfitLoss' as ReportType, 
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
    (useGetGLType as jest.Mock).mockReturnValue({ data: [] });
  });

  it('shows skeleton while loading', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '1' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });
    (useGetProfitAndLossGroup as jest.Mock).mockReturnValue({ data: [], isLoading: true });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateRangeContext}>
          <ProfitLoss />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });
  });

  it('renders accordion items when API returns results', async () => {
    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '1' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGetProfitAndLossGroup as jest.Mock).mockImplementation((params: any) => {
      if (params?.getAll) return { data: sampleDownload };
      return { data: samplePaged, isLoading: false };
    });

    renderWithQuery(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateRangeContext}>
          <ProfitLoss />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Operating Income/i)).toBeInTheDocument();
      expect(screen.getByTestId('accordion-card')).toBeInTheDocument();
      expect(mockDownloadCtx.setExportData).toHaveBeenCalled();
      expect(mockDownloadCtx.setReportType).toHaveBeenCalledWith('ProfitAndLoss');
    });
  });
});
