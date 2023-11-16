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
import { AccountRecordContainer } from '@/features/CustomerService/account-record';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe(' Account Record Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<AccountRecordContainer />);
    const mainTitle = getByText(/Customer Account Record/);
    const seconndaryTitle = getByText(/View All Customers Account/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });
  it('toggles the modal', async () => {
    const { getAllByText, getByTestId } = render(<AccountRecordContainer />);
    const modalButton:any = getByTestId('button');
    expect(modalButton).toBeInTheDocument();
    fireEvent.click(modalButton);
    expect(getAllByText('Create New Account')[0]).toBeInTheDocument();
    await waitFor(() => {
      expect(getAllByText('Create New Account')[0]).toBeInTheDocument();
    });
  });
});
