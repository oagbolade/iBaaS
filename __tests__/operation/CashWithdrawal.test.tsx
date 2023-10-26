import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { CashWithDrawal } from '@/features/Operation/Forms/CashWithdrawal';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Cash Withdrawal Form', () => {
   it('renders the form title', () => {
        render(<CashWithDrawal />);
        const mainTitle = screen.getByText(/Cash Withdrawal/);
        const accoutTitle = screen.getByText(/Account Info/);
        const personTitle = screen.getByText(/Payment Info/);
        expect(mainTitle).toBeInTheDocument();
        expect(accoutTitle).toBeInTheDocument();
        expect(personTitle).toBeInTheDocument();
    });

  it('goes to the form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole, getByLabelText, getAllByText, getByRole } = render(
      <CashWithDrawal />
    );

    const departmentText: any = getByPlaceholderText('Department');

    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const nameInput: any = getByPlaceholderText('Enter name');
    const rateInput: any = getByPlaceholderText('Enter rate');
    const transactionAmount: any = getByPlaceholderText('Enter Transaction');
    fireEvent.change(departmentText, {target: {value: 'myDepartment'}});
    fireEvent.change(rateInput, {target: {value: 'myRate'}});
    fireEvent.change(nameInput, {target: {value: 'myName'}})
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction'}})
    expect(departmentText.value).toMatch('myDepartment');

    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');
   
  });
});
