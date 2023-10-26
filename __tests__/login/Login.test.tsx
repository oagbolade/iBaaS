import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginBannerText, LoginForm } from '@/features/Login';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({ testIdAttribute: 'id' });

// Mock the useRouter function
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('LoginForm', () => {
  it('renders the banner text', () => {
    render(<LoginBannerText />);

    const linkElement = screen.getByText(/One Platform. Multiple Functions/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders the component without errors', () => {
    const { getByText, getByPlaceholderText, getAllByText, getByTestId } =
      render(<LoginForm />);

    expect(getByTestId('companyCode')).toBeInTheDocument();

    // Assert that certain elements are present on the page
    expect(getAllByText('Company Code')[0]).toBeInTheDocument();
    expect(getAllByText('Username')[0]).toBeInTheDocument();
    expect(getAllByText('Password')[0]).toBeInTheDocument();
    expect(getAllByText('Remember me')[0]).toBeInTheDocument();
    expect(getByText('Forgot Password?')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter company code')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('toggles password visibility when the eye icon is clicked', () => {
    const { getByLabelText, getByTestId } = render(<LoginForm />);
    const passwordInput: any = getByTestId('password');
    const eyeIcon = getByLabelText('toggle password visibility');

    // Password input should initially be of type 'password'
    expect(passwordInput.type).toBe('password');

    // Click the eye icon to toggle visibility
    fireEvent.click(eyeIcon);

    // Password input should now be of type 'text'
    expect(passwordInput.type).toBe('text');

    // Click the eye icon again to toggle back to 'password'
    fireEvent.click(eyeIcon);

    // Password input should be back to type 'password'
    expect(passwordInput.type).toBe('password');
  });

  it('performs form submission when the login button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />);
    const companyCodeInput: any = getByPlaceholderText('Enter company code');
    const usernameInput: any = getByPlaceholderText('Enter username');
    const passwordInput: any = getByPlaceholderText('Enter password');
    const rememberMeCheckbox = getByText('Remember me');

    // Fill in form inputs
    fireEvent.change(companyCodeInput, { target: { value: 'myCompany' } });
    expect(companyCodeInput.value).toMatch('myCompany');
    fireEvent.change(usernameInput, { target: { value: 'myUsername' } });
    expect(usernameInput.value).toMatch('myUsername');
    fireEvent.change(passwordInput, { target: { value: 'myPassword' } });
    expect(passwordInput.value).toMatch('myPassword');
    fireEvent.click(rememberMeCheckbox);
  });

  it('mocks the useRouter hook', async () => {
    const router = { push: jest.fn() };

    // Set up the useRouter mock
    useRouter.mockReturnValue(router);

    render(<LoginForm />);

    // Expect the button to be in the document
    expect(screen.getAllByRole('button')[1]).toBeInTheDocument();

    // Click the button:
    fireEvent.click(screen.getAllByRole('button')[1]);

    await waitFor(() => {
      // Expect router.push to have been called once and with the correct path
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith('/setup/business');
    });
  });
});
