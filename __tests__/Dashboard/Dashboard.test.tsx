import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useGetTellerBalanceByUserId } from '@/api/operation/useVaultManagement';
import { useGetPendingRequest } from '@/api/loans/useFetchPendingRequest';
import { getStoredUser } from '@/utils/user-storage';
import { mockToastActions } from '@/mocks';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { Dashboard } from '@/features/Dashboard';

const mockMutate = jest.fn();

// Mock the hooks and functions
jest.mock('../../api/operation/useVaultManagement');
jest.mock('../../api/loans/useFetchPendingRequest.ts');
jest.mock('../../utils/user-storage');

const mockedUseGetTellerBalanceByUserId = useGetTellerBalanceByUserId as jest.Mock;
const mockedUseGetPendingRequest = useGetPendingRequest as jest.Mock;
const mockedGetStoredUser = getStoredUser as jest.Mock;

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const queryClient = new QueryClient();

  const renderComponent = () => {
        render (
            <QueryClientProvider client={queryClient}>
                <ToastMessageContext.Provider value={mockToastActions}>
                    <Formik initialValues={{}} onSubmit={mockMutate}>
                        <Dashboard />
                    </Formik>
                </ToastMessageContext.Provider>
            </QueryClientProvider>
        );
    };

  test('renders loading state correctly', () => {
    mockedUseGetTellerBalanceByUserId.mockReturnValue({
      total: null,
      dRtotal: 0,
      cRtotal: 0,
      isLoading: true,
    });
    mockedUseGetPendingRequest.mockReturnValue({
      authsdetails: [],
      isLoading: true,
    });

    renderComponent();

    expect(screen.getByTestId(/loading-skeleton/i)).toBeInTheDocument(); // Assuming FormSkeleton shows "loading"
  });

  test('renders Dashboard with user data and balances', async () => {
    mockedUseGetTellerBalanceByUserId.mockReturnValue({
      total: 1000000,
      dRtotal: 50000,
      cRtotal: 25000,
      isLoading: false,
    });

    mockedUseGetPendingRequest.mockReturnValue({
      authsdetails: [{ id: '1', authdesc: 'Loan Request', authid: 'User1' }],
      isLoading: false,
    });

    mockedGetStoredUser.mockReturnValue({
      fullName: 'John Doe',
    });

    renderComponent();

    // Check for user greeting
    expect(screen.getByText(/Welcome back, John Doe/i)).toBeInTheDocument();

    // Check for description
    expect(
      screen.getByText(/Get an overview of all your system activities/i)
    ).toBeInTheDocument();

    // Check for Till Balance TrendCard
    expect(screen.getByText(/Till Balance/i)).toBeInTheDocument();
    expect(screen.getByText('₦1,000,000')).toBeInTheDocument();
    expect(screen.getByText('7.50')).toBeInTheDocument();

    // Check for Pending Actions TrendCard
    expect(screen.getByText(/Pending Actions/i)).toBeInTheDocument();
    expect(screen.getAllByText('1')[0]).toBeInTheDocument();

    // Check for Recently Visited Modules
    expect(screen.getByText(/Recently Visited Modules/i)).toBeInTheDocument();

    // Check for BasicSetup
    expect(screen.getByText(/Let's start with the basics/i)).toBeInTheDocument();

    // Check for PendingTasks
    expect(screen.getByText(/Pending tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Loan Request/i)).toBeInTheDocument();
  });

  test('handles no user name gracefully', () => {
    mockedUseGetTellerBalanceByUserId.mockReturnValue({
      total: 500000,
      dRtotal: 10000,
      cRtotal: 5000,
      isLoading: false,
    });

    mockedUseGetPendingRequest.mockReturnValue({
      authsdetails: [],
      isLoading: false,
    });

    mockedGetStoredUser.mockReturnValue(null); // No user

    renderComponent()

    expect(
      screen.getByText(/Oops!. Cannot find user name/i)
    ).toBeInTheDocument();

    // Check for no pending tasks
    expect(screen.getByText(/No pending tasks/i)).toBeInTheDocument();
  });

  test('calculates and displays percentage correctly', () => {
    mockedUseGetTellerBalanceByUserId.mockReturnValue({
      total: 200000,
      dRtotal: 5000,
      cRtotal: 5000,
      isLoading: false,
    });

    mockedUseGetPendingRequest.mockReturnValue({
      authsdetails: [],
      isLoading: false,
    });

    mockedGetStoredUser.mockReturnValue({
      fullName: 'Jane Smith',
    });

    renderComponent()

    // totalDRCR = 5000 + 5000 = 10000
    // totalPercentage = (10000 / 200000) * 100 = 5
    expect(screen.getByText('5.00')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
