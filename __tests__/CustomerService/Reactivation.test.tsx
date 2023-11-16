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
import { ReactivationContainer } from '@/features/CustomerService/reactivation';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe(' Reactivation Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<ReactivationContainer />);
    const mainTitle = getByText(/Account Reactivation/);
    const seconndaryTitle = getByText(/View All Deactivated Accounts/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

 
});
