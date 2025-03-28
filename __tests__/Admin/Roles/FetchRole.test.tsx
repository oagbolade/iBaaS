import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDeleteRole, useFilterRoleSearch } from '@/api/admin/useRole';
import { useValidatePassword } from '@/api/admin/useAdminUsers';
import { Roles } from '@/features/Administrator';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn()
    })
}));

jest.mock('../../../api/admin/useRole', () => ({
    useDeleteRole: jest.fn(),
    useFilterRoleSearch: jest.fn(),
}));
jest.mock('../../../api/admin/useAdminUsers', () => ({
    useValidatePassword: jest.fn(),
}));
jest.mock('../../../utils/user-storage', () => ({
    getStoredUser: jest.fn(() => ({ profiles: { userid: 'test-user-id' } })),
}));

const mockMutateDeleteRole = jest.fn();
const mockValidatePassword = jest.fn();

describe('Roles Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useDeleteRole as jest.Mock).mockReturnValue({ mutate: mockMutateDeleteRole });
        (useValidatePassword as jest.Mock).mockReturnValue({ mutate: mockValidatePassword });
    });

    const renderComponent = (rolesData: any = [], isLoading = false) => {
        (useFilterRoleSearch as jest.Mock).mockReturnValue({
            totalPages: 1,
            totalElements: rolesData.length,
            data: rolesData,
            isLoading,
        });

        render(
            <Roles />
        );
    };

    test('renders the component with action buttons and search area', () => {
        renderComponent();
        expect(screen.getByText(/add new role/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Search/i)[0]).toBeInTheDocument();
    });

    test('displays loading skeleton when data is loading', () => {
        renderComponent([], true);
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    test('renders role data in the table', async () => {
        const rolesData = [
            { role_id: '1', role_name: 'Admin', roledesc: 'Admin Role', noOfMembers: 5 },
        ];
        renderComponent(rolesData);
        await userEvent.click(screen.getByTestId('action-button'));
        await expect(screen.getByText('Admin')).toBeInTheDocument();
        expect(screen.getByText('Admin Role')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    test('changes page when page state is updated', async () => {
        const rolesData = [{ role_id: '1', role_name: 'Admin' }];
        renderComponent(rolesData);

        const pageButton = screen.getByTestId('table-pagination');
        expect(pageButton).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Admin')).not.toBeInTheDocument();
        });
    });

    const displayDeleteConfirmationModal = async () => {
        await userEvent.click(screen.getByTestId('action-button'));
        const deleteButton = screen.getByTestId('view-actions');
        fireEvent.click(deleteButton);
        await expect(screen.getByText(/delete role/i)).toBeInTheDocument();

        await userEvent.click(screen.getByTestId('delete-role'));
    };

    test('displays delete confirmation modal with correct content', async () => {
        renderComponent([{ role_id: '1', role_name: 'Admin' }]);

        await displayDeleteConfirmationModal();
        await waitFor(() => {
            expect(screen.getByText(/would you like to proceed/i)).toBeInTheDocument();
        });
    });

    test('deletes a role after password validation', async () => {
        const rolesData = [{ role_id: '1', role_name: 'Admin', roledesc: 'Admin Role' }];
        renderComponent(rolesData);

        await displayDeleteConfirmationModal();

        fireEvent.click(screen.getByRole('button', { name: /Proceed/i }));
        await expect(screen.getByText('To confirm this is really you , please enter your account password to continue.')).toBeInTheDocument();

        // Simulate entering password and confirming deletion
        fireEvent.change(screen.getByPlaceholderText('Enter Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /Proceed/i }));

        await waitFor(() => {
            expect(mockValidatePassword).toHaveBeenCalledWith(
                expect.objectContaining({
                    oldpassword: 'password123',
                    tenantid: 'RV00001',
                    userid: 'test-user-id',
                })
            );
        });

        await expect(mockMutateDeleteRole).toHaveBeenCalledWith('1');
    });
});
