import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useFilterUserSearch, useValidatePassword, useDeleteUser } from '../../../api/admin/useAdminUsers';
import { Users } from '@/features/Administrator/Users';
import '@testing-library/jest-dom';
import { useGetBranches } from '@/api/general/useBranches';
import { renderComponentWithQueryProvider } from '@/mocks/renderComponent';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}));

jest.mock('../../../api/admin/useAdminUsers', () => ({
  useFilterUserSearch: jest.fn(),
  useLockOrUnlockUser: jest.fn(() => ({
    mutate: jest.fn(),
  })),
  useDeleteUser: jest.fn(() => ({
    mutate: jest.fn(),
  })),
  useValidatePassword: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

jest.mock('../../../api/general/useBranches', () => ({
  useGetBranches: jest.fn()
}));

describe('Users Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    (useFilterUserSearch as jest.Mock).mockReturnValue({
      isLoading: true,
      data: []
    });
    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [],
      isLoading: true
    });

    renderComponentWithQueryProvider(<Users />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('renders table with user data and branches', async () => {
    (useFilterUserSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        {
          userId: '1',
          fullname: 'John Doe',
          deptName: 'Engineering',
          role_name: 'Admin',
          create_date: '2024-10-01T12:00:00Z'
        }
      ],
      totalPages: 1,
      totalElements: 1
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [{ id: 1, name: 'Main Branch' }],
      isLoading: false
    });

    renderComponentWithQueryProvider(<Users />);

    await userEvent.click(screen.getByTestId('action-button'));

    await waitFor(() => {
      expect(
        screen.getByText('John Doe') &&
          screen.getByText('Engineering') &&
          screen.getByText('Admin')
      ).toBeTruthy();
    });
  });

  test('displays delete confirmation modal on delete action', async () => {
    (useFilterUserSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        {
          userId: '1',
          fullname: 'John Doe',
          deptName: 'Engineering',
          role_name: 'Admin',
          create_date: '2024-10-01T12:00:00Z'
        }
      ],
      totalPages: 1,
      totalElements: 1
    });
    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [{ id: 1, name: 'Main Branch' }],
      isLoading: false
    });

    renderComponentWithQueryProvider(<Users />);

    await userEvent.click(screen.getByTestId('action-button'));
    const deleteButton = screen.getByTestId('view-actions');
    fireEvent.click(deleteButton);

    await screen.findByText('Delete User');

    await userEvent.click(screen.getByTestId('delete-user'));

    await waitFor(() => {
      screen.getByText(
        'When you delete a user, the user wont’t be able to access this platform any longer, would you like to proceed'
      );
    });
  });

  test('delete a user after confirmation', async () => {
    const mockDeleteUser = jest.fn();
    const mockValidatePassword = jest.fn();

    (useValidatePassword as jest.Mock).mockReturnValue({ mutate: mockValidatePassword });
    (useDeleteUser as jest.Mock).mockReturnValue({
      mutate: (userid: string) => {
        return mockDeleteUser(userid);
      }
    });

    (useFilterUserSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        {
          userId: '1',
          fullname: 'John Doe',
          deptName: 'Engineering',
          role_name: 'Admin',
          create_date: '2024-10-01T12:00:00Z'
        }
      ],
      totalPages: 1,
      totalElements: 1
    });

    (useGetBranches as jest.Mock).mockReturnValue({
      branches: [{ id: 1, name: 'Main Branch' }],
      isLoading: false
    });

    renderComponentWithQueryProvider(<Users />);

    await userEvent.click(screen.getByTestId('action-button'));
    const deleteButton = screen.getByTestId('view-actions');
    fireEvent.click(deleteButton);

    await screen.findByText('Delete User');

    await userEvent.click(screen.getByTestId('delete-user'));

    await waitFor(() => {
      screen.getByText(
        'When you delete a user, the user wont’t be able to access this platform any longer, would you like to proceed'
      );
    });

    fireEvent.click(screen.getByText(/Proceed/));

    await act(async () => {
      const passwordInput = screen.getByPlaceholderText('Enter Password');
      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(screen.getByText(/Proceed/));
    });

    await waitFor(() => {
      expect(mockValidatePassword).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockDeleteUser).toHaveBeenCalled();
    });
  });
});
