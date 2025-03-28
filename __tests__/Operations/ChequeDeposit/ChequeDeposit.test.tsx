import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { Formik } from 'formik';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useFundsTransfer } from '@/api/operation/useFundsTransfer';
import { useCurrentBreakpoint } from '@/utils';
import { FundsTransfer } from '@/features/Operation/Forms/FundsTransfer';
import {
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { toast } from '@/utils/toast';
import { mockToastActions } from '@/mocks';
import { ChequeDeposit } from '@/features/Operation/Forms/ChequeDeposit';
import { useCreateChequeDeposit } from '@/api/operation/useChequeDeposit';

const mutateMock = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}));
jest.mock('@mui/x-date-pickers/internals/demo', () => ({
  DemoContainer: () => 'DemoContainer',
  DemoItem: () => 'DemoItem'
}));
jest.mock('@uidotdev/usehooks', () => ({
  // Provide a basic mock implementation, if needed
  ActionButtonWithPopper: () => 'ActionButtonWithPopper'
}));
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

jest.mock('../../../features/Operation/Forms/style', () => ({
  BatchContainer: {},
  BatchTitle: {},
  PostingContainer: {},
  inputText: {},
  fundsContentStyle: {}
}));
jest.mock('../../../utils', () => ({
  useCurrentBreakpoint: jest.fn()
}));

jest.mock('../../../utils/toast', () => ({
  toast: jest.fn()
}));
jest.mock('../../../api/operation/useChequeDeposit', () => ({
  useCreateChequeDeposit: jest.fn(() => ({
    mutate: mutateMock
  }))
}));
jest.mock('../../../api/customer-service/useCustomer', () => ({
  searchCustomer: jest.fn(),
  useGetAccountDetails: jest.fn(() => ({
    accDetailsResults: {
      accountnumber: '12345678999',
      accountNumber1: '12345678999'
    },
    isLoading: false
  }))
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

const setup = () => render(<ChequeDeposit currencies={[]} />);
describe('Cheque Deposit Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateChequeDeposit as jest.Mock).mockReturnValue({
      mutate: mutateMock
    });

    (useQuery as jest.Mock).mockImplementation(({ queryFn }) => ({
      data: { accountDetailsResults: [] },
      isLoading: false
    }));

    (useCurrentBreakpoint as jest.Mock).mockReturnValue({
      isMobile: false,
      isTablet: false,
      setWidth: (value: any) => value
    });
  });
  it('Should render all form fields correctly', () => {
    setup();
    expect(screen.getByText('Search Source Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Cheque Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Rate')).toBeInTheDocument();
  });
  it('renders the ChequeDeposit component with required elements', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: { isEditing: 'true' },
      pathname: '/operation/fundsTransfer/',
      asPath: '/operation/fundsTransfer/'
    });
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: (param: string) => (param === 'isEditing' ? 'true' : null)
    }));
    render(
      <ToastMessageContext.Provider value={mockToastActions}>
        <Formik initialValues={{}} onSubmit={mutateMock}>
          <ChequeDeposit
            currencies={[{ label: 'USD', value: 'USD' }]}
            isSubmitting={false}
            setIsSubmitting={jest.fn()}
          />
        </Formik>
      </ToastMessageContext.Provider>
    );
    expect(screen.getByText('Cheque Deposit')).toBeInTheDocument();
    const ChequeNumber = screen.getByLabelText('Cheque Number');
    const Tellerno = screen.getByLabelText('Teller Number');

    const PayAmount = screen.getByLabelText('Pay Amount');
    const debitAccountNumber = screen.getByRole('button', {
      name: 'Search Source Number'
    });
    const accountNumber = screen.getByRole('button', {
      name: 'Search Destination Account'
    });
    fireEvent.change(debitAccountNumber, { target: { value: '12345678999' } });
    fireEvent.change(accountNumber, { target: { value: '12345678999' } });

    fireEvent.change(ChequeNumber, {
      target: { value: '100' }
    });
    fireEvent.change(Tellerno, {
      target: { value: '0' }
    });
    fireEvent.change(PayAmount, {
      target: { value: '10' }
    });
    const narrationInput = screen.getByLabelText(/Narration/i);
    const rate = screen.getByLabelText(/Rate/i);
    fireEvent.change(narrationInput, { target: { value: 'Test narration' } });
    fireEvent.change(rate, { target: { value: '1' } });
    expect(narrationInput).toHaveValue('Test narration');
    expect(ChequeNumber).toHaveValue('100');
    expect(Tellerno).toHaveValue('0');

    expect(PayAmount).toHaveValue('10');
    expect(rate).toHaveValue('1');
    expect(debitAccountNumber).toHaveValue('12345678999');
    expect(accountNumber).toHaveValue('12345678999');
    const expectedPayload = {
      accountNumber1: '12345678999',
      accountNumber2: '12345678999',
      action: 0,
      currencyCode: '',
      narration: 'Test narration',
      rate: 1,
      tellerno: 0,
      transAmount: '10',
      valueDate: '',
      cheqNumber: '100'
    };
    const submitButton = screen.getByText(/submit alias/i);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(expectedPayload);
    });
  });
  it('displays validation error messages when required fields are missing', async () => {
    render(<ChequeDeposit currencies={[]} />);

    const submitButton = screen.getByText(/submit alias/i);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Narration is required/i)).toBeInTheDocument();
    });
  });
});
