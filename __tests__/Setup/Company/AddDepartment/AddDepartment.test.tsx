import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { renderComponentWithQueryProvider as renderComponent } from '@/mocks/renderComponent';
import {
  useGetBranchByCode,
  useCreateBranch
} from '@/api/setup/useSetUpBranches';
import {
  useCreateDepartment,
  useGetDepartmentById
} from '@/api/setup/useDepartment';
import { AddDepartment } from '@/features/Setup/Company/Forms/AddDepartment';
import { createDepartmentSchema } from '@/schemas/setup';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const mockCreateDepartment = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();

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

jest.mock('../../../../api/setup/useDepartment', () => ({
  useCreateDepartment: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useGetDepartmentById: jest.fn(() => ({
    mutate: jest.fn()
  }))
}));

const defaultProps = {
  isSubmitting: false,
  setIsSubmitting: jest.fn(),
  departmentId: '123'
};

describe('Add Department Component', () => {
  beforeEach(() => {
    (useGetDepartmentById as jest.Mock).mockReturnValue({
      officer: {
        officercode: '202210107481',
        officerName: 'Omodayo Oluwafunke',
        branchcode: '01',
        dept: 'Sales',
        email: 'Omodayo_Oluwafunke@testcompany.com',
        phone: '090587483822',
        status: 'Active'
      },
      isLoading: false
    });
    (useCreateDepartment as jest.Mock).mockReturnValue({
      mutate: mockCreateDepartment
    });
  });

  const render = (props = {}) =>
    renderComponent(
      <Formik
        initialValues={{}}
        validationSchema={createDepartmentSchema}
        onSubmit={jest.fn()}
      >
        <AddDepartment {...defaultProps} {...props} />
      </Formik>
    );

  test('renders add department component without crashing', () => {
    render();

    expect(screen.getAllByText(/Create Department/i)[0]).toBeInTheDocument();
  });

  test('renders all form fields correctly', () => {
    render();
    expect(screen.getByLabelText(/Department Name/i)).toBeInTheDocument();
    expect(
      screen.getAllByLabelText(/Department Mneumonic/i)[0]
    ).toBeInTheDocument();
  });

  test('renders the correct title based on "isEditing" mode', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: { isEditing: 'true' },
      pathname: '/setup/company/add-department/',
      asPath: '/setup/company/add-department/'
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => (param === 'isEditing' ? 'true' : null)
    }));

    render();

    expect(screen.getByText('Edit Department')).toBeInTheDocument();
  });

  test('validates required fields on submit', async () => {
    render();

    // Attempt to submit the form without filling fields
    fireEvent.click(screen.getByText(/submit alias/i));

    // Check validation messages appear
    await waitFor(() => {
      expect(
        screen.getByText(/Department Name is Required/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/DepartMent Short Name is Required/i)
      ).toBeInTheDocument();
    });
  });

  test('calls the onSubmit function with the correct data when form is submitted', async () => {
    render();

    fireEvent.change(screen.getByLabelText(/Department Name/i), {
      target: { value: 'unit-test-department' }
    });
    fireEvent.change(screen.getByLabelText(/Department Mneumonic/i), {
      target: { value: 'UTD' }
    });

    fireEvent.click(screen.getByText(/submit alias/i));

    await waitFor(() => {
      expect(mockCreateDepartment).toHaveBeenCalledTimes(1);
    });
  });
});
