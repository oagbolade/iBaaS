import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import { act } from 'react-dom/test-utils';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import { CreateUserForm } from '@/features/Administrator/Forms/CreateUser';
import { useCreateUser, getSupervisorByID } from '@/api/admin/useAdminUsers';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetDepartments } from '@/api/general/useDepartments';
import { useGetStatus } from '@/api/general/useStatus';
import { useGetRoles } from '@/api/admin/useRole';

export interface IBranches {
  branchCode: string;
  branchName: string;
}

const branchesMock: IBranches[] = [
  { branchCode: '001', branchName: 'Branch A' }
];
const rolesMock = [{ name: 'Admin', value: 'admin' }];
const departmentsMock = [{ name: 'IT', value: 'IT' }];
const statusMock = [{ name: 'Active', value: 'active' }];

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();
const mockCreateUser = jest.fn();

jest.mock('next/navigation', () => {
  const originalModule = jest.requireActual('next/navigation');
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
        replace: mockRouterReplace,
        refresh: mockRouterRefresh
      };
    }),
    useSearchParams: jest.fn().mockImplementation(() => {
      return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArg) => {
      return pathArg;
    })
  };
});

jest.mock('../../../api/general/useBranches', () => ({
  useGetBranches: jest.fn()
}));

jest.mock('../../../api/general/useStatus', () => ({
  useGetStatus: jest.fn()
}));

jest.mock('../../../api/general/useDepartments', () => ({
  useGetDepartments: jest.fn()
}));

jest.mock('../../../api/admin/useRole', () => ({
  useGetRoles: jest.fn()
}));

const onSubmitMock = jest.fn();

const setIsSubmittingMock = jest.fn();

type FormTypes = {
  branchcode?: string;
  deptcode?: string;
  status?: string;
};

const renderForm = ({
  branchcode = '',
  deptcode = '',
  status = ''
}: FormTypes) => {
  renderComponent(
    <CreateUserForm
      unitTestInitialValues={{
        userid: '',
        fullname: '',
        email: '',
        branchcode,
        deptcode,
        phoneno: '',
        status
      }}
      isSubmitting={false}
      branches={branchesMock}
      roles={rolesMock}
      departments={departmentsMock}
      status={statusMock}
      setIsSubmitting={setIsSubmittingMock}
    />
  );
};

jest.mock('../../../api/admin/useAdminUsers', () => ({
  useCreateUser: jest.fn(),
  useGetUserByID: jest.fn(() => ({ userDetails: {}, isLoading: false })),
  getSupervisorByID: jest.fn(() => Promise.resolve({ supervisors: [] }))
}));

describe('CreateUserForm Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/admin/users/create/',
      asPath: '/admin/users/create/'
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: () => null
    }));

    (useCreateUser as jest.Mock).mockReturnValue({ mutate: mockCreateUser });
    (getSupervisorByID as jest.Mock).mockReturnValue(
      Promise.resolve({ supervisors: [] })
    );

    (useGetBranches as jest.Mock).mockReturnValue([
      { branchCode: '001', branchName: 'Branch A' }
    ]);
    (useGetStatus as jest.Mock).mockReturnValue({
      status: [{ name: 'Active', value: 'active' }]
    });
    (useGetDepartments as jest.Mock).mockReturnValue({
      departments: [{ name: 'HR', value: 'hr' }]
    });
    (useGetRoles as jest.Mock).mockReturnValue({
      roles: [{ name: 'Admin', value: 'admin' }]
    });
  });

  test('renders the form with necessary fields', () => {
    renderForm({});

    expect(screen.getByLabelText(/Staff \/ Login ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Staff Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Branch/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Department/i)[0]).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Staff Status/i)[0]).toBeInTheDocument();
  });

  test('shows validation errors when required fields are empty', async () => {
    renderForm({ branchcode: '', deptcode: '', status: '' });

    fireEvent.click(screen.getByTestId('button'));
    await waitFor(() => {
      expect(screen.getAllByText('Required')[0]).toBeInTheDocument();
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test('shows validation errors for invalid email and phone number', async () => {
    renderForm({});

    const emailInput = screen.getByPlaceholderText(
      'Omodayo_Oluwafunke@testcompany.com'
    );
    const phoneInput = screen.getByPlaceholderText('090587483822');

    await act(() => {
      fireEvent.change(emailInput, {
        target: { value: 'invalid-email' }
      });

      fireEvent.change(phoneInput, {
        target: { value: '123' }
      });
    });

    const submitButton = screen.getByTestId('button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid email address/i)
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.getByText(/Phone number is not valid/i)
      ).toBeInTheDocument();
    });

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test('should submit the form when all fields are valid', async () => {
    renderForm({
      branchcode: 'unittestbranch',
      deptcode: 'unittestdept',
      status: 'active'
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('202210107481'), {
        target: { value: 'user123' }
      });
      fireEvent.change(screen.getByPlaceholderText('Omodayo Oluwafunke'), {
        target: { value: 'Jane Doe' }
      });
      fireEvent.change(
        screen.getByPlaceholderText('Omodayo_Oluwafunke@testcompany.com'),
        { target: { value: 'jane.doe@example.com' } }
      );
      fireEvent.change(screen.getByPlaceholderText('090587483822'), {
        target: { value: '09012345678' }
      });
      fireEvent.change(screen.getByPlaceholderText('010777030922'), {
        target: { value: '0123456789' }
      });
      const passwordInput = screen.getByPlaceholderText('Enter password');
      fireEvent.change(passwordInput, { target: { value: 'SecurePass123' } });
    });

    fireEvent.click(screen.getByTestId('button'));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });
  });
});
