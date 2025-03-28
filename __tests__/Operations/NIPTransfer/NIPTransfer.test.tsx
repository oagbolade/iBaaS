import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useNipTransfer } from '@/api/operation/useNipTransfer';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { useNipGetBeneficiaryInformation } from '@/api/operation/useNipGetBeneficiaryInformation';
import { useGetNibbsBanks } from '@/api/operation/useGetNibbsBanks';
import { NIPTransfer } from '@/features/Operation/Forms/NIPTransfer';
import { mockToastActions } from '@/mocks';

// Mock API calls and hooks
const mockCreateNIPTransfer = jest.fn();

jest.mock('../../../api/operation/useNipTransfer', () => ({
  useNipTransfer: jest.fn(() => ({
    mutate: jest.fn()
  }))
}));
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}));
jest.mock('../../../api/customer-service/useCustomer', () => ({
  useGetAccountDetails: jest.fn()
}));

jest.mock('../../../api/operation/useNipGetBeneficiaryInformation', () => ({
  useNipGetBeneficiaryInformation: jest.fn()
}));

jest.mock('../../../api/operation/useGetNibbsBanks', () => ({
  useGetNibbsBanks: jest.fn()
}));
jest.mock('@mui/x-date-pickers/internals/demo', () => ({
  DemoContainer: () => 'DemoContainer',
  DemoItem: () => 'DemoItem'
}));
jest.mock('@uidotdev/usehooks', () => ({
  // Provide a basic mock implementation, if needed
  ActionButtonWithPopper: () => 'ActionButtonWithPopper'
}));
jest.mock('../../../utils/toast', () => ({
  toast: jest.fn()
}));
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
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

describe('NIPTransfer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useNipTransfer as jest.Mock).mockReturnValue({
      mutate: mockCreateNIPTransfer
    });
    (useGetAccountDetails as jest.Mock).mockReturnValue({
      accDetailsResults: {
        accounttitle: 'John Doe',
        bvn: '123456789'
      }
    });
    (useNipGetBeneficiaryInformation as jest.Mock).mockReturnValue({
      data: {
        nameInquiryReference: 'ref123',
        accountName: 'Jane Doe'
      },
      isLoading: false
    });
    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => ({
      data: { accountDetailsResults: [] },
      isLoading: false
    }));
    (useGetNibbsBanks as jest.Mock).mockReturnValue({
      data: {
        '001': 'Bank A',
        '002': 'Bank B'
      }
    });
  });

  it('renders the form with fields and buttons', () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: { isEditing: 'true' },
      pathname: '/operation/NIPTransfer/',
      asPath: '/operation/NIPTransfer/'
    });

    render(<NIPTransfer commBanks={[]} currencies={[]} />);

    expect(screen.getByText('NIP Transfer')).toBeInTheDocument();
    expect(screen.getByText('Beneficiary Account Number')).toBeInTheDocument();

    const currencyFields = screen.getAllByLabelText('Currency');
    expect(currencyFields.length).toBeGreaterThan(0);
    expect(
      screen.getByText('Forward to Approving Officer')
    ).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('handles form submission with valid input', async () => {
    render(
      <ToastMessageContext.Provider value={mockToastActions}>
        <Formik initialValues={{}} onSubmit={mockCreateNIPTransfer}>
          <NIPTransfer
            currencies={[{ label: 'USD', value: 'USD' }]}
            commBanks={[]}
          />
        </Formik>
      </ToastMessageContext.Provider>
    );
    const rate = screen.getByLabelText(/rate/i);

    const debitAccountNumber = screen.getByRole('button', {
      name: 'Search'
    });
    fireEvent.change(debitAccountNumber, { target: { value: '12345678999' } });
    const voucherNumber = screen.getByLabelText(/Teller Number/i);
    fireEvent.change(voucherNumber, { target: { value: '1' } });
    fireEvent.change(rate, { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/pay amount/i), {
      target: { value: '100' }
    });
    const narrationInput = screen.getByLabelText(/Narration/i);
    fireEvent.change(narrationInput, { target: { value: 'Test narration' } });
    expect(narrationInput).toHaveValue('Test narration');
    expect(debitAccountNumber).toHaveValue('12345678999');
    expect(rate).toHaveValue('1');
    expect(voucherNumber).toHaveValue('1');
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(mockCreateNIPTransfer).toHaveBeenCalledTimes(1));
  });
});
