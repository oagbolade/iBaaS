import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { act } from 'react-dom/test-utils';
import {
  useCreateBatchPosting,
  useGetGenerateBatchNo
} from '@/api/operation/useBatchPosting';
import '@testing-library/jest-dom';
import { Formik } from 'formik';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mockToastActions } from '@/mocks';
import { BatchPosting } from '@/features/Operation/Forms/BatchPosting';
// Mock the APIs used in the component

const mockCreateBatchPosting = jest.fn();

jest.mock('../../../api/operation/useBatchPosting', () => ({
  useCreateBatchPosting: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useGetGenerateBatchNo: jest.fn(() => ({ batchno: '001' }))
}));
jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: jest.fn()
  };
});
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
jest.mock('../../../api/customer-service/useCustomer', () => ({
  searchCustomer: jest.fn(),
  useGetAccountDetails: jest.fn(() => ({
    accDetailsResults: { accountnumber: '1234567890' },
    isLoading: false
  }))
}));
describe('BatchPosting Component', () => {
  const mutateMock = jest.fn();
  const mockUseQuery = useQuery as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQuery.mockReturnValue({
      data: { customerName: 'Test Customer', accountNumber: '1234567890' },
      isLoading: false,
      isError: false
    });
    (useCreateBatchPosting as jest.Mock).mockReturnValue({
      mutate: jest.fn()
    });
  });
  const renderComponent = () =>
    render(
      <ToastMessageContext.Provider value={mockToastActions}>
        <Formik initialValues={{}} onSubmit={mutateMock}>
          <BatchPosting
            currencies={[
              { label: 'USD', value: 'USD' },
              { label: 'EUR', value: 'EUR' }
            ]}
            details={[{ name: 'Deposit', value: 'Deposit' }]}
            isSubmitting
            setIsSubmitting={jest.fn()}
          />
        </Formik>
      </ToastMessageContext.Provider>
    );

  it('renders the form correctly', async () => {
    renderComponent();
    expect(screen.getByLabelText('Transaction Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Rate')).toBeInTheDocument();
  });

  it('saves batch data when "Save Batch" is clicked', async () => {
    renderComponent();

    const saveBatchButton = screen.getByRole('button', { name: /Save Batch/i });
    const valueDate = screen.getByPlaceholderText('MM/DD/YYYY');
    const payment = screen.getByLabelText(/Pay Amount/i);
    const debitAccountNumber = screen.getByRole('button', {
      name: 'Search Account Number'
    });
    fireEvent.change(valueDate, { target: { value: '01/01/2023' } });
    fireEvent.change(debitAccountNumber, { target: { value: '12345678999' } });
    const voucherNumber = screen.getByLabelText(/voucher number/i);
    const chequeNumber = screen.getByLabelText(/Cheque Number/i);
    fireEvent.change(voucherNumber, { target: { value: '1' } });
    fireEvent.change(chequeNumber, { target: { value: '009' } });
    fireEvent.change(payment, { target: { value: '100' } });
    const narrationInput = screen.getByLabelText(/Narration/i);
    fireEvent.change(narrationInput, { target: { value: 'Test narration' } });
    expect(valueDate).toHaveValue('01/01/2023');
    expect(narrationInput).toHaveValue('Test narration');
    expect(debitAccountNumber).toHaveValue('12345678999');
    expect(voucherNumber).toHaveValue('1');
    expect(chequeNumber).toHaveValue('009');
    expect(payment).toHaveValue('100');

    fireEvent.click(saveBatchButton);

    await waitFor(() => {
      expect(screen.getByText(/Saved Batches/i)).toBeInTheDocument();
    });
  });
  it('shows validation error if required fields are missing', async () => {
    renderComponent();

    const submitButton = screen.getByText(/submit alias/i);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/Narration is required/i)).toBeInTheDocument();
    });
  });
});
