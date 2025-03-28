import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import {
  useCreateRole,
  useGetAssignedAuthPriviledgesByRoleID,
  useGetAssignedDataCaptureByRoleID,
  useGetRoleByID,
  useGetRoles
} from '@/api/admin/useRole';
import { CreateRole } from '@/features/Administrator/Forms/CreateRole';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

jest.mock('../../../api/admin/useRole', () => ({
  useCreateRole: jest.fn(),
  useGetRoleByID: jest.fn(),
  useGetAssignedAuthPriviledgesByRoleID: jest.fn(),
  useGetAssignedDataCaptureByRoleID: jest.fn(),
  useGetRoles: jest.fn()
}));

const mockSetIsSubmitting = jest.fn();
const mockMutate = jest.fn();

describe('CreateRole Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateRole as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (useGetRoleByID as jest.Mock).mockReturnValue({
      role: null,
      isLoading: false
    });
    (useGetAssignedAuthPriviledgesByRoleID as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false
    });
    (useGetAssignedDataCaptureByRoleID as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false
    });
    (useGetRoles as jest.Mock).mockReturnValue({
      roles: null,
      isLoading: false
    });
  });

  const render = (showPermission = false) =>
    renderComponent(
      <CreateRole
        isSubmitting={false}
        setIsSubmitting={mockSetIsSubmitting}
        showPermission={showPermission}
      />
    );

  test('renders the component with form fields and titles', () => {
    render();
    expect(screen.getByLabelText(/role name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idle time out/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/access days/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role level/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/role description/i)).toBeInTheDocument();
  });

  test('renders "Create New Role" title when creating a new role', () => {
    render();
    expect(screen.getByText(/create new role/i)).toBeInTheDocument();
  });

  test('validates required fields on submit', async () => {
    await render();
    fireEvent.click(screen.getByText('submit alias'));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i)[0]).toBeInTheDocument();
    });
  });

  test('renders "Edit Role" title when editing an existing role', () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => (param === 'isEditing' ? 'true' : null)
    }));

    render();
    expect(screen.getByText(/edit role/i)).toBeInTheDocument();
  });

  test('displays loading skeleton when editing and data is loading', () => {
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => (param === 'isEditing' ? 'true' : 'true')
    }));

    (useGetRoleByID as jest.Mock).mockReturnValue({
      role: null,
      isLoading: true
    });
    (useGetRoles as jest.Mock).mockReturnValue({
      roles: null,
      isLoading: true
    });

    render();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render();
    fireEvent.change(screen.getByLabelText(/role name/i), {
      target: { value: 'Test Role' }
    });
    fireEvent.change(screen.getByLabelText(/idle time out/i), {
      target: { value: '30' }
    });
    fireEvent.change(screen.getByLabelText(/access days/i), {
      target: { value: '5' }
    });
    fireEvent.change(screen.getByLabelText(/role level/i), {
      target: { value: '1' }
    });
    fireEvent.change(screen.getByLabelText(/role description/i), {
      target: { value: 'A test role' }
    });

    fireEvent.click(screen.getByText('submit alias'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          role_name: 'Test Role',
          userTimeOut: '30',
          access_days: '5',
          roleLevel: '1',
          roledesc: 'A test role'
        })
      );
    });
  });

  test('renders privilege sections for data capture and authorization', () => {
    render(true);
    expect(screen.getByText(/data capture privileges/i)).toBeInTheDocument();
    expect(screen.getByText(/authorisation privileges/i)).toBeInTheDocument();
  });

  test('does not render authorization privilege section when showPermission is false', () => {
    render();
    expect(screen.getByText(/data capture privileges/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/authorisation privileges/i)
    ).not.toBeInTheDocument();
  });
});
