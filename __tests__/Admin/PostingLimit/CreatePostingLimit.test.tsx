import React from 'react';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { renderComponentWithQueryProvider as renderComponent } from '../../../mocks/renderComponent';
import { useCreatePostingLimit, useGetPostingLimitByBranchCode } from '@/api/admin/usePostingLimit';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { CreatePostingLimit } from '@/features/Administrator/Forms/CreatePostingLimit';
import { useCurrentBreakpoint } from '@/utils';

const mutateCreatePostingLimit = jest.fn();

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

jest.mock('../../../utils/hooks/useGetParams', () => ({
    useGetParams: jest.fn(),
}));

jest.mock('../../../api/admin/usePostingLimit', () => ({
    useCreatePostingLimit: jest.fn(),
    useGetPostingLimitByBranchCode: jest.fn(),
}));

jest.mock('../../../utils/hooks/useMapSelectOptions', () => ({
    useMapSelectOptions: jest.fn(),
}));

jest.mock('../../../utils', () => ({
    useCurrentBreakpoint: jest.fn(),
}));

jest.mock('../../../utils/encryptData', () => ({
    encryptData: jest.fn(),
}));

describe('CreatePostingLimit Component', () => {
    beforeEach(() => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (useGetParams as jest.Mock).mockImplementation(param => (param === 'roleId' ? 'testRoleId' : 'testBranchId'));
        (useCreatePostingLimit as jest.Mock).mockReturnValue({ mutate: mutateCreatePostingLimit });
        (useGetPostingLimitByBranchCode as jest.Mock).mockReturnValue({ isLoading: false, limit: {} });
        (useMapSelectOptions as jest.Mock).mockReturnValue({ mappedBranches: [], mappedRole: [] });
        (useCurrentBreakpoint as jest.Mock).mockReturnValue({ isMobile: false, setWidth: jest.fn(), isTablet: false });
    });

    const render = () =>
        renderComponent(
            <CreatePostingLimit unitTestingInitialValues={{
                userId: 'testUserId',
                authId: 'testAuthId',
                branchCode: 'testBranchId',
                roleId: 1,
                branchCredit: '',
                branchDebit: '',
                interBranchCr: '',
                interBranchDr: '',
                interBankCr: 0,
                interBankDr: '',
                tdLimit: '',
                loanLimit: ''
            }} isSubmitting={false} setIsSubmitting={jest.fn()} branches={[]} roles={[]} />
        );

    test('renders the component with fields', () => {
        render();

        expect(screen.getByText('Create New Limit')).toBeInTheDocument();
        expect(screen.getByLabelText(/Credit Limit/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Debit Limit/i)).toBeInTheDocument();
    });

    test('displays loading skeleton when isEditing is true and loading', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('isEditing=true'));
        (useGetPostingLimitByBranchCode as jest.Mock).mockReturnValue({ isLoading: true });

        render();

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    test('validates required fields on submit', async () => {
        render();

        fireEvent.click(screen.getByText(/submit alias/i));

        await waitFor(() => {
            expect(screen.getAllByText(/required/i)[0]).toBeInTheDocument();
        });
    });

    test('calls onSubmit with valid values', async () => {

        render();

        act(() => {
            fireEvent.change(screen.getByLabelText(/Credit Limit/i), { target: { value: '100' } });
            fireEvent.change(screen.getByLabelText(/Debit Limit/i), { target: { value: '200' } });
            fireEvent.change(screen.getByLabelText(/CR Interbranch Limit/i), { target: { value: '300' } });
            fireEvent.change(screen.getByLabelText(/DR Interbranch Limit/i), { target: { value: '400' } });
            fireEvent.change(screen.getByLabelText(/CR Interbank Limit/i), { target: { value: '500' } });
            fireEvent.change(screen.getByLabelText(/DR Interbank Limit/i), { target: { value: '600' } });
            fireEvent.change(screen.getByLabelText(/Term Deposit Limit/i), { target: { value: '700' } });
            fireEvent.change(screen.getByLabelText(/Loan Limit/i), { target: { value: '800' } });

            fireEvent.click(screen.getByText(/submit alias/i));
        });

        await waitFor(() => {
            expect(mutateCreatePostingLimit).toHaveBeenCalledTimes(1);
        });
    });
});
