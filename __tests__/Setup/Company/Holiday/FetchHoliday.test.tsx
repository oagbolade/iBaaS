import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useGetStatus } from '@/api/general/useStatus';
import { Branch, Holidays } from '@/features/Setup';
import { useFilterHolidaySearch } from '@/api/setup/useCreateHoliday';

// Mock the hooks used in the Branch component
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/setup/useCreateHoliday');
jest.mock('next/navigation');

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockRouter = {
    push: jest.fn(),
};

const mockStatus = [{ statusCode: '1', statusDesc: 'Active' }];

jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode, href: string }) => (
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
));

const mockFilteredHolidaySearch = [
  { 
    userId: '1', 
    holidaydate: '2024-12-26', 
    holidaydesc: 'Christman Holiday', 
    status: 1,
    holidaydays: 2,
    narration: 'An Holiday'
  }
];

describe.only('Holiday Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });
    (useFilterHolidaySearch as jest.Mock).mockReturnValue({
      totalPages: 1,
      totalElements: 1,
      data: mockFilteredHolidaySearch,
      isLoading: false,
    });
    
  });

  it('renders without crashing and displays "Add New" button', () => {
    render(<Holidays />);
    
    // Check if the button is rendered
    const addButton = screen.getByText(/Add New/i);
    expect(addButton).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    (useFilterHolidaySearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [{ userId: '1', branchCode: 'BR001', branchName: 'Main Branch', status: 1 }],
      isLoading: true,
    });

    render(<Holidays />);
    
    // Check if the loading skeleton is displayed
    const loader = screen.getByTestId('loading-skeleton'); // Adjust this according to your actual test ID
    expect(loader).toBeInTheDocument();
  });

  it('displays empty state when holidayData is empty', async () => {
    (useFilterHolidaySearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [],
      isLoading: false,
    });

    render(<Holidays />);

    // Check for empty state message
    const emptyMessage = screen.getByText(/No Search Found/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders data rows based on fetched data', async () => {
    render(<Holidays />);
    await userEvent.click(screen.getByTestId('action-button'));

    await expect(screen.getByText('Christman Holiday')).toBeInTheDocument();
    await expect(screen.getByText('2024-12-26')).toBeInTheDocument();
    await expect(screen.getByText('An Holiday')).toBeInTheDocument();
});

  it('redirects to the "Add New Holiday" page when the button is clicked', async () => {
    render(<Holidays />);
    
    // Click the "Add New Branch" button
    const addButton = screen.getByText(/Add New/i);
    await userEvent.click(addButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/setup/company/holidays/create');
  });
});