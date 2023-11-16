import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { CashDeposit } from '@/features/Operation/Forms/CashDeposit';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Cash Deposit Form', () => {
  it('renders the form title', () => {
    const { getByText } = render(<CashDeposit />);
    const mainTitle = getByText(/Cash Deposit/);
    const accoutTitle = getByText(/Account Info/);
    const personTitle = getByText(/Payment Info/);
    expect(mainTitle).toBeInTheDocument();
    expect(accoutTitle).toBeInTheDocument();
    expect(personTitle).toBeInTheDocument();
  });

  it('goes to the cash desposit form ', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole } = render(<CashDeposit />);

    const selectedText: any = getByPlaceholderText('Branch');
    const departmentText: any = getByPlaceholderText('Department');

    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const nameInput:any = getByPlaceholderText('Enter name');
    const rateInput:any = getByPlaceholderText('Enter rate');
    const transactionAmount:any = getByPlaceholderText('Enter Transaction');
    fireEvent.change(rateInput, {target: {value: 'myRate' } });
    fireEvent.change(nameInput, {target: {value: 'myName' } });
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction' } });
    
    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');
  });
});
