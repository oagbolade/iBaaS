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
import { OfficerTransfer } from '@/features/CustomerService/officertransfer';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe(' Transfer  Officer Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<OfficerTransfer />);
    const mainTitle = getByText(/Officer Transfer/);
    const seconndaryTitle = getByText(/View All Officer Details/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });
});
