import { useRouter } from 'next/navigation';
import { useFilterDepartmentSearch } from '@/api/setup/useDepartment';
import { useGetStatus } from '@/api/general/useStatus';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { DepartmentTable } from '@/features/Setup/Company/Department';

jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/setup/useDepartment');

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

const mockFilteredDepartmentSearch = [
  {
    deptid: '001',
    deptName: 'MD/CEO OFFICE',
    deptShortname: 'MDO',
    status: 1,
    userid: '1'
  }
];

describe('Department Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });
    (useFilterDepartmentSearch as jest.Mock).mockReturnValue({
      totalPages: 1,
      totalElements: 1,
      data: mockFilteredDepartmentSearch,
      isLoading: false
    });
  });

  it('renders without crashing and displays "Add Department" button', () => {
    render(<DepartmentTable />);

    // Check if the button is rendered
    const addButton = screen.getByText(/Add Department/i);
    expect(addButton).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    (useFilterDepartmentSearch as jest.Mock).mockReturnValueOnce({
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

    render(<DepartmentTable />);

    // Check if the loading skeleton is displayed
    const loader = screen.getByTestId('loading-skeleton'); // Adjust this according to your actual test ID
    expect(loader).toBeInTheDocument();
  });

  it('displays empty state when branchData is empty', async () => {
    (useFilterDepartmentSearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [],
      isLoading: false
    });

    render(<DepartmentTable />);

    // Check for empty state message
    const emptyMessage = screen.getByText(/No Search Found/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders data rows based on fetched data', async () => {
    render(<DepartmentTable />);
    await userEvent.click(screen.getByTestId('action-button'));

    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText('MD/CEO OFFICE')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('redirects to the "Add New Branch" page when the button is clicked', async () => {
    render(<DepartmentTable />);

    // Click the "Add New Branch" button
    const addButton = screen.getByText(/Add Department/i);
    await userEvent.click(addButton);

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/setup/company/add-department'
    );
  });
});
