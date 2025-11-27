import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DrillDown } from "../../../features/Report/CustomReport/DrillDown";
import { DownloadReportContext } from "../../../context/DownloadReportContext";


jest.mock("../../../api/reports/useGetSubGroupResponse", () => ({
  useGetGlMainGroupReport: jest.fn()
}));
// REAL LOADER (NO MOCK)
import { FormSkeleton } from '@/components/Loaders';


jest.mock("../../../utils/hooks/usePersistedSearch", () => ({
  usePersistedSearch: jest.fn()
}));

jest.mock("../../../utils/hooks/useGlobalLoadingState", () => ({
  useGlobalLoadingState: jest.fn()
}));



jest.mock("../../../features/Report/Overview/TopOverViewSection", () => ({
  TopOverViewSection: () => <div>Top</div>
}));

jest.mock("../../../components/Revamp/TableV2", () => ({
  TableV2: ({ data }: any) => (
    <table data-testid="table">
      <tbody>
        {data?.map((row: any, index: number) => (
          <tr key={index} data-testid="table-row">
            <td>{row.gl_NodeName}</td>
            <td>{row.gL_NodeCode}</td>
            <td>{row.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}));

const { useGetGlMainGroupReport } = require("../../../api/reports/useGetSubGroupResponse");
const { usePersistedSearch } = require("../../../utils/hooks/usePersistedSearch");
const { useGlobalLoadingState } = require("../../../utils/hooks/useGlobalLoadingState");

const renderWithProviders = (ui: any) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      {ui}
    </QueryClientProvider>
  );

// ---------------- MOCK DATA -------------------------------------

const mockTableData = {
  pagedMainGroupReports: [
    {
      gl_NodeName: "Assets",
      gL_NodeCode: "11",
      total: 500000
    }
  ],
  total: 500000
};

const mockDownloadData = {
  pagedMainGroupReports: [
    {
      gl_NodeName: "Assets",
      gL_NodeCode: "1001",
      total: 500000
    }
  ]
};

describe("DrillDown Report Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: {},
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn()
    });

    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: false
    });

    (useGetGlMainGroupReport as jest.Mock)
      .mockReturnValueOnce({
        isLoading: false,
        glMainGroupRptList: mockTableData,
        totalRecords: 1
      })
      .mockReturnValueOnce({
        glMainGroupRptList: mockDownloadData,
        isLoading: false
      });
  });

  const mockDownloadCtx = {
    setReportType: jest.fn(),
    setExportData: jest.fn()
  };

 
 

 
  it("submits search input and triggers search", async () => {
    const mockSetSearchParams = jest.fn();
    const mockSetSearchActive = jest.fn();

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchCode: "", gl_NodeCode: "" },
      setSearchParams: mockSetSearchParams,
      searchActive: false,
      setSearchActive: mockSetSearchActive,
      page: 1,
      setPage: jest.fn()
    });

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DrillDown />
      </DownloadReportContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search by GL Node Name or code");
    fireEvent.change(searchInput, { target: { value: "11" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchActive).toHaveBeenCalledWith(true);
      expect(mockSetSearchParams).toHaveBeenCalledWith({
        branchCode: null,
        gl_NodeCode: "11"
      });
    });
  });
 
  it("shows loader when API is loading", async () => {
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: true
    });

    (useGetGlMainGroupReport as jest.Mock).mockReturnValue({
      isLoading: true,
      glMainGroupRptList: null,
      totalRecords: 0
    });

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DrillDown />
      </DownloadReportContext.Provider>
    );

    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });

  it("renders table after data loads", async () => {
    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DrillDown />
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
      expect(screen.getByText("Assets")).toBeInTheDocument();
      // the table renders the pagedMainGroupReports data (gl codes)
      expect(screen.getByText("11")).toBeInTheDocument();
    });
  });
});
