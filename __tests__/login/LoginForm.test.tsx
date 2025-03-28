import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderComponentWithQueryProvider } from '../../mocks/renderComponent';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { useAuth } from '@/api/auth/useAuth';
import { useUser } from '@/api/auth/useUser';
import { LoginForm } from '@/features/Login';

jest.mock('../../api/auth/useAuth');
jest.mock('../../api/auth/useUser');
jest.mock('../../utils/user-storage', () => ({
    getStoredUser: jest.fn(() => ({ tokenExpire: 'mockTokenExpiration' }))
}));
jest.mock('../../utils/encryptData', () => ({
    encryptData: jest.fn((data) => `encrypted-${data}`)
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

const mockLogin = jest.fn();
const mockToggleSnackbar = jest.fn();
const mockSetMessage = jest.fn();
const mockSetSeverity = jest.fn();

describe('LoginForm', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({ isLoading: false, login: mockLogin });
        (useUser as jest.Mock).mockReturnValue({ user: null });
    });

    const renderComponent = () => {
        return renderComponentWithQueryProvider(
            <MuiSnackbarContext.Provider
                value={{
                    open: false,
                    severity: 'success',
                    message: '',
                    toggleSnackbar: mockToggleSnackbar,
                    setMessage: mockSetMessage,
                    setSeverity: mockSetSeverity
                }}
            >
                <LoginForm />
            </MuiSnackbarContext.Provider>
        );
    };

    test('renders form fields correctly', () => {
        renderComponent();
        expect(screen.getByPlaceholderText('Enter company code')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    });

    test('toggles password visibility when icon is clicked', () => {
        renderComponent();
        const passwordInput = screen.getByPlaceholderText('Enter password');
        const visibilityButton = screen.getByRole('button', {
            name: /toggle password visibility/i
        });

        expect(passwordInput).toHaveAttribute('type', 'password');

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'text');

        fireEvent.click(visibilityButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('submits the form with encrypted password', async () => {
        renderComponent();

        fireEvent.change(screen.getByPlaceholderText('Enter company code'), { target: { value: 'testCompany' } });
        fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testUser' } });
        fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'testPassword' } });

        const submitButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalled();
        });
    });

    test('displays loading state when isLoading is true', () => {
        (useAuth as jest.Mock).mockReturnValue({ isLoading: true, login: mockLogin });
        renderComponent();
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('redirects and displays toast message when user is present', async () => {
        (useUser as jest.Mock).mockReturnValue({ user: { name: 'mockUser' } });
        renderComponent();

        await waitFor(() => expect(mockToggleSnackbar).toHaveBeenCalled());
        await waitFor(() => expect(mockSetMessage).toHaveBeenCalledWith('Login successful, redirecting please wait...'));
        await waitFor(() => expect(mockSetSeverity).toHaveBeenCalledWith('success'));
    });
});
