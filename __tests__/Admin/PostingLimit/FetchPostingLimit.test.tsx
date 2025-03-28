import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PostingLimit } from '@/features/Administrator/PostingLimit';
import { useFilterPostingLimitSearch } from '@/api/admin/usePostingLimit';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

jest.mock('../../../api/admin/usePostingLimit');
jest.mock('../../../api/general/useBranches');
jest.mock('../../../utils/hooks/useCurrencyFormat', () => ({
    formatCurrency: jest.fn(value => value.toLocaleString()),
}));

describe('PostingLimit Component', () => {
    const mockBranches = [{ id: '1', name: 'Branch 1' }];
    const mockData = [
        {
            role_name: 'Role 1',
            branchCredit: 1000,
            branchDebit: 500,
            roleid: 'role1',
            branchcode: 'branch1'
        }
    ];

    beforeEach(() => {
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
        (useFilterPostingLimitSearch as jest.Mock).mockReturnValue({
            totalPages: 1,
            totalElements: 1,
            data: mockData,
            isLoading: false,
        });
    });

    const setupComponent = () => render(<PostingLimit />);

    test('renders the component with top action area and filter section', () => {
        setupComponent();
        expect(screen.getByText('Create New Limit')).toBeInTheDocument();
        expect(screen.getAllByText('Branch ID')[0]).toBeInTheDocument();
    });

    test('displays a loading skeleton when data is loading', () => {
        (useFilterPostingLimitSearch as jest.Mock).mockReturnValue({
            isLoading: true,
        });

        setupComponent();
        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    test('renders the empty table body when no search results are found', () => {
        (useFilterPostingLimitSearch as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
        });

        setupComponent();
        expect(screen.getByText(/No search/i)).toBeInTheDocument();
    });

    test('displays table data when search results are found', async () => {
        setupComponent();
        await userEvent.click(screen.getByTestId('action-button'));

        expect(screen.getByText('Role 1')).toBeInTheDocument();
        expect(screen.getByText('NGN 1,000')).toBeInTheDocument();
        expect(screen.getByText('NGN 500')).toBeInTheDocument();
    });

    test('invokes the handleSearch function when performing a search', async () => {
        setupComponent();
        fireEvent.click(screen.getByText('Create New Limit'));

        await waitFor(() => {
            expect(useFilterPostingLimitSearch).toHaveBeenCalledWith(expect.objectContaining({
                page: 1,
            }));
        });
    });

    test('formats currency correctly for credit and debit limits', () => {
        setupComponent();

        expect(formatCurrency).toHaveBeenCalledWith(1000);
        expect(formatCurrency).toHaveBeenCalledWith(500);
    });
});
