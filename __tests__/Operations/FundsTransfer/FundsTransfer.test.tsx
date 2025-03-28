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
const toastMock = jest.fn(); // Mock the toast function
jest.mock('../../../utils/toast', () => ({
  toast: jest.fn()
}));
jest.mock('../../../api/operation/useFundsTransfer', () => ({
  useFundsTransfer: jest.fn(() => ({}))
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
const setup = () => render(<FundsTransfer currencies={[]} commBanks={[]} />);

describe.only('FundsTransfer Component', () => {
  const mutateMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useFundsTransfer as jest.Mock).mockReturnValue({
      mutate: jest.fn()
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
    expect(screen.getByText('Debit Account Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Transaction Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Rate')).toBeInTheDocument();
  });
  it('renders the FundsTransfer component with required elements', async () => {
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
          <FundsTransfer
            currencies={[{ label: 'USD', value: 'USD' }]}
            commBanks={[]}
          />
        </Formik>
      </ToastMessageContext.Provider>
    );
    expect(screen.getByText('Funds Transfer')).toBeInTheDocument();
    const currencyFields = screen.getAllByLabelText('Currency');
    expect(currencyFields.length).toBeGreaterThan(0);
    expect(currencyFields[0]).toBeInTheDocument();
    const rate = screen.getByLabelText(/rate/i);
    const voucherNumber = screen.getByLabelText(/Teller Number/i);
    fireEvent.change(voucherNumber, { target: { value: '1' } });
    fireEvent.change(rate, { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/pay amount/i), {
      target: { value: '100' }
    });
    const narrationInput = screen.getByLabelText(/Narration/i);
    fireEvent.change(narrationInput, { target: { value: 'Test narration' } });
    expect(narrationInput).toHaveValue('Test narration');
    expect(rate).toHaveValue('1');
    expect(voucherNumber).toHaveValue('1');
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitFor(() => expect(mutateMock).toHaveBeenCalledTimes(1));
  });
  it('displays validation error messages when required fields are missing', async () => {
    render(<FundsTransfer currencies={[]} commBanks={[]} />);

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Narration is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/Currency Code is Required/i)
      ).toBeInTheDocument();
    });
  });
});
