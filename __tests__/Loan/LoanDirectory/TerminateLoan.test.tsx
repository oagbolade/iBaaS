import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { TerminateLoan } from '@/features/Loan/LoanDirectory/TerminateLoan';
import {
  useGetLoanAccountDetails,
  useTerminateLoan
} from '@/api/loans/useCreditFacility';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

// Mocking the necessary hooks and components
jest.mock('../../../api/loans/useCreditFacility');
jest.mock('../../../utils/hooks/useGlobalLoadingState');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => '123456789')
  }))
}));

const mockMutate = jest.fn();

const mockUseGetLoanAccountDetails = useGetLoanAccountDetails as jest.Mock;
const mockUseGlobalLoadingState = useGlobalLoadingState as jest.Mock;
const mockUseTerminateLoan = useTerminateLoan as jest.Mock;

describe('TerminateLoan Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTerminateLoan.mockReturnValue({ mutate: mockMutate });
    mockUseGlobalLoadingState.mockReturnValue({ isLoading: false });
  });

  test('renders loan preview loading skeleton when loan details are loading', () => {
    mockUseGetLoanAccountDetails.mockReturnValue({
      loanAccDetails: null,
      isLoading: true
    });
    render(<TerminateLoan />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('triggers submission when Liquidate Loan button is clicked', async () => {
    mockUseGetLoanAccountDetails.mockReturnValue({
      loanAccDetails: {
        settlementacct1: '123456789',
        fullName: 'John Doe',
        loanAmount: 10000
      },
      isLoading: false
    });

    render(<TerminateLoan />);

    const liquidateButton = screen.getByText(/liquidate loan/i);

    await act(async () => {
      fireEvent.click(liquidateButton);
    });
    jest.advanceTimersByTime(0);
    expect(mockMutate).toHaveBeenCalled();
  });

  test('cancels action and redirects to loan directory', () => {
    mockUseGetLoanAccountDetails.mockReturnValue({
      loanAccDetails: null,
      isLoading: true
    });

    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<TerminateLoan />);

    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/loan/loan-directory/');
  });

  test('renders preview content on tablet', () => {
    jest.mock('../../../utils', () => ({
      useCurrentBreakpoint: () => ({ isTablet: true }),
      handleRedirect: jest.fn()
    }));

    mockUseGetLoanAccountDetails.mockReturnValue({
      loanAccDetails: {
        settlementacct1: '123456789',
        fullName: 'John Doe',
        loanAmount: 10000
      },
      isLoading: false
    });

    render(<TerminateLoan />);

    expect(screen.getByText(/Terminate Loan/i)).toBeInTheDocument();
  });
});
