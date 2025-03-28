import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useFilterGLAccountSearch } from '@/api/admin/useCreateGLAccount';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { GLAccount } from '@/features/Administrator';

jest.mock('../../../api/admin/useCreateGLAccount');
jest.mock('../../../api/general/useBranches');
jest.mock('../../../utils/hooks/useCurrencyFormat');
jest.mock('../../../utils/hooks/useDateFormat');
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const mockRouter = {
    push: jest.fn(),
};
const mockBranches = [{ branchCode: '001', branchName: 'Main Branch' }];

// Mock next/link
jest.mock('next/link', () => ({ children, href }: { children: React.ReactNode, href: string }) => (
    <div
        onClick={() => mockRouter.push(href)}
        onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                mockRouter.push(href);
            }
        }}
        role="button"
        tabIndex={0}
    >
        {children}
    </div>
));

describe('GLAccount Component', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
    });

    it('renders loading state with skeleton loader', () => {
        (useFilterGLAccountSearch as jest.Mock).mockReturnValue({
            isLoading: true,
        });

        render(<GLAccount />);

        expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('renders data rows based on fetched data', async () => {
        const mockData = [
            {
                glnumber: '12345',
                acctName: 'Main Account',
                dateOpened: '2023-11-01T00:00:00Z',
                bkbalance: 1000,
            },
        ];

        (useFilterGLAccountSearch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            totalPages: 1,
            totalElements: 1,
        });

        (formatCurrency as jest.Mock).mockReturnValue('$1,000');
        (formatDateAndTime as jest.Mock).mockReturnValue('01 Nov 2023');

        render(<GLAccount />);
        await userEvent.click(screen.getByTestId('action-button'));

        await expect(screen.getByText('12345')).toBeInTheDocument();
        await expect(screen.getByText('Main Account')).toBeInTheDocument();
        await expect(screen.getByText('01 Nov 2023')).toBeInTheDocument();
        await expect(screen.getByText('$1,000')).toBeInTheDocument();
    });

    it('navigates to create GL account page on button click', async () => {
        const mockData = [
            {
                glnumber: '12345',
                acctName: 'Main Account',
                dateOpened: '2023-11-01T00:00:00Z',
                bkbalance: 1000,
            },
        ];

        (useFilterGLAccountSearch as jest.Mock).mockReturnValue({
            data: mockData,
            isLoading: false,
            totalPages: 1,
            totalElements: 1,
        });

        render(<GLAccount />);

        const createButton = screen.getByText(/Create General Ledger/i);
        await userEvent.click(createButton);

        expect(mockRouter.push).toHaveBeenCalledTimes(1);
        expect(mockRouter.push).toHaveBeenCalledWith('/admin/gl-account/create');
    });

    it('renders empty table state when no data', () => {
        (useFilterGLAccountSearch as jest.Mock).mockReturnValue({
            data: [],
            isLoading: false,
            totalPages: 0,
            totalElements: 0,
        });

        render(<GLAccount />);
        expect(screen.getByText(/No Search Found/i)).toBeInTheDocument();
    });
});
