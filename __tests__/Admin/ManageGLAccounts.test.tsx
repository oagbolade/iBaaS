import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  logRoles,
} from '@testing-library/react';
import { Users } from '@/features/Admin/users';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Manage GL Accounts Page', () => {
  it('renders the form title', () => {
    const { getByText } = render(<Users />);
    const mainTitle = getByText(/Manage Users/);
    const seconndaryTitle = getByText(/View All Users/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

  it('toggles the modal', () => {
    const { getAllByText, getByTestId, getByText } = render(<Users />);
    const modalButton = getByTestId('button');
    expect(modalButton).toBeInTheDocument();
    fireEvent.click(modalButton);
    expect(getAllByText('Add New User')[1]).toBeInTheDocument();
  });
});
