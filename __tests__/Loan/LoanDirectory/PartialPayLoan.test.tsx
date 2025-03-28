import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { LoanPartialPayOff } from '@/features/Loan/Forms/LoanPartialPayOff';
import { usePartialPayOfflLoan } from '@/api/loans/useCreditFacility';

// Mock the usePartialPayOfflLoan hook
jest.mock('../../../api/loans/useCreditFacility', () => ({
  usePartialPayOfflLoan: jest.fn()
}));

describe('LoanPartialPayOff Component', () => {
  const mockMutate = jest.fn();
  const setIsSubmitting = jest.fn();

  beforeEach(() => {
    (usePartialPayOfflLoan as jest.Mock).mockReturnValue({
      mutate: mockMutate
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoanPartialPayOff component', () => {
    const { getByText } = render(
      <LoanPartialPayOff
        accountNumber="123456"
        settlementacct1="settlementAccount"
        setIsSubmitting={setIsSubmitting}
      />
    );

    expect(getByText(/Loan Partial Payoff/i)).toBeInTheDocument();
  });

  test('does not submit form with invalid data', async () => {
    const { getByText } = render(
      <LoanPartialPayOff
        accountNumber="123456"
        settlementacct1="settlementAccount"
        setIsSubmitting={setIsSubmitting}
      />
    );

    fireEvent.click(getByText(/submit alias/i));

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  test('handles isSubmitting state', async () => {
    const { getByText } = render(
      <LoanPartialPayOff
        accountNumber="123456"
        settlementacct1="settlementAccount"
        isSubmitting
        setIsSubmitting={setIsSubmitting}
      />
    );

    expect(setIsSubmitting).toHaveBeenCalledWith(false);
  });

  test('calls setIsSubmitting when form is submitted', async () => {
    const { getByLabelText, getByText } = render(
      <LoanPartialPayOff
        accountNumber="123456"
        settlementacct1="settlementAccount"
        setIsSubmitting={setIsSubmitting}
      />
    );

    fireEvent.change(getByLabelText(/New Rate/i), { target: { value: '3.2' } });
    fireEvent.click(getByText(/submit alias/i));

    await waitFor(() => {
      expect(setIsSubmitting).toHaveBeenCalledWith(false);
    });
  });

  test('submits form with valid data', async () => {
    jest.clearAllMocks();
    const { getByLabelText, getByText } = render(
      <LoanPartialPayOff
        accountNumber="123456"
        settlementacct1="settlementAccount"
        setIsSubmitting={setIsSubmitting}
      />
    );

    fireEvent.change(getByLabelText(/New Rate/i), { target: { value: '3.2' } });
    fireEvent.change(getByLabelText(/New Term/i), { target: { value: '5' } });
    fireEvent.change(getByLabelText(/Start Date/i), {
      target: { value: '2023-01-01' }
    });
    fireEvent.change(getByLabelText(/Maturity Date/i), {
      target: { value: '2023-12-31' }
    });
    fireEvent.change(getByLabelText(/Total Days/i), {
      target: { value: '365' }
    });
    fireEvent.change(getByLabelText(/Principal Outstanding/i), {
      target: { value: '10000' }
    });
    fireEvent.change(getByLabelText('Interest Outstanding'), {
      target: { value: '500' }
    });
    fireEvent.change(getByLabelText(/Penal Interest Outstanding/i), {
      target: { value: '100' }
    });
    fireEvent.change(getByLabelText(/Principal Payout/i), {
      target: { value: '2000' }
    });
    fireEvent.change(getByLabelText('Interest Payout'), {
      target: { value: '500' }
    });
    fireEvent.change(getByLabelText(/Penal Interest Payout/i), {
      target: { value: '50' }
    });

    fireEvent.click(getByText(/submit alias/i));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          loanacct: '123456',
          settlementAcct: 'settlementAccount',
          newrate: '3.2',
          newtenor: '5',
          startdate: null,
          matdate: null,
          totalDays: '365',
          newprincipal: '10000',
          intoutst: '500',
          penintoutst: '100',
          princpayout: '2000',
          intpayout: '500',
          penintpayout: '50',
          freq: '',
          princoutst: 0
        })
      );
    });
  });
});
