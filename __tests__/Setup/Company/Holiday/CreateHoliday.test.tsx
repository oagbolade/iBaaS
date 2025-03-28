import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { renderComponentWithQueryProvider as renderComponent} from '@/mocks/renderComponent';
import { useGetBranchByCode, useCreateBranch } from '@/api/setup/useSetUpBranches';
import {
  useCreateDepartment,
  useGetDepartmentById
} from '@/api/setup/useDepartment';
import { AddDepartment } from '@/features/Setup/Company/Forms/AddDepartment';
import { createDepartmentSchema } from '@/schemas/setup';
import { CreateHolidayForm } from '@/features/Setup/Company/Forms/CreateHolidayForm';
import { useCreateHoliday, useGetHolidayById } from '@/api/setup/useCreateHoliday';

const mockCreateDepartment = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
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

jest.mock('../../../../api/setup/useCreateHoliday', () => ({
    useCreateHoliday: jest.fn(() => ({
      mutate: jest.fn(),
  })),
  useGetHolidayById: jest.fn(() => ({
      mutate: jest.fn(),
  })),
}));

const defaultProps = {
  isSubmitting: false,
  setIsSubmitting: jest.fn(),
  holidayId: '123',
};

describe('Add Holiday Component', () => {

  beforeEach(() => {
    (useGetHolidayById as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
    (useCreateHoliday as jest.Mock).mockReturnValue({ mutate: mockCreateDepartment });
  });

  const render = (props = {}) => 
    renderComponent(
      <Formik initialValues={{}} validationSchema={createDepartmentSchema} onSubmit={jest.fn()}>
          <CreateHolidayForm {...defaultProps} {...props}/>
      </Formik>
    );

  test('renders add Holiday component without crashing', () => {
    render();

    expect(screen.getAllByText(/Create Holiday/i)[0]).toBeInTheDocument();
  });

  test('renders all form fields correctly', () => {
    render();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Start Date/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/End Date/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Holiday Days/i)[0]).toBeInTheDocument();
  });

  test('renders the correct title based on "isEditing" mode', () => {
    (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
        query: { isEditing: 'true' },
        pathname: '/setup/company/holidays/create/',
        asPath: '/setup/company/holidays/create/',
    });

    (useSearchParams as jest.Mock).mockImplementation(() => ({
        get: (param: string) => (param === 'isEditing' ? 'true' : null),
    }));

    render();

    expect(screen.getByText('Edit Holiday')).toBeInTheDocument();
  });

  test('validates required fields on submit', async () => {
    render();

    // Attempt to submit the form without filling fields
    fireEvent.click(screen.getByText(/submit alias/i));

    // Check validation messages appear
    await waitFor(() => {
        expect(screen.getByText(/Holiday description is Required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(screen.getByText(/Holiday Date is Required/i)).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(screen.getByText(/Holiday Ends is Required/i)).toBeInTheDocument();
    });
  });

  test('calls the onSubmit function with the correct data when form is submitted', async () => {
    render();

    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'unit-test-department' } });

    const startDate = screen.getAllByPlaceholderText('MM/DD/YYYY')[0];

    fireEvent.change(startDate, { target: { value: '01/01/2023' } });

    const endDate = screen.getAllByPlaceholderText('MM/DD/YYYY')[1];

    fireEvent.change(endDate, { target: { value: '01/09/2023' } });

    fireEvent.click(screen.getByText(/submit alias/i));

    await waitFor(() => {
        expect(mockCreateDepartment).toHaveBeenCalledTimes(1);
    });
  });
});
