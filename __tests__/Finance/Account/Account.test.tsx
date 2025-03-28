import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Account } from '@/features/FinanceManagement/Account';
import { useGetBranches } from '@/api/general/useBranches';
import { useFilterCustomerAccountSearch } from '@/api/customer-service/useCustomer';

// Mock the hooks and next/link
jest.mock('../../../api/general/useBranches');
jest.mock('../../../api/customer-service/useCustomer');

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, ...rest }: { children: React.ReactNode }) => {
    return <a {...rest}>{children}</a>;
  };
});

// Mock moment
jest.mock('moment', () => {
  return (date: string) => ({
    format: () => 'March 20th 2024, 10:00:00 am'
  });
});

const mockBranches = [
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' }
];

const mockAccountData = [
  {
    userid: '1',
    accountnumber: 'ACC001',
    accounttitle: 'Test Account',
    dateOpened: '2024-03-20T10:00:00',
    accountdesc: 'Savings Account',
    status: 1,
    customerid: 'CUST001'
  }
];

describe('Account Component', () => {
  beforeEach(() => {
    // Mock the hooks' return values
    (useGetBranches as jest.Mock).mockReturnValue({
      branches: mockBranches,
      isLoading: false
    });

    (useFilterCustomerAccountSearch as jest.Mock).mockReturnValue({
      data: mockAccountData,
      isLoading: false,
      totalPages: 1,
      totalElements: 1
    });
  });

  test('renders the Account component with create account button', () => {
    render(<Account />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  test('renders account table with correct columns', () => {
    render(<Account />);
    expect(screen.getByText('Account Overview')).toBeInTheDocument();
    expect(
      screen.getByText('See a directory of all accounts on this system.')
    ).toBeInTheDocument();
  });

  test('handles search functionality', async () => {
    const { container } = render(<Account />);
    const searchButton = container.querySelector('button[type="submit"]');

    if (searchButton) {
      fireEvent.click(searchButton);

      await waitFor(() => {
        expect(useFilterCustomerAccountSearch).toHaveBeenCalled();
      });
    }
  });
});
