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
    <table>
      <tbody data-testid="table-container">{children}</tbody>
    </table>
  ),
  TableSingleAction: () => <div>View</div>,
}));

jest.mock('@/features/Report/Overview/TopOverViewSection', () => ({
  TopOverViewSection: () => <div>Top Section</div>,
}));

import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
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

    await waitFor(() => {
      expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
    });
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

    // Verify branch select and account input are rendered
    await waitFor(() => {
      expect(screen.getByTestId("branchID")).toBeInTheDocument();
      expect(screen.getByTestId("accountNo")).toBeInTheDocument();
    });

    // Select branch and enter account number
    const branchRoot = screen.getByTestId("branchID");
    const branchInput = branchRoot.querySelector('input') || branchRoot;
    fireEvent.change(branchInput, { target: { value: "1" } });

    const accountRoot = screen.getByTestId("accountNo");
    const accountInput = accountRoot.querySelector('input') as Element;
    fireEvent.change(accountInput, { target: { value: "2000001574" } });

    // Click search button
    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    // Verify table data is displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("2000001574")).toBeInTheDocument();
    }, { timeout: 6000 });
  });
});
