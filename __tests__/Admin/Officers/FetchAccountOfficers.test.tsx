import React from 'react';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import { useDeleteAccountOfficer, useFilterAccountOfficerSearch } from '@/api/admin/useAccountOfficer';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetStatus } from '@/api/general/useStatus';
import { AccountOfficers } from '@/features/Administrator';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({ get: jest.fn() })),
}));

jest.mock('../../../api/general/useBranches');
jest.mock('../../../api/general/useStatus');
jest.mock('../../../api/admin/useAccountOfficer');

const mockBranches = [{ branchName: 'Branch A' }];
const mockStatus = [{ statusName: 'Active' }];
const mockAccountOfficerData = [
    { officercode: '123', staffID: '001', officerName: 'John Doe', deptName: 'Sales' },
];

(useFilterAccountOfficerSearch as jest.Mock).mockReturnValue({
    data: mockAccountOfficerData,
    isLoading: false,
    totalPages: 1,
    totalElements: 1,
});

const mockMutate = jest.fn();
(useDeleteAccountOfficer as jest.Mock).mockReturnValue({ mutate: mockMutate });

const render = () => {
    return renderComponent(<AccountOfficers />);
};

const renderTable = async () => {
    const mockData = {
        totalPages: 1,
        totalElements: 1,
        data: [
            {
                officercode: '123',
                staffID: 'JD123',
                officerName: 'John Doe',
                deptName: 'Sales',
            },
        ],
        isLoading: false,
    };

    (useFilterAccountOfficerSearch as jest.Mock).mockReturnValue(mockData);

    render();

    await userEvent.click(screen.getByTestId('action-button'));
};

const triggerDelete = async () => {
    const deleteButton = screen.getByTestId('view-actions');
    fireEvent.click(deleteButton);
    await userEvent.click(screen.getByTestId('delete-officer'));
};

describe('AccountOfficers Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
        (useGetStatus as jest.Mock).mockReturnValue({ status: mockStatus });
    });

    test('renders loading skeleton when data is loading', () => {
        (useFilterAccountOfficerSearch as jest.Mock).mockReturnValueOnce({
            isLoading: true,
        });

        render();
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    test('renders filter section', () => {
        render();
        expect(screen.getAllByText(/Branch ID/)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/User Status/)[0]).toBeInTheDocument();
    });

    test('renders the Add Account Officer button with correct href', () => {
        render();
        const addButton = screen.getByRole('link', { name: /Add Account Officer/i });

        expect(addButton).toBeInTheDocument();
        expect(addButton).toHaveAttribute('href', '/admin/account-officers/create');
    });

    test('displays account officers data in table', async () => {
        const mockData = {
            totalPages: 1,
            totalElements: 1,
            data: [
                {
                    officercode: '123',
                    staffID: 'JD123',
                    officerName: 'John Doe',
                    deptName: 'Sales',
                },
            ],
            isLoading: false,
        };

        (useFilterAccountOfficerSearch as jest.Mock).mockReturnValue(mockData);

        render();

        await userEvent.click(screen.getByTestId('action-button'));

        await screen.findByText('123');
        await screen.findByText('John Doe');
        await screen.findByText('Sales');
    });

    test('handles pagination correctly', () => {
        render();
        const pageButton = screen.getByTestId('table-pagination');
        expect(pageButton).toBeInTheDocument();
        fireEvent.click(pageButton);
        expect(useFilterAccountOfficerSearch).toHaveBeenCalled();
    });

    test('opens delete confirmation modal on delete action', async () => {
        renderTable();

        await userEvent.click(screen.getByTestId('action-button'));
        const deleteButton = screen.getByTestId('view-actions');
        fireEvent.click(deleteButton);

        await expect(screen.getByText('Delete Officer')).toBeInTheDocument();

        await userEvent.click(screen.getByTestId('delete-officer'));

        await waitFor(() => {
            screen.getByText(/When you delete an officer/i);
        });
    });

    test('calls delete function when delete is confirmed', async () => {
        await renderTable();
        await triggerDelete();

        fireEvent.click(screen.getByRole('button', { name: /Proceed/i }));
        await expect(screen.getByText('To confirm this is really you , please enter your account password to continue.')).toBeInTheDocument();

        await act(async () => {
            const passwordInput = screen.getByPlaceholderText('Enter Password');
            fireEvent.change(passwordInput, { target: { value: 'password' } });
            fireEvent.click(screen.getByText(/Proceed/));
        });

        await waitFor(() => expect(mockMutate).toHaveBeenCalledWith('123'));
    });
});
