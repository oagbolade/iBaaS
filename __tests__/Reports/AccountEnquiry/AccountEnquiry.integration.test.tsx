import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// REAL LOADER (NO MOCK)
import { FormSkeleton } from '@/components/Loaders';

// Required contexts
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { ReportModuleContext } from '@/context/ReportModuleContext';

// Component under test
import { AccountEnquiry } from '@/features/Report/CustomReport/AccountEnquiry';

/* ------------------------------------------------------
   MOCK ONLY THE NECESSARY HOOKS — NOT UI COMPONENTS
------------------------------------------------------- */

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

jest.mock('@/features/Report/Overview/TopOverViewSection', () => ({
  TopOverViewSection: () => <div>Top Section</div>,
}));

jest.mock('@/components/Table', () => ({
  MuiTableContainer: ({ children }: any) => (
    <table>
      <tbody data-testid="table-container">{children}</tbody>
    </table>
  ),
  TableSingleAction: () => <div>View</div>,
}));

/* ------------------------------------------------------
   IMPORT MOCKED HOOKS
------------------------------------------------------- */
const { useGetBranches } = require('@/api/general/useBranches');
const { useGetAccountEnquiryByBranchId } = require('@/api/reports/useGetAccountEnquiryBybranchId');
const { usePersistedSearch } = require('@/utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('@/utils/hooks/useGlobalLoadingState');

/* ------------------------------------------------------
   HELPERS & MOCK DATA
------------------------------------------------------- */
const mockBranches = [{ id: '1', name: 'Head Office' }];

const mockRecords = [
  {
    accounttitle: 'John Doe',
    accountnumber: '2000001574',
    bookBalance: 50000,
    phoneNo: '08012345678',
    officerName: 'Officer Mike',
    useableBalance: 20000,
  },
];

const renderWithProviders = (ui: any) =>
  render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

/* ------------------------------------------------------
   TEST SUITE
------------------------------------------------------- */
describe('AccountEnquiry Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
    });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '', accountNo: '' },
      setSearchParams: jest.fn(),
      searchActive: false,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });

  /* ------------------------------------------------------
     TEST 1 — LOADER DISPLAYS
  ------------------------------------------------------- */
  it('shows real loader when loading', async () => {
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    (useGetAccountEnquiryByBranchId as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    const mockDownloadCtx = { setExportData: jest.fn(), setReportType: jest.fn() };
    const mockReportCtx = { setAccountEnquiryData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <ReportModuleContext.Provider value={mockReportCtx}>
            <AccountEnquiry />
          </ReportModuleContext.Provider>
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>,
    );

    expect(await screen.findByTestId('loading-skeleton')).toBeInTheDocument();
  });

  /* ------------------------------------------------------
     TEST 2 — FORM SUBMIT + TABLE RENDER
  ------------------------------------------------------- */
  it('submits form and displays table data', async () => {
    let searchIsActive = false;

    (useGetAccountEnquiryByBranchId as jest.Mock).mockReturnValue({
      data: mockRecords,
      isLoading: false,
    });

    const mockSetSearchActive = jest.fn((value) => {
      searchIsActive = value;
    });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '1', accountNo: '2000001574' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: mockSetSearchActive,
      page: 1,
      setPage: jest.fn(),
    });

    const mockDownloadCtx = { setExportData: jest.fn(), setReportType: jest.fn() };
    const mockReportCtx = { setAccountEnquiryData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <ReportModuleContext.Provider value={mockReportCtx}>
            <AccountEnquiry />
          </ReportModuleContext.Provider>
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>,
    );

    // Branch select exists
    expect(await screen.findByTestId('branchID')).toBeInTheDocument();

    // Account input exists
    expect(screen.getByTestId('accountNo')).toBeInTheDocument();

    // Fill branch using fireEvent
    const branchSelect = screen.getByTestId('branchID');
    const branchInput = branchSelect.querySelector('input');
    if (branchInput) {
      fireEvent.change(branchInput, { target: { value: '1' } });
    }

    // Fill account number using fireEvent
    const accountInput = screen.getByTestId('accountNo');
    const textInput = accountInput.querySelector('input');
    if (textInput) {
      fireEvent.change(textInput, { target: { value: '2000001574' } });
    }

    // Submit form
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    // Expect table row content
    // Wait for table data to appear (use waitFor with higher timeout)
    await waitFor(
      () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
    expect(screen.getByText('2000001574')).toBeInTheDocument();
  });
});
