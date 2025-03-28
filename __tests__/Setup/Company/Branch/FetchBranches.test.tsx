import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useGetStatus } from '@/api/general/useStatus';
import { useFilterBranchSearch } from '@/api/setup/useSetUpBranches';
import { Branch } from '@/features/Setup';

// Mock the hooks used in the Branch component
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/setup/useSetUpBranches');
jest.mock('next/navigation');

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

const mockRouter = {
  push: jest.fn()
};

const mockStatus = [{ statusCode: '1', statusDesc: 'Active' }];

jest.mock(
  'next/link',
  () =>
    ({ children, href }: { children: React.ReactNode; href: string }) => (
      <div
        onClick={() => mockRouter.push(href)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            mockRouter.push(href);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    )
);

const mockFilteredBranchSearch = [
  {
    userId: '1',
    branchCode: 'BR001',
    branchName: 'Main Branch',
    status: 1
  }
];

describe('Branch Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });
    (useFilterBranchSearch as jest.Mock).mockReturnValue({
      totalPages: 1,
      totalElements: 1,
      data: mockFilteredBranchSearch,
      isLoading: false
    });
  });

  it('renders without crashing and displays "Add New Branch" button', () => {
    render(<Branch />);

    // Check if the button is rendered
    const addButton = screen.getByText(/Add New Branch/i);
    expect(addButton).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    (useFilterBranchSearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [
        {
          userId: '1',
          branchCode: 'BR001',
          branchName: 'Main Branch',
          status: 1
        }
      ],
      isLoading: true
    });

    render(<Branch />);

    // Check if the loading skeleton is displayed
    const loader = screen.getByTestId('loading-skeleton'); // Adjust this according to your actual test ID
    expect(loader).toBeInTheDocument();
  });

  it('displays empty state when branchData is empty', async () => {
    (useFilterBranchSearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [],
      isLoading: false
    });

    render(<Branch />);

    // Check for empty state message
    const emptyMessage = screen.getByText(/No Search Found/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders data rows based on fetched data', async () => {
    render(<Branch />);
    await userEvent.click(screen.getByTestId('action-button'));

    await expect(screen.getByText('BR001')).toBeInTheDocument();
    await expect(screen.getByText('Main Branch')).toBeInTheDocument();
    await expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('redirects to the "Add New Branch" page when the button is clicked', async () => {
    render(<Branch />);

    // Click the "Add New Branch" button
    const addButton = screen.getByText(/Add New Branch/i);
    await userEvent.click(addButton);

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/setup/company/branch/create'
    );
  });
});
