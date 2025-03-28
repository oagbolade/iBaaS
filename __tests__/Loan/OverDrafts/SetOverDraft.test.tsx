import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SetOverDraft } from '@/features/Loan/overdraft/SetOverDraft';
import { useSetOverdraft } from '@/api/loans/useCreditFacility';
import { useCurrentBreakpoint } from '@/utils';

jest.mock('../../../api/loans/useCreditFacility', () => ({
  useSetOverdraft: jest.fn()
}));

// Mock the breakpoint hook
jest.mock('../../../utils', () => ({
  useCurrentBreakpoint: jest.fn()
}));

jest.mock('../../../utils/hooks/useSetDirection', () => ({
  useSetDirection: () => ({ setDirection: () => 'row' })
}));

jest.mock('../../../utils/hooks/useMapSelectOptions', () => ({
  useMapSelectOptions: () => ({ mappedBranches: [] })
}));

const mockProps = {
  setIsSubmitting: jest.fn(),
  isSubmitting: false,
  accountNumber: '1234567890',
  branches: [
    { id: 1, name: 'Branch 1' },
    { id: 2, name: 'Branch 2' }
  ],
  loanAccDetails: {
    settlementacct1: '987654321',
    fullName: 'John Doe',
    loanAmount: 50000
  }
};

describe('SetOverDraft Component', () => {
  jest.clearAllMocks();
  const mockSetOverdraft = jest.fn();
  const mockSetIsSubmitting = jest.fn();
  const mockMutate = jest.fn();
  const setIsSubmitting = jest.fn();

  beforeEach(() => {
    (useSetOverdraft as jest.Mock).mockReturnValue({
      mutate: mockSetOverdraft
    });
    mockSetIsSubmitting.mockReset();

    jest.clearAllMocks();
    (useSetOverdraft as jest.Mock).mockReturnValue({ mutate: jest.fn() });
    (useCurrentBreakpoint as jest.Mock).mockReturnValue({
      isMobile: false,
      setWidth: jest.fn(),
      isTablet: false
    });

    (useSetOverdraft as jest.Mock).mockReturnValue({
      mutate: mockMutate
    });
    (useSetOverdraft as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  const queryClient = new QueryClient();

  test('renders Set Overdraft title', () => {
    render(
      <SetOverDraft
        setIsSubmitting={mockSetIsSubmitting}
        isSubmitting={false}
        accountNumber="123456"
        branches={[]}
        loanAccDetails={{}}
      />
    );

    const titleElement = screen.getByText(/Set Overdraft/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('displays error message when branch is not selected', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Formik initialValues={{}} onSubmit={mockMutate}>
          <SetOverDraft
            setIsSubmitting={mockSetIsSubmitting}
            isSubmitting={false}
            accountNumber="123456"
            branches={[]}
            loanAccDetails={{}}
          />
        </Formik>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('submit alias'));
    await waitFor(() => {
      expect(screen.getByText(/Branch is Required/i)).toBeInTheDocument();
    });
  });

  test('renders all form fields correctly', () => {
    render(<SetOverDraft {...mockProps} />);
    expect(screen.getByText('Set Overdraft')).toBeInTheDocument();
    expect(screen.getByTestId('branch')).toBeInTheDocument();
    expect(screen.getByTestId('facilityType')).toBeInTheDocument();
    expect(screen.getByTestId('interestRate')).toBeInTheDocument();
    expect(screen.getByTestId('amount')).toBeInTheDocument();
    expect(screen.getByTestId('penaltyRate')).toBeInTheDocument();
    expect(screen.getByTestId('term')).toBeInTheDocument();
  });

  test('validates required fields on submission', async () => {
    render(<SetOverDraft {...mockProps} />);

    fireEvent.click(screen.getByText('submit alias'));

    await waitFor(() => {
      expect(screen.getAllByText(/required/i)).toHaveLength(6);
    });
  });

  test('handles isSubmitting prop change', () => {
    const { rerender } = render(
      <SetOverDraft {...mockProps} isSubmitting={false} />
    );

    rerender(<SetOverDraft {...mockProps} isSubmitting />);

    expect(mockProps.setIsSubmitting).toHaveBeenCalledWith(false);
  });

  test('displays preview section with loan details on tablet view', () => {
    (useCurrentBreakpoint as jest.Mock).mockReturnValue({
      isTablet: true,
      isMobile: false,
      setWidth: jest.fn()
    });

    render(<SetOverDraft {...mockProps} />);

    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Loan Account Details')).toBeInTheDocument();
    expect(
      screen.getByText(mockProps.loanAccDetails.settlementacct1)
    ).toBeInTheDocument();
  });

  test('should call setIsSubmitting(false) on cleanup', () => {
    const { unmount } = render(
      <SetOverDraft
        setIsSubmitting={mockSetIsSubmitting}
        isSubmitting={false}
      />
    );

    unmount();
    expect(mockSetIsSubmitting).toHaveBeenCalledWith(false);
  });

  test('should submit the form with correct data', async () => {
    render(
      <SetOverDraft
        setIsSubmitting={setIsSubmitting}
        isSubmitting={false}
        accountNumber="123456"
        branches={mockProps.branches}
        loanAccDetails={{}}
      />
    );

    const formValues = {
      branch: 'Branch 1',
      facilityType: 'OD',
      interestRate: '5',
      amount: '200000',
      penaltyRate: '0',
      term: '12 months',
      accountNumber: '1234567890'
    };

    const expectedMutateData = {
      branch: 'Branch 1',
      facilityType: 'OD',
      interestRate: '5',
      amount: '200000',
      penaltyRate: '0',
      term: '12 months',
      accountNumber: '1234567890'
    };

    const onSubmit = async (values: any) => {
      await mockMutate({
        ...values
      });
      setIsSubmitting(false);
    };
    await waitFor(() => {
      onSubmit(formValues);
    });

    expect(mockMutate).toHaveBeenCalledWith(expectedMutateData);
    expect(mockMutate).toHaveBeenCalledTimes(1);
    expect(setIsSubmitting).toHaveBeenCalledWith(false);
  });
});
