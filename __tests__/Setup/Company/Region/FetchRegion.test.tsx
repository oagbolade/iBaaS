import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useGetStatus } from '@/api/general/useStatus';
import { useFilterRegionSearch } from '@/api/setup/useCreateRegion';
import { Region } from '@/features/Setup';

// Mock the hooks used in the Branch component
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/setup/useCreateRegion');
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

const mockFilteredRegionSearch = [
  { 
    userId: '1', 
    regionCode: 'BR001', 
    regionName: 'South West', 
    regionmne: 'SW', 
    status: 1
  }
];

describe.only('Region Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });
    (useFilterRegionSearch as jest.Mock).mockReturnValue({
      totalPages: 1,
      totalElements: 1,
      data: mockFilteredRegionSearch,
      isLoading: false,
    });
    
  });

  it('renders without crashing', () => {
    render(<Region />); 
    
     expect(screen.getByText('Region')).toBeInTheDocument();
    
     expect(screen.getByText('See a directory of all regions in this system.')).toBeInTheDocument();
  });

  it('renders data rows based on fetched data', async () => {
    render(<Region />);
    await userEvent.click(screen.getByTestId('action-button'));

    await expect(screen.getByText('BR001')).toBeInTheDocument();
    await expect(screen.getByText('South West')).toBeInTheDocument();
    await expect(screen.getByText('Active')).toBeInTheDocument();
    await expect(screen.getByText('SW')).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    (useFilterRegionSearch as jest.Mock).mockReturnValue({
        totalPages: 1,
        totalElements: 0,
        data: mockFilteredRegionSearch,
        isLoading: true,
      });

    render(<Region />);
    
    const loader = screen.getByTestId('loading-skeleton');
    expect(loader).toBeInTheDocument();
  });

  it('displays empty state when branchData is empty', async () => {
    (useFilterRegionSearch as jest.Mock).mockReturnValueOnce({
      totalPages: 1,
      totalElements: 0,
      data: [],
      isLoading: false,
    });

    render(<Region />);

    // Check for empty state message
    const emptyMessage = screen.getByText(/No Search Found/i);
    expect(emptyMessage).toBeInTheDocument();
  });

});