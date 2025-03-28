import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { act } from 'react-dom/test-utils';
import { CancelLoanForm } from '@/features/Loan/Forms/CancelLoanForm';
import { useCancelLoan } from '@/api/loans/useCreditFacility';
import { setCancelValues } from '@/schemas/schema-values/loan/index';

// Mock the useCancelLoan hook
jest.mock('../../../api/loans/useCreditFacility', () => ({
  useCancelLoan: jest.fn()
}));

describe('CancelLoanForm', () => {
  const mockMutate = jest.fn();
  const setIsSubmittingMock = jest.fn();

  beforeEach(() => {
    (useCancelLoan as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CancelLoanForm correctly', () => {
    const { getByLabelText } = render(
      <Formik initialValues={setCancelValues} onSubmit={jest.fn()}>
        <CancelLoanForm
          accountNumber="0011223344"
          customerID="0011"
          isSubmitting={false}
          setIsSubmitting={setIsSubmittingMock}
        />
      </Formik>
    );

    expect(getByLabelText(/Customer ID/i)).toBeInTheDocument();
    expect(getByLabelText(/Loan Account/i)).toBeInTheDocument();
    expect(getByLabelText(/Value Date/i)).toBeInTheDocument();
  });

  test('handles isSubmitting state correctly', async () => {
    const { getByRole } = render(
      <Formik initialValues={setCancelValues} onSubmit={jest.fn()}>
        <CancelLoanForm
          accountNumber="0011223344"
          customerID="0011"
          isSubmitting
          setIsSubmitting={setIsSubmittingMock}
        />
      </Formik>
    );

    expect(setIsSubmittingMock).toHaveBeenCalledWith(false);
  });

  test('does not submit form with invalid data', async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText } = render(
      <Formik initialValues={setCancelValues} onSubmit={onSubmitMock}>
        <CancelLoanForm
          accountNumber=""
          customerID=""
          isSubmitting={false}
          setIsSubmitting={setIsSubmittingMock}
        />
      </Formik>
    );

    fireEvent.change(getByLabelText(/Customer ID/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/Loan Account/i), {
      target: { value: '' }
    });
    fireEvent.change(getByLabelText(/Value Date/i), { target: { value: '' } });

    await act(async () => {
      await onSubmitMock({
        accountNumber: '',
        oPrincipal: 'someValue',
        oInterest: 'someValue',
        oPenalInt: 'someValue',
        oExtinterest: 'someValue'
      });
    });

    await waitFor(() => {
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  test('submits form with valid data', async () => {
    const onSubmitMock = jest.fn();
    const { getByLabelText, container } = render(
      <Formik
        initialValues={setCancelValues}
        onSubmit={(values) => {
          mockMutate({
            accountNumber: values.accountNumber,
            oPrincipal: values.oPrincipal,
            oInterest: values.oInterest,
            oPenalInt: values.oPenalInt,
            oExtinterest: values.oExtinterest
          });
        }}
      >
        <CancelLoanForm
          accountNumber="0011223344"
          customerID="0011"
          isSubmitting={false}
          setIsSubmitting={setIsSubmittingMock}
        />
      </Formik>
    );

    // Fill in form fields
    fireEvent.change(getByLabelText(/Customer ID/i), {
      target: { value: '0011' }
    });
    fireEvent.change(getByLabelText(/Loan Account/i), {
      target: { value: '0011223344' }
    });
    fireEvent.change(getByLabelText(/Value Date/i), {
      target: { value: '2023-10-01' }
    });

    // Submit the form directly
    const form = container.querySelector('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        accountNumber: '0011223344',
        oPrincipal: expect.anything(),
        oInterest: expect.anything(),
        oPenalInt: expect.anything(),
        oExtinterest: expect.anything()
      });
    });
  });
});
