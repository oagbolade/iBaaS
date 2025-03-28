import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { LoanDirectory } from '@/features/Loan';
import { useGetAllLoans } from '@/api/loans/useCreditFacility';
import '@testing-library/jest-dom';
import { useGetBranches } from '@/api/general/useBranches';
import { renderComponentWithQueryProvider } from '@/mocks/renderComponent';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

jest.mock('../../../api/loans/useCreditFacility', () => ({
  useGetAllLoans: jest.fn()
}));

jest.mock('../../../api/general/useBranches', () => ({
  useGetBranches: jest.fn()
}));

const mockLoanData = [
  {
    userid: '1',
    fullName: 'John Doe',
    accountNumber: '1234567890',
    productName: 'Personal Loan',
    loanAmount: 50000,
    loanStatus: '4'
  }
];

const mockBranches = [
  { id: 1, name: 'Head Quarter Branch' },
  { id: 2, name: 'Eti Osa Branch' }
];

describe('Loan Directory component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: true,
      data: []
    });
    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [],
      isLoading: true
    });

    renderComponentWithQueryProvider(<LoanDirectory />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('renders the fiter section', () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: true,
      data: []
    });
    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [],
      isLoading: true
    });

    renderComponentWithQueryProvider(<LoanDirectory />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });

  test('Does not render FilterSection when branches are null', () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: null,
      isLoading: false
    });

    renderComponentWithQueryProvider(<LoanDirectory />);

    // Verify the branch selection is not present when branches are null
    expect(screen.queryByTestId('branchID')).not.toBeInTheDocument();
  });

  test('displays empty table state', async () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
      isLoading: false
    });

    renderComponentWithQueryProvider(<LoanDirectory />);

    expect(screen.getByTestId('empty-table-body')).toBeInTheDocument();
  });

  test('handles pagination correctly', async () => {
    const setPageMock = jest.fn();
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockLoanData,
      totalPages: 2,
      totalElements: 2
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
      isLoading: false
    });

    renderComponentWithQueryProvider(<LoanDirectory />);

    // Trigger search to display data
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    // Find and click next page button
    const nextPageButton = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextPageButton);

    await waitFor(() => {
      expect(useGetAllLoans).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 })
      );
    });
  });

  test('displays empty state when no data is available', async () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
      isLoading: false
    });

    renderComponentWithQueryProvider(<LoanDirectory />);

    // Trigger search to attempt displaying data
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId('empty-table-body')).toBeInTheDocument();
    });
  });

  test('renders table with loan data and branches', async () => {
    (useGetAllLoans as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockLoanData,
      totalPages: 1,
      totalElements: 1
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
      isLoading: false
    });

    renderComponentWithQueryProvider(<LoanDirectory />);

    // Verify Create Loan Underwriting button is present
    expect(screen.getByText('Create Loan Underwriting')).toBeInTheDocument();

    // Trigger search to display data
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    // Verify each piece of loan data separately
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('1234567890')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Personal Loan')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/50,000/)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });
});
