import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  logRoles,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { CloseAccountContainer } from '@/features/CustomerService/close-account';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Account Close Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<CloseAccountContainer />);
    const mainTitle = getByText(/Close Account/);
    expect(mainTitle).toBeInTheDocument();
  });
});
