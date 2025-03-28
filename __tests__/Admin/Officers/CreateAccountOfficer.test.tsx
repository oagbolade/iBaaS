import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchParams, useRouter } from 'next/navigation';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import { useCreateAccountOfficer, useGetAccountOfficerByCode } from '@/api/admin/useAccountOfficer';
import { CreateAccountOfficer } from '@/features/Administrator/Forms/CreateAccountOfficer';

const mockCreateAccountOfficer = jest.fn();

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(() => ({ get: jest.fn() })),
}));

jest.mock('../../../api/admin/useAccountOfficer', () => ({
    useCreateAccountOfficer: jest.fn(),
    useGetAccountOfficerByCode: jest.fn(),
}));

jest.mock('../../../utils/encryptData', () => ({ encryptData: jest.fn() }));

const mockOfficer = {
    officercode: '202210107481',
    officerName: 'Omodayo Oluwafunke',
    branchcode: '01',
    dept: 'Sales',
    email: 'Omodayo_Oluwafunke@testcompany.com',
    phone: '090587483822',
    status: 'Active',
};

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

type FormTypes = {
    branchcode?: string;
    deptcode?: string;
    status?: number;
}
const renderForm = ({ branchcode = '', deptcode = '', status = 0 }: FormTypes) => {
    renderComponent(
        <CreateAccountOfficer
            unitTestInitialValues={{
                officercode: '',
                officerName: '',
                email: '',
                branchcode,
                dept: deptcode,
                phone: '',
                status,
                authid: '',
                targetamt: 0,
                sbu: 0,
                auth: 0
            }}
            isSubmitting
            branches={[{ label: 'Branch 1', value: '01' }]}
            status={[{ label: 'Active', value: 'Active' }]}
            departments={[{ label: 'Sales', value: 'Sales' }]}
            setIsSubmitting={jest.fn()}
        />
    );
};

describe('CreateUserForm Component', () => {
    beforeEach(() => {
        (useCreateAccountOfficer as jest.Mock).mockReturnValue({ mutate: mockCreateAccountOfficer });
        (useGetAccountOfficerByCode as jest.Mock).mockReturnValue({ officer: { officercode: '202210107481', officerName: 'Omodayo Oluwafunke', branchcode: '01', dept: 'Sales', email: 'Omodayo_Oluwafunke@testcompany.com', phone: '090587483822', status: 'Active' }, isLoading: false });
    });

    test('renders all form fields', () => {
        renderForm({});

        expect(screen.getByLabelText(/Staff \/ Login ID/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Branch/i)[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/Staff Name/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Department/i)[0]).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Staff Status/i)[0]).toBeInTheDocument();
    });

    test('submits form with valid values', async () => {
        const mockMutate = jest.fn();
        (useCreateAccountOfficer as jest.Mock).mockReturnValue({ mutate: mockMutate });
        renderForm({ branchcode: '001', deptcode: '002', status: 1 });

        fireEvent.change(screen.getByLabelText(/Staff \/ Login ID/i), { target: { value: '202210107481' } });
        fireEvent.change(screen.getByLabelText(/Staff Name/i), { target: { value: 'Omodayo Oluwafunke' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'Omodayo_Oluwafunke@testcompany.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '090587483822' } });

        fireEvent.click(screen.getByText('submit alias'));

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalledWith({
                officercode: '202210107481',
                officerName: 'Omodayo Oluwafunke',
                branchcode: '001',
                dept: '002',
                email: 'Omodayo_Oluwafunke@testcompany.com',
                phone: '090587483822',
                status: 1,
                targetamt: 0,
                sbu: 0,
                authid: '',
                auth: 0
            });
        });
    });

    test('displays loading skeleton when editing and loading data', () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            query: { isEditing: 'true' },
            pathname: '/admin/users/create/',
            asPath: '/admin/users/create/',
        });

        (useSearchParams as jest.Mock).mockImplementation(() => ({
            get: (param: string) => (param === 'isEditing' ? 'true' : null),
        }));

        (useGetAccountOfficerByCode as jest.Mock).mockReturnValue({ officer: null, isLoading: true });

        render(
            <CreateAccountOfficer
                isSubmitting={false}
                branches={[]}
                status={[]}
                departments={[]}
                setIsSubmitting={jest.fn()}
            />
        );

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    test('shows validation error when fields are invalid', async () => {
        render(
            <CreateAccountOfficer
                isSubmitting={false}
                branches={[]}
                status={[]}
                departments={[]}
                setIsSubmitting={jest.fn()}
            />
        );

        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123' } });

        fireEvent.click(screen.getByText('submit alias'));

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText(/Phone number is not valid/i)).toBeInTheDocument();
        });
    });

    test('disables specific fields in edit mode', () => {
        (useGetAccountOfficerByCode as jest.Mock).mockReturnValue({ officer: mockOfficer, isLoading: false });
        render(
            <CreateAccountOfficer
                isSubmitting={false}
                branches={[]}
                status={[]}
                departments={[]}
                setIsSubmitting={jest.fn()}
            />
        );

        const officerCodeInput = screen.getByLabelText(/Staff \/ Login ID/i);
        expect(officerCodeInput).toBeDisabled();
    });
});
