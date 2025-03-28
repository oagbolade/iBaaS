import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClassifyAccount } from '@/features/Administrator/Forms/ClassifyAccount';
import { useAddAccountClassify } from '@/api/finance/useFinanceAccount';

// Mock the custom hooks
jest.mock('../../../api/finance/useFinanceAccount');
jest.mock('../../../utils', () => ({
  useCurrentBreakpoint: () => ({
    isMobile: false,
    isTablet: true,
    setWidth: (width: string) => width
  })
}));

describe('ClassifyAccount Component', () => {
  const mockMutate = jest.fn();
  const defaultProps = {
    isSubmitting: false,
    setIsSubmitting: jest.fn(),
    accountNumber: '12345'
  };

  beforeEach(() => {
    (useAddAccountClassify as jest.Mock).mockReturnValue({
      mutate: mockMutate
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ClassifyAccount component with all form fields', () => {
    render(<ClassifyAccount {...defaultProps} />);

    expect(screen.getByText('Classify Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Account Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Classification Type')).toBeInTheDocument();
    expect(screen.getByText('Classify')).toBeInTheDocument();
    expect(screen.getByText('De-Classify')).toBeInTheDocument();
  });

  test('handles radio button selection for classify/de-classify', async () => {
    render(<ClassifyAccount {...defaultProps} />);

    const declassifyRadio = screen.getByLabelText('De-Classify');
    await userEvent.click(declassifyRadio);

    expect(declassifyRadio).toBeChecked();
  });

  test('displays account number in disabled input field', () => {
    render(<ClassifyAccount {...defaultProps} />);

    const accountNumberInput = screen.getByLabelText(
      'Account Number'
    ) as HTMLInputElement;
    expect(accountNumberInput).toBeDisabled();
    expect(accountNumberInput).toHaveValue('12345');
  });

  test('handles classification type selection', async () => {
    render(<ClassifyAccount {...defaultProps} />);

    const selectField = screen.getByLabelText('Classification Type');
    await userEvent.click(selectField);

    const option = screen.getAllByRole('option', {
      name: 'Active Interest Accrual'
    })[0];
    await userEvent.click(option);

    // eslint-disable-next-line testing-library/no-node-access
    const hiddenInput = document.querySelector('input[name="provisionType"]');
    expect(hiddenInput).toHaveValue('0');
  });
  test('submits form with correct values when isSubmitting is true', async () => {
    render(<ClassifyAccount {...defaultProps} isSubmitting />);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        classify: 1,
        accountNumber: '12345',
        provisionType: 0
      });
    });
  });
});
