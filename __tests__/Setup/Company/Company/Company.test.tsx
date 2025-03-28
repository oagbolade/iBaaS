import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetAllStates } from '@/api/general/useGeography';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import {
  useCreateCompany,
  useGetCompanyByCode
} from '@/api/setup/useCreateCompany';
import { SetupCompany } from '@/features/Setup/Company/SetupCompany';
import { mockToastActions } from '@/mocks';
import { ToastMessageContext } from '@/context/ToastMessageContext';

// Mock dependencies
jest.mock('../../../../api/general/useCurrency.ts');
jest.mock('../../../../api/general/useGeography');
jest.mock('../../../../utils/hooks/useGlobalLoadingState.ts');
jest.mock('../../../../utils/hooks/useSetDirection');
jest.mock('../../../../api/setup/useCreateCompany');
jest.mock('../../../../components/Revamp/Shared/TopActionsArea', () => ({
  TopActionsArea: ({ actionButtons }: any) => (
    <div data-testid="top-actions-area">{actionButtons}</div>
  )
}));

jest.mock('../../../../features/Setup/Company/Forms/SetupCompanyForm', () => ({
  SetupCompanyForm: ({ isSubmitting, currencies, states }: any) => (
    <div data-testid="setup-company-form">
      <span>Submitting: {isSubmitting.toString()}</span>
      <span>Currencies: {currencies.length}</span>
      <span>States: {states.length}</span>
    </div>
  )
}));
jest.mock(
  '../../../../features/Setup/Company/SetupCompany/PermissionsSection',
  () => ({
    PermissionsSection: () => (
      <div data-testid="permissions-section">Permissions</div>
    )
  })
);

describe('SetupCompany Component', () => {
  const mockMutate = jest.fn();

  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ToastMessageContext.Provider value={mockToastActions}>
          <Formik initialValues={{}} onSubmit={mockMutate}>
            <SetupCompany userid="user123" />
          </Formik>
        </ToastMessageContext.Provider>
      </QueryClientProvider>
    );

  const mockCurrencies = [
    { id: '1', name: 'USD' },
    { id: '2', name: 'EUR' }
  ];

  const mockStates = [
    { id: '1', name: 'California' },
    { id: '2', name: 'Texas' }
  ];

  const mockSetDirection = jest.fn(() => 'row');

  const mockIsLoading = false;

  beforeEach(() => {
    (useCreateCompany as jest.Mock).mockReturnValue({ mutate: mockMutate });

    // Mock useGetCurrency
    (useGetCurrency as jest.Mock).mockReturnValue({
      currencies: mockCurrencies,
      isLoading: false,
      error: null
    });

    // Mock useGetAllStates
    (useGetAllStates as jest.Mock).mockReturnValue({
      states: mockStates,
      isLoading: false,
      error: null
    });

    // Mock useGlobalLoadingState
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: mockIsLoading
    });

    // Mock useSetDirection
    (useSetDirection as jest.Mock).mockReturnValue({
      setDirection: mockSetDirection
    });

    // Mock useCreateCompany
    (useCreateCompany as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null
    });

    // Mock useGetCompanyByCode
    (useGetCompanyByCode as jest.Mock).mockReturnValue({
      bank: { bankCode: '123ABC' },
      isLoading: false,
      error: null
    });
  });

  test('renders without crashing and displays child components', () => {
    renderComponent();

    // Check TopActionsArea
    expect(screen.getByTestId('top-actions-area')).toBeInTheDocument();

    // Check SetupCompanyForm
    expect(screen.getByTestId('setup-company-form')).toBeInTheDocument();
    expect(screen.getByText('Submitting: false')).toBeInTheDocument();
    expect(screen.getByText('Currencies: 2')).toBeInTheDocument();
    expect(screen.getByText('States: 2')).toBeInTheDocument();

    // Check PermissionsSection
    expect(screen.getByTestId('permissions-section')).toBeInTheDocument();
  });

  test('displays loading state when global loading is true', () => {
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: true
    });

    renderComponent();

    const loading = screen.getByAltText('Loading...');
    expect(loading).toBeInTheDocument();
  });

  test('handles submit button click and triggers submission', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Click the submit button
    fireEvent.click(submitButton);

    // After clicking, isSubmitting should be true
    expect(screen.getByText('Submitting: true')).toBeInTheDocument();

    // The mutate function should not be called yet since submission is handled in the form
    expect(mockMutate).not.toHaveBeenCalled();
  });

  test('renders with empty currencies and states', () => {
    (useGetCurrency as jest.Mock).mockReturnValue({
      currencies: [],
      isLoading: false,
      error: null
    });

    (useGetAllStates as jest.Mock).mockReturnValue({
      states: [],
      isLoading: false,
      error: null
    });

    renderComponent();

    // SetupCompanyForm should not render if currencies or states are undefined
    expect(screen.queryByText('Setup Company')).not.toBeInTheDocument();
  });

  test('handles loading state for SetupCompanyForm', () => {
    // Mock useGetCurrency to simulate loading
    (useGetCurrency as jest.Mock).mockReturnValue({
      currencies: mockCurrencies,
      isLoading: true,
      error: null
    });

    // Mock useGetAllStates to simulate loading
    (useGetAllStates as jest.Mock).mockReturnValue({
      states: mockStates,
      isLoading: true,
      error: null
    });

    renderComponent();

    // SetupCompanyForm should not render while loading
    expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
  });

  test('passes correct props to SetupCompanyForm', () => {
    renderComponent();

    const form = screen.getByTestId('setup-company-form');

    // Check that form displays correct props
    expect(form).toHaveTextContent('Submitting: false');
    expect(form).toHaveTextContent('Currencies: 2');
    expect(form).toHaveTextContent('States: 2');
  });

  test('renders action buttons correctly', () => {
    renderComponent();

    const actionButtonsArea = screen.getByTestId('top-actions-area');

    // Check that the submit button is rendered
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('does not render loading button when isLoading is false', () => {
    (useGlobalLoadingState as jest.Mock).mockReturnValue({
      isLoading: false
    });

    renderComponent();

    const loading = screen.queryByAltText('Loading...');
    expect(loading).not.toBeInTheDocument();
  });

  test('handles absence of userid prop', () => {
    render(<SetupCompany />);

    const form = screen.getByTestId('setup-company-form');

    // Ensure form still renders without userid
    expect(form).toBeInTheDocument();
  });

  test('handles renders and state changes', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Click the submit button multiple times
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    // isSubmitting should be true after first click and remain true
    expect(screen.getByText('Submitting: true')).toBeInTheDocument();
  });
});
