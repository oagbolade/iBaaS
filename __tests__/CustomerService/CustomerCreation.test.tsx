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
import { CustomerCreation } from '@/features/CustomerService/customercreation';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Customer Creation Page', () => {
  it('renders the page title and table title', () => {
    const { getByText } = render(<CustomerCreation />);
    const mainTitle = getByText(/Customer Creation/);
    const seconndaryTitle = getByText(/View All Customers/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

  it('toggles the modal',  async() => {
    const { getAllByText, getByTestId } = render(<CustomerCreation />);
    const modalButton: any  = getByTestId('button');
    expect(modalButton).toBeInTheDocument();
    fireEvent.click(modalButton);
    expect(getAllByText('Create New Customer')[0]).toBeInTheDocument();
    await waitFor(() => {
      expect(getAllByText('Create New Customer')[0]).toBeInTheDocument();
    });
  });
 
});
