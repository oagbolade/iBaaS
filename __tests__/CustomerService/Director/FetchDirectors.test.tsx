import { render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useFilterDirectorsSearch } from '@/api/customer-service/useDirectors';
import { DirectorTable } from '@/features/CustomerService/Director';

const mockRouter = {
    push: jest.fn(),
};

// Mock dependencies
jest.mock('../../../api/customer-service/useDirectors');

jest.mock('../../../features/CustomerService/Director/TableActionMenu.tsx', () => ({
    TableActionMenu: jest.fn(() => <div>Action Menu</div>),
}));

jest.mock('../../../components/Table', () => ({
    MuiTableContainer: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('DirectorTable Component', () => {
    const mockDirectorsData = [
        {
            id: '1',
            customerId: 'C123',
            fullName: 'John Doe',
            isCeo: true,
            isChairman: false,
            countryName: 'USA',
            dob: '1980-05-15',
            gender: true,
        },
        {
            id: '2',
            customerId: 'C456',
            fullName: 'Jane Smith',
            isCeo: false,
            isChairman: true,
            countryName: 'Canada',
            dob: '1975-08-25',
            gender: false,
        },
    ];

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('should render loading skeleton when data is being fetched', () => {
        // Mock the hook to simulate loading state
        (useFilterDirectorsSearch as jest.Mock).mockReturnValue({
            data: [],
            totalPages: 1,
            totalElements: 0,
            isLoading: true,
        });

        render(<DirectorTable />);

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('should render the director table when data is available', async () => {
        // Mock the hook to return mock data
        (useFilterDirectorsSearch as jest.Mock).mockReturnValue({
            data: mockDirectorsData,
            totalPages: 1,
            totalElements: 2,
            isLoading: false,
        });

        render(<DirectorTable />);

        await userEvent.click(screen.getByTestId('action-button'));

        // Check if the director data is rendered in the table
        await expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        await expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should display an empty state when no data is available', async () => {
        // Mock the hook to simulate no data scenario
        (useFilterDirectorsSearch as jest.Mock).mockReturnValue({
            data: [],
            totalPages: 1,
            totalElements: 0,
            isLoading: false,
        });

        render(<DirectorTable />);

        // Check if the empty state message is shown
        expect(screen.getByText(/No search/i)).toBeInTheDocument();
    });

    it('should handle search functionality correctly', async () => {
        // Mock the hook to simulate search results
        (useFilterDirectorsSearch as jest.Mock).mockReturnValue({
            data: mockDirectorsData,
            totalPages: 1,
            totalElements: 2,
            isLoading: false,
        });

        render(<DirectorTable />);

        // Simulate searching with new parameters
        await userEvent.click(screen.getByTestId('action-button'));

        // Wait for the data to reload
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });

    it('should render "Create Director" button', () => {
        render(<DirectorTable />);

        // Check if the Create Director button is displayed
        expect(screen.getByText('Create Director')).toBeInTheDocument();
    });
});
