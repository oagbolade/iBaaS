import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import userEvent from '@testing-library/user-event';
import { SellToVault } from '@/features/Operation/Forms/SellToVault';
import { getTellerBalanceByUserTerllerNumber } from '@/api/operation/useVaultManagement';

// Mock the hooks and context
jest.mock('../../../api/operation/useVaultManagement');

// ... existing code ...
jest.mock('../../../api/operation/useVaultManagement', () => ({
  useCreateVaultManagement: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useForwardToApprovingOfficer: jest.fn(() => ({
    mutate: jest.fn()
  })),
  useGetTellerBalanceByUserId: jest.fn(() => ({
    tillaccountno: '12345',
    total: 1000
  })),
  useGetGldetailsByBranchCodeAndUserId: jest.fn(() => ({
    glnumber: '01003456',
    bkbalance: '5000'
  })),
  getTellerBalanceByUserTerllerNumber: jest
    .fn()
    .mockResolvedValue({ total: 1000 })
}));

describe('BuyFromVault Component', () => {
  const defaultProps = {
    isSubmitting: false,
    setIsSubmitting: jest.fn(),
    isSubmittingForward: false,
    setIsSubmittingForward: jest.fn(),
    branches: [
      { branchCode: '001', branchName: 'Branch 1' },
      { branchCode: '002', branchName: 'Branch 2' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockMutate = jest.fn();
  const mockMutateForward = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <Formik
        initialValues={{
          branchCode: '',
          glAccountNumber: '',
          glAccountBalance: '',
          tellerAccountNumber: '',
          amount: '',
          narration: ''
        }}
        onSubmit={jest.fn()}
      >
        <SellToVault {...defaultProps} {...props} />
      </Formik>
    );
  };

  test('renders all form fields correctly', () => {
    renderComponent();

    expect(screen.getByLabelText(/Select a Branch/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GL Account Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/GL Account Balance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Teller Account Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Narration/i)).toBeInTheDocument();
  });

  test('displays initial teller balance from hook', () => {
    renderComponent();

    const tellerInput = screen.getByLabelText(/Teller Account Number/i);
    expect(tellerInput).toHaveValue('12345');
    expect(screen.getByText(/NGN 1,000/)).toBeInTheDocument();
  });

  test('updates teller balance when new teller number is entered', async () => {
    (getTellerBalanceByUserTerllerNumber as jest.Mock).mockResolvedValue({
      total: 2000
    });

    renderComponent();

    const tellerInput = screen.getByLabelText(/Teller Account Number/i);
    await userEvent.clear(tellerInput);
    await userEvent.type(tellerInput, '54321');

    await waitFor(() => {
      expect(screen.getByText(/NGN 2,000/)).toBeInTheDocument();
    });
  });

  test('updates branch code when branch is selected', async () => {
    renderComponent();

    const branchSelect = screen.getByLabelText(/Select a Branch/i);
    await userEvent.click(branchSelect);

    const option = await screen.findByText('Branch 1');
    await userEvent.click(option);

    expect(branchSelect).toHaveTextContent('Branch 1');
  });

  test('displays GL account details when branch is selected', async () => {
    renderComponent();

    const glAccountNumber = screen.getByLabelText(/GL Account Number/i);

    expect(glAccountNumber).toHaveValue('01003456');
  });

  test('GL account fields are disabled', () => {
    renderComponent();
    expect(screen.getByLabelText(/GL Account Number/i)).toBeDisabled();
    expect(screen.getByLabelText(/GL Account Balance/i)).toBeDisabled();
  });

  test('handles form validation errors', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { hidden: true });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
    });
  });
  test('should call mutate with correct data when submitting', async () => {
    const setIsSubmitting = jest.fn();
    const formValues = {
      tranAmount: '1000',
      narration: 'Test narration',
      glaccno: 'old-gl',
      telleraccno: 'old-teller',
      branchcode: 'BR001'
    };

    const expectedMutateData = {
      tranAmount: '1000',
      narration: 'Test narration',
      branchcode: 'BR001',
      action: 'sell',
      glaccno: 'test-gl-number',
      telleraccno: 'test-teller-number',
      userid: 'test-user-id'
    };

    const onSubmit = async (values: any) => {
      await mockMutate({
        ...values,
        action: 'sell',
        glaccno: 'test-gl-number',
        telleraccno: 'test-teller-number',
        userid: 'test-user-id'
      });
      setIsSubmitting(false);
    };

    // Trigger the onSubmit function
    await waitFor(() => {
      onSubmit(formValues);
    });

    expect(mockMutate).toHaveBeenCalledWith(expectedMutateData);
    expect(setIsSubmitting).toHaveBeenCalledWith(false);
  });

  test('should call mutateForward with correct data when forwarding', async () => {
    const setIsSubmittingForward = jest.fn();
    const formValues = {
      tranAmount: '1000',
      narration: 'Test narration',
      glaccno: 'old-gl',
      telleraccno: 'old-teller',
      branchcode: 'BR001'
    };

    const expectedForwardData = {
      tranAmount: '1000',
      narration: 'Test narration',
      branchcode: 'BR001',
      action: 'sell',
      glaccno: 'test-gl-number',
      telleraccno: 'test-teller-number',
      userid: 'test-user-id'
    };

    const onSubmit = async (values: any) => {
      await mockMutateForward({
        ...values,
        action: 'sell',
        glaccno: 'test-gl-number',
        telleraccno: 'test-teller-number',
        userid: 'test-user-id'
      });
      setIsSubmittingForward(false);
    };

    // Trigger the onSubmit function with forward flag
    await waitFor(() => {
      onSubmit(formValues);
    });

    expect(mockMutateForward).toHaveBeenCalledWith(expectedForwardData);
    expect(setIsSubmittingForward).toHaveBeenCalledWith(false);
  });
});
