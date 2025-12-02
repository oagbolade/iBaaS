/**
 * ../../..jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HoldingTransactions } from "../../../features/Report/CustomReport/HoldingTransactions";
import dayjs from "dayjs";
import { DateRangePickerContext } from "../../../context/DateRangePickerContext";
import { DownloadReportContext } from "../../../context/DownloadReportContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// --- API MOCKS ---
jest.mock("../../../api/general/useBranches", () => ({
  useGetBranches: jest.fn(),
}));

jest.mock("../../../api/reports/useHoldingTransaction", () => ({
  useGetHoldingTransactionReport: jest.fn(),
}));

jest.mock("../../../utils/hooks/usePersistedSearch", () => ({
  usePersistedSearch: jest.fn(),
}));

jest.mock("../../../utils/hooks/useGlobalLoadingState", () => ({
  useGlobalLoadingState: jest.fn(),
}));

// ---- CORRECT TABLE MOCK FOR HOLDING TRANSACTIONS ----
jest.mock("../../../components/Revamp/TableV2", () => ({
  TableV2: ({ data }: any) => (
    <table data-testid="table">
      <tbody>
        {data?.map((row: any, index: number) => (
          <tr data-testid="table-row" key={index}>
            <td>{row.accountnumber}</td>
            <td>{row.create_dt}</td>
            <td>{row.end_dt}</td>
            <td>{row.amt}</td>
            <td>{row.holdreason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

// ----- STATIC DATA -----
const mockBranches = {
  branches: [{ branchID: "1", branchName: "Main Branch" }],
};

const mockHoldingData = {
  data: {
    pagedHoldTrans: [
      {
        accountnumber: "1234567890",
        create_dt: "2024-01-02",
        end_dt: "2024-01-15",
        amt: 50000,
        holdreason: "Fraud Check",
      },
    ],
    totalHolding: 50000,
  },
  isLoading: false,
  totalRecords: 1,
};

const mockDownloadData = {
  data: {
    pagedHoldTrans: [
      {
        accountnumber: "1234567890",
        create_dt: "2024-01-02",
        end_dt: "2024-01-15",
        amt: 50000,
        holdreason: "Fraud Check",
      },
    ],
  },
};

const mockPersistedSearch = {
  searchParams: {},
  setSearchParams: jest.fn(),
  searchActive: true,
  setSearchActive: jest.fn(),
  page: 1,
  setPage: jest.fn(),
};

// ---- CONTEXT ----
const mockDownloadContextValue = {
  setExportData: jest.fn(),
  setReportType: jest.fn(),
};

// ---- MANDATORY DATE RANGE ----
const mockDateRange = [
  dayjs("2024-01-01"),
  dayjs("2024-01-31"),
];

const queryClient = new QueryClient();

const Providers = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    <DateRangePickerContext.Provider value={{ dateValue: mockDateRange }}>
      <DownloadReportContext.Provider value={mockDownloadContextValue}>
        {children}
      </DownloadReportContext.Provider>
    </DateRangePickerContext.Provider>
  </QueryClientProvider>
);

describe("HoldingTransactions Component", () => {
  beforeEach(() => jest.clearAllMocks());

  // ---- LOADING TEST ----
  it("renders loader when loading", () => {
    const { useGetBranches } = require("../../../api/general/useBranches");
    const { useGetHoldingTransactionReport } = require("../../../api/reports/useHoldingTransaction");
    const { usePersistedSearch } = require("../../../utils/hooks/usePersistedSearch");
    const { useGlobalLoadingState } = require("../../../utils/hooks/useGlobalLoadingState");

    useGetBranches.mockReturnValue(mockBranches);
    useGetHoldingTransactionReport.mockReturnValue({ isLoading: true, data: null });
    usePersistedSearch.mockReturnValue(mockPersistedSearch);
    useGlobalLoadingState.mockReturnValue({ isLoading: true });

    render(<HoldingTransactions />, { wrapper: Providers });

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  // ---- FORM SUBMIT TEST ----
  it("submits search filter", async () => {
    const { useGetBranches } = require("../../../api/general/useBranches");
    const { useGetHoldingTransactionReport } = require("../../../api/reports/useHoldingTransaction");
    const { usePersistedSearch } = require("../../../utils/hooks/usePersistedSearch");
    const { useGlobalLoadingState } = require("../../../utils/hooks/useGlobalLoadingState");

    useGetBranches.mockReturnValue(mockBranches);
    useGetHoldingTransactionReport.mockReturnValue(mockHoldingData);
    usePersistedSearch.mockReturnValue(mockPersistedSearch);
    useGlobalLoadingState.mockReturnValue({ isLoading: false });

    render(<HoldingTransactions />, { wrapper: Providers });

    const searchInput = screen.getByPlaceholderText(/Search by Account Title/i);
    fireEvent.change(searchInput, { target: { value: "John Doe" } });

    // const btn = screen.getByRole("button", { name: /action-button/i });
    //   fireEvent.click(btn);
    fireEvent.click(screen.getByTestId("action-button"));
    

     waitFor(() => {
      expect(mockPersistedSearch.setSearchActive).toHaveBeenCalledWith(true);
      expect(mockPersistedSearch.setSearchParams).toHaveBeenCalled();
    });
  });

  // ---- TABLE RENDER TEST ----
  it("renders table after fetching data", async () => {
    const { useGetBranches } = require("../../../api/general/useBranches");
    const { useGetHoldingTransactionReport } = require("../../../api/reports/useHoldingTransaction");
    const { usePersistedSearch } = require("../../../utils/hooks/usePersistedSearch");
    const { useGlobalLoadingState } = require("../../../utils/hooks/useGlobalLoadingState");

    useGetBranches.mockReturnValue(mockBranches);

    useGetHoldingTransactionReport
      .mockReturnValueOnce(mockHoldingData)
      .mockReturnValueOnce(mockDownloadData);

    usePersistedSearch.mockReturnValue(mockPersistedSearch);
    useGlobalLoadingState.mockReturnValue({ isLoading: false });

    render(<HoldingTransactions />, { wrapper: Providers });

    await waitFor(() => {
      expect(screen.getByText("1234567890")).toBeInTheDocument();
      expect(screen.getByText("2024-01-02")).toBeInTheDocument();
      expect(screen.getByText("2024-01-15")).toBeInTheDocument();
      expect(screen.getByText("50000")).toBeInTheDocument();
      expect(screen.getByText("Fraud Check")).toBeInTheDocument();
    });
  });
});
