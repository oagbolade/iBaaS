jest.mock('@/api/general/useBranches', () => ({
  useGetBranches: jest.fn(),
}));

jest.mock('@/api/reports/useGetAccountEnquiryBybranchId', () => ({
  useGetAccountEnquiryByBranchId: jest.fn(),
}));

jest.mock('@/utils/hooks/usePersistedSearch', () => ({
  usePersistedSearch: jest.fn(),
}));

jest.mock('@/utils/hooks/useGlobalLoadingState', () => ({
  useGlobalLoadingState: jest.fn(),
}));

jest.mock('@/components/Loaders', () => ({
  FormSkeleton: () => <div data-testid="loading-skeleton" />,
}));

jest.mock('@/components/Table', () => ({
  MuiTableContainer: ({ children }: any) => (
    <div data-testid="table-container">{children}</div>
  ),
  TableSingleAction: () => <div>View</div>,
}));

jest.mock('@/features/Report/Overview/TopOverViewSection', () => ({
  TopOverViewSection: () => <div>Top Section</div>,
}));

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('@/api/general/useBranches');
const { useGetAccountEnquiryByBranchId } = require('@/api/reports/useGetAccountEnquiryBybranchId');
const { usePersistedSearch } = require('@/utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('@/utils/hooks/useGlobalLoadingState');

import { AccountEnquiry } from '@/features/Report/CustomReport/AccountEnquiry';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { ReportModuleContext } from '@/context/ReportModuleContext';

const mockBranches = [
  { id: "1", name: "Head Office" }
];

const mockRecords = [
  {
    accounttitle: "John Doe",
    accountnumber: "2000001574",
    bookBalance: 50000,
    phoneNo: "08012345678",
    officerName: "Officer Mike",
    useableBalance: 20000
  }
];

const renderWithProviders = (ui: any) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      {ui}
    </QueryClientProvider>
  );

describe("AccountEnquiry Page", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
    });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: "", accountNo: "" },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  it("shows loader when loading", async () => {
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    (useGetAccountEnquiryByBranchId as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    const mockDownloadCtx = {
      setExportData: jest.fn(),
      setReportType: jest.fn(),
    };

    const mockReportCtx = { setAccountEnquiryData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <ReportModuleContext.Provider value={mockReportCtx}>
            <AccountEnquiry />
          </ReportModuleContext.Provider>
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("submits form and renders returned table data", async () => {
    // mock API returns data
    (useGetAccountEnquiryByBranchId as jest.Mock).mockReturnValue({
      data: mockRecords,
      isLoading: false,
    });

    const mockDownloadCtx = {
      setExportData: jest.fn(),
      setReportType: jest.fn(),
    };

    const mockReportCtx = { setAccountEnquiryData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <ReportModuleContext.Provider value={mockReportCtx}>
            <AccountEnquiry />
          </ReportModuleContext.Provider>
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    // select HEAD OFFICE using test id
    const headOfficeOption = screen.getByTestId("branchID");
    fireEvent.change(headOfficeOption, { target: { value: "1" } });

    // enter account number
    const input = screen.getByPlaceholderText(
      /Search a customer by Name or Account Number/i
    );
    fireEvent.change(input, { target: { value: "2000001574" } });

    // click search
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    // wait for rows
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("2000001574")).toBeInTheDocument();
      expect(screen.getByTestId("table-container")).toBeInTheDocument();
    });
  });
});
