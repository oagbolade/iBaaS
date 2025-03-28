import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import '@testing-library/jest-dom';
import { createGlAccount } from '@/schemas/admin';
import { CreateGLAccount } from '@/features/Administrator/Forms/CreateGLAccount';
import { useCreateGLAccount, useGetGLByGLNumber, useGetGlClassByNodeCode, useGetGlDetails, useGetGlNodeByTypeCode } from '@/api/admin/useCreateGLAccount';

const mockCreateGLAccount = jest.fn();

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({ get: jest.fn() })),
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

// Mock necessary hooks and utilities
jest.mock('../../../utils/hooks/useGetParams', () => ({
    useGetParams: jest.fn().mockReturnValue(''),
}));

jest.mock('../../../api/admin/useCreateGLAccount', () => ({
    useCreateGLAccount: jest.fn(() => ({
        mutate: jest.fn(),
    })),
    useGetGLByGLNumber: jest.fn(),
    useGetGlClassByNodeCode: jest.fn(),
    useGetGlDetails: jest.fn(),
    useGetGlNodeByTypeCode: jest.fn(),
}));

jest.mock('../../../utils/encryptData', () => ({
    encryptData: jest.fn((data) => data),
}));

// Mock props
const defaultProps = {
    isSubmitting: false,
    setIsSubmitting: jest.fn(),
    currencies: [{ label: 'USD', value: 'USD' }],
    glType: [{ label: 'Type1', value: '1' }],
    status: [{ label: 'Active', value: 'Active' }],
    bankgl: [],
};

describe('Tests the create general ledger form', () => {
    beforeEach(() => {
        (useCreateGLAccount as jest.Mock).mockReturnValue({ mutate: mockCreateGLAccount });
        (useGetGLByGLNumber as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
        (useGetGlClassByNodeCode as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
        (useGetGlDetails as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
        (useGetGlNodeByTypeCode as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
    });

    const render = (props = {}) =>
        renderComponent(
            <Formik initialValues={{}} onSubmit={jest.fn()} validationSchema={createGlAccount}>
                <CreateGLAccount {...defaultProps} {...props} />
            </Formik>
        );

    test('renders all form fields correctly', () => {
        render();

        expect(screen.getAllByText(/Currency/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/General Ledger Type/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/General Ledger Type Node/i)[0]).toBeInTheDocument();
        expect(screen.getAllByText(/General Ledger Type Class/i)[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/General Ledger Account Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/General Ledger Description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Book Balance/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Status/i)[0]).toBeInTheDocument();
    });

    test('validates required fields on submit', async () => {
        render();

        // Attempt to submit the form without filling fields
        fireEvent.click(screen.getByText(/submit alias/i));

        // Check validation messages appear
        await waitFor(() => {
            expect(screen.getByText(/required/i)).toBeInTheDocument();
        });
    });

    test('renders the correct title based on "isEditing" mode', () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            query: { isEditing: 'true' },
            pathname: '/admin/gl-account/create/',
            asPath: '/admin/gl-account/create/',
        });

        (useSearchParams as jest.Mock).mockImplementation(() => ({
            get: (param: string) => (param === 'isEditing' ? 'true' : null),
        }));

        render();

        expect(screen.getByText('Edit General Ledger')).toBeInTheDocument();
    });

    test('calls the onSubmit function with the correct data when form is submitted', async () => {
        render();

        fireEvent.change(screen.getByLabelText(/General Ledger Description/i), { target: { value: 'unit-test-account' } });
        fireEvent.change(screen.getByLabelText(/Book Balance/i), { target: { value: '1000' } });

        fireEvent.click(screen.getByText(/submit alias/i));

        await waitFor(() => {
            expect(mockCreateGLAccount).toHaveBeenCalledTimes(1);
        });
    });
});
