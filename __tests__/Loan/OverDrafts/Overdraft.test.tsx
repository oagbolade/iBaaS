import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OverDrafts } from '@/features/Loan/overdraft/Overdraft';
import { useGetBranches } from '@/api/general/useBranches';
import '@testing-library/jest-dom';
import { useFilterCustomerAccountSearch } from '@/api/customer-service/useCustomer';
import { renderComponentWithQueryProvider } from '@/mocks/renderComponent';

const mockBranches = [
  { id: 1, name: 'Head Quarter Branch' },
  { id: 2, name: 'Eti Osa Branch' }
];

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

jest.mock('../../../api/customer-service/useCustomer.tsx', () => ({
  useFilterCustomerAccountSearch: jest.fn()
}));

jest.mock('../../../api/general/useBranches', () => ({
  useGetBranches: jest.fn()
}));

describe('OverDrafts Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component renders correctly with loading state
  test('should show loading skeleton when data is being fetched', () => {
    (useGetBranches as jest.Mock).mockReturnValue({ branches: null });
    (useFilterCustomerAccountSearch as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    render(<OverDrafts />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  // Test 2: Component displays empty state correctly
  test('should display empty state when no data is available', () => {
    (useGetBranches as jest.Mock).mockReturnValue({ branches: [] });
    (useFilterCustomerAccountSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    render(<OverDrafts />);
    expect(screen.getByTestId('empty-table-body')).toBeInTheDocument();
  });

  // Test 3: Search functionality works
  test('should trigger search when filter is applied', async () => {
    (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });

    render(<OverDrafts />);

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(useFilterCustomerAccountSearch).toHaveBeenCalled();
    });
  });

  // Test 5: Pagination works correctly
  test('should handle pagination correctly', async () => {
    const mockData = [
      {
        userid: '1',
        accounttitle: 'Test Account',
        accountnumber: '1234567890',
        branchcode: 'BR001',
        status: 1
      },
      {
        userid: '2',
        accounttitle: 'Test Account 2',
        accountnumber: '1234567891',
        branchcode: 'BR002',
        status: 1
      }
    ];

    (useGetBranches as jest.Mock).mockReturnValue({ branches: [] });
    (useFilterCustomerAccountSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      totalPages: 2,
      totalElements: 30
    });

    renderComponentWithQueryProvider(<OverDrafts />);

    // Trigger search to display data
    const searchButton = screen.getByRole('button', { name: /search/i });
    await userEvent.click(searchButton);

    // Ensure the next page button is present
    const nextPageButton = await screen.findByRole('button', {
      name: /next page/i
    });
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(useFilterCustomerAccountSearch).toHaveBeenCalledWith(
        expect.objectContaining({ page: 2 }) // Expect the page to be 2
      );
    });
  });

  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('OverDrafts Component - Customer Account Data Tests', () => {
  test('should handle empty customer data array', async () => {
    (useGetBranches as jest.Mock).mockReturnValue({ branches: [] });
    (useFilterCustomerAccountSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalPages: 0,
      totalElements: 0
    });

    renderComponentWithQueryProvider(<OverDrafts />);

    await waitFor(() => {
      expect(screen.queryByText('Test Account')).not.toBeInTheDocument();
    });
  });
});
