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
import { LienContainer } from '@/features/CustomerService/lien';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Lien user Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<LienContainer />);
    const mainTitle = getByText(/Manage Lien/);
    const seconndaryTitle = getByText(/View All Lien Accounts/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

 
});
