import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AccountDebit } from '../../../features/Report/CustomReport/AccountDebit';

import { DownloadReportContext } from '../../../context/DownloadReportContext';
import { DateRangePickerContext } from '../../../context/DateRangePickerContext';

// HOOKS TO MOCK
import { useGetBranches } from '../../../api/general/useBranches';
import { useGetAccountInDebit } from '../../../api/reports/useGetAccountInDebit';
import { usePersistedSearch } from '../../../utils/hooks/usePersistedSearch';

// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock hooks (ONLY hooks — NOT FilterSection)
jest.mock('../../../api/general/useBranches');
jest.mock('../../../api/reports/useGetAccountInDebit');
jest.mock('../../../utils/hooks/usePersistedSearch');
jest.mock('../../../utils/hooks/useGlobalLoadingState');


jest.mock('../../../components/Table', () => ({
  MuiTableContainer: ({ children }: any) => (
    <table>
      <tbody data-testid="table-container">{children}</tbody>
    </table>
  ),
}));

const renderWithProviders = (ui: any) =>
  render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

/* --------------------------------------------------------------------------
   TEST SUITE
-------------------------------------------------------------------------- */
describe('AccountDebit Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [{ branchCode: '1', branchName: 'Head Office' }],
      isLoading: false,
    });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '', searchWith: '' },
      setSearchParams: jest.fn(),
      searchActive: false,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });
  });

  /* ------------------------------------------------------
     TEST 1 — LOADER
  ------------------------------------------------------- */
  it('shows loader when loading', () => {
    (useGetAccountInDebit as jest.Mock).mockReturnValue({
      accountsinDebitList: [],
      isLoading: true,
      totalRecords: 0,
    });

    const mockDownloadCtx = {
        setReportType: jest.fn(),
        setExportData: jest.fn()
    };
     const mockDateCtx = { dateValue: [null, null] };


    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <AccountDebit />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  /* ------------------------------------------------------
     TEST 2 — FORM SUBMIT
  ------------------------------------------------------- */
  it('submits form and triggers search', async () => {
    const mockSetSearchParams = jest.fn();
    const mockSetSearchActive = jest.fn();

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '', searchWith: '' },
      setSearchParams: mockSetSearchParams,
      searchActive: false,
      setSearchActive: mockSetSearchActive,
      page: 1,
      setPage: jest.fn(),
    });

    (useGetAccountInDebit as jest.Mock).mockReturnValue({
      accountsinDebitList: [],
      isLoading: false,
      totalRecords: 0,
    });

    const mockDownloadCtx = { setReportType: jest.fn(), setExportData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <AccountDebit />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    // get branch select
    const branchSelect = await screen.findByLabelText(/branch id/i);
    fireEvent.mouseDown(branchSelect);
    const branchInput = branchSelect.querySelector('input');
    
    if (branchInput) {
      fireEvent.change(branchInput, { target: { value: '1' } });
    }
    // type search text
    const searchInput = screen.getByPlaceholderText(/search a customer/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });

    fireEvent.click(screen.getByTestId("action-button"));

    waitFor(()=>{
      expect(mockSetSearchParams).toHaveBeenCalled();
      expect(mockSetSearchActive).toHaveBeenCalledWith(true);
    })
  });

  /* ------------------------------------------------------
     TEST 3 — TABLE DATA
  ------------------------------------------------------- */
  it('renders debit accounts into table', async () => {
    (useGetAccountInDebit as jest.Mock).mockReturnValue({
      accountsinDebitList: [
        {
          accountnumber: '555001',
          accounttitle: 'Jane Doe',
          customerid: 'C009',
          bookBalance: 20000,
          officerName: 'Officer Tom',
          productName: 'Current Account',
        },
      ],
      isLoading: false,
      totalRecords: 1,
    });

    (usePersistedSearch as jest.Mock).mockReturnValue({
      searchParams: { branchID: '001', searchWith: 'Jane' },
      setSearchParams: jest.fn(),
      searchActive: true,
      setSearchActive: jest.fn(),
      page: 1,
      setPage: jest.fn(),
    });

    const mockDownloadCtx = { setReportType: jest.fn(), setExportData: jest.fn() };
    const mockDateCtx = { dateValue: [null, null] };

    renderWithProviders(
      <DownloadReportContext.Provider value={mockDownloadCtx}>
        <DateRangePickerContext.Provider value={mockDateCtx}>
          <AccountDebit />
        </DateRangePickerContext.Provider>
      </DownloadReportContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('555001')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('C009')).toBeInTheDocument();
      expect(screen.getByText('Officer Tom')).toBeInTheDocument();
      expect(screen.getByText('Current Account')).toBeInTheDocument();
    });
  });
});
