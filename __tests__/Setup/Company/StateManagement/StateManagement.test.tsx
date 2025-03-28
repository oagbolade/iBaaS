import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useGetStatus } from '@/api/general/useStatus';
import { useFilterStateSearch } from '@/api/setup/useCreateState';
import { useGetRegion } from '@/api/setup/useCreateRegion';
import { useGetAllStates } from '@/api/general/useGeography';
import { StateManagement } from '@/features/Setup';

// Mock the hooks used in the Branch component
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/setup/useCreateRegion');
jest.mock('../../../../api/general/useGeography');;
jest.mock('../../../../api/setup/useCreateState');
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

const mockFilteredStatemanagementSearch = [

  { 
    userId: 'admin002', 
    region: '004', 
    countryCode: '001', 
    statemne: 'Fed', 
    capital: 'Abuja', 
    stateCode: '001', 
    stateName: 'Federal Capital Territory', 
    regionName: 'South West', 
    status: 1,
    regionStatus: 1
  }
];

const mockState = [
  { 
    stateCode: '002', 
    stateName: 'Abia', 
  }
];

const mockRegion = [
  { 
    regionCode: '006', 
    regionName: 'North Central',
    regionmne: 'string',
    status: 1,
    userid: 'string',
    authid: 'string',
    createdate: 'string',
  }
];

describe.only('Region Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });

    (useFilterStateSearch as jest.Mock).mockReturnValue({
      totalPages: 1,
      totalElements: 1,
      data: mockFilteredStatemanagementSearch,
      isLoading: false,
    });

    (useGetAllStates as jest.Mock).mockReturnValue({
      states: mockState,
    });

    (useGetRegion as jest.Mock).mockReturnValue({
      region: mockRegion,
    });
    
  });

  it('renders without crashing', () => {
    render(<StateManagement />); 
    
     expect(screen.getByText('State Management')).toBeInTheDocument();
    
     expect(screen.getByText('See a directory of all state management in this system.')).toBeInTheDocument();
  });

  it('renders data rows based on fetched data', async () => {
    
    render(<StateManagement />);

    await userEvent.click(screen.getByTestId('action-button'));

    expect(screen.getByText('001')).toBeInTheDocument();
    expect(screen.getByText('Federal Capital Territory')).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    await expect(screen.getByText('South West')).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    (useFilterStateSearch as jest.Mock).mockReturnValue({
        totalPages: 1,
        totalElements: 0,
        data: mockFilteredStatemanagementSearch,
        isLoading: true,
      });

    render(<StateManagement />);
    
    const loader = screen.getByTestId('loading-skeleton');
    expect(loader).toBeInTheDocument();
  });

  it('displays empty state when branchData is empty', async () => {

    render(<StateManagement />);

    // Check for empty state message
    const emptyMessage = screen.getByText(/No Search Criteria Created/i);
    expect(emptyMessage).toBeInTheDocument();
  });

});