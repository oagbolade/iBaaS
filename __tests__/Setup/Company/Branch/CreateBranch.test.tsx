import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { renderComponentWithQueryProvider as renderComponent } from '@/mocks/renderComponent';
import {
  useGetBranchByCode,
  useCreateBranch
} from '@/api/setup/useSetUpBranches';
import { createBranchSchema } from '@/schemas/setup';
import { CreateBranchForm } from '@/features/Setup/Company/Forms/CreateBranchForm';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const mockCreateBranch = jest.fn();

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

jest.mock('../../../../api/setup/useSetUpBranches', () => ({
  useCreateBranch: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useGetBranchByCode: jest.fn(() => ({
    mutate: jest.fn()
  }))
}));

const defaultProps = {
  isSubmitting: false,
  setIsSubmitting: jest.fn(),
  branchId: '123',
  branches: [{ value: '001', label: 'HEAD OFFICE' }],
  branchTypes: [{ value: '1', label: 'Main Branch' }],
  states: [{ value: '025', label: 'Lagos' }],
  towns: [{ value: '001', label: 'Ikeja' }],
  countries: [{ value: '001', label: 'Nigeria' }]
};

describe('CreateBranch Component', () => {
  beforeEach(() => {
    (useGetBranchByCode as jest.Mock).mockReturnValue({
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
    (useCreateBranch as jest.Mock).mockReturnValue({
      mutate: mockCreateBranch
    });
  });

  const render = (props = {}) =>
    renderComponent(
      <Formik
        initialValues={{}}
        validationSchema={createBranchSchema}
        onSubmit={jest.fn()}
      >
        <CreateBranchForm {...defaultProps} {...props} />
      </Formik>
    );

  test('renders CreateBranch component without crashing', () => {
    render();

    expect(screen.getAllByText(/create branch/i)[0]).toBeInTheDocument();
  });

  test('renders all form fields correctly', () => {
    render();
    expect(screen.getByLabelText(/branch name/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/address/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/branch type/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/main branch/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/email address/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/country/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/phone number/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/state/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/city/i)[0]).toBeInTheDocument();
  });

  test('renders the correct title based on "isEditing" mode', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: { isEditing: 'true' },
      pathname: '/setup/company/branch/create/',
      asPath: '/setup/company/branch/create/'
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => (param === 'isEditing' ? 'true' : null)
    }));

    render();

    expect(screen.getByText('Edit Branch')).toBeInTheDocument();
  });

  test('validates required fields on submit', async () => {
    render();

    // Attempt to submit the form without filling fields
    fireEvent.click(screen.getByText(/submit alias/i));

    // Check validation messages appear
    await waitFor(() => {
      expect(screen.getByText(/Branch Name is Required/i)).toBeInTheDocument();
    });
  });

  test('calls the onSubmit function with the correct data when form is submitted', async () => {
    render({
      unitTestInitialValues: {
        branchName: 'unit-test-branch',
        address: 'victoria island lagos',
        phone: '28100000000',
        email: 'test@test.com',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Ikeja',
        branchType: 'Main Branch',
        mBranchCode: '123456'
      }
    });

    fireEvent.click(screen.getByText(/submit alias/i));

    await waitFor(() => {
      expect(mockCreateBranch).toHaveBeenCalledWith({
        branchName: 'unit-test-branch',
        address: 'victoria island lagos',
        phone: '28100000000',
        email: 'test@test.com',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Ikeja',
        branchType: 'Main Branch',
        mBranchCode: '123456'
      });
    });
  });
});
