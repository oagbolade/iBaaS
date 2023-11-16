import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { CashWithDrawal } from '@/features/Operation/Forms/CashWithdrawal';
import { ChequeDeposit } from '@/features/Operation/Forms/ChequeDeposit';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Cheques Deposit Form', () => {
   it('renders the form title', () => {
      const {getByText} =  render(<ChequeDeposit />);
        const mainTitle = getByText(/Cheques Deposit/);
        const accoutTitle = getByText(/Account Info/);
        const personTitle = getByText(/Payment Info/);
        expect(mainTitle).toBeInTheDocument();
        expect(accoutTitle).toBeInTheDocument();
        expect(personTitle).toBeInTheDocument();
    });

  it('goes to the form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole } = render(<ChequeDeposit />);

    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const NarrationText: any = getByPlaceholderText('Short text...');
    const departmentText: any = getByPlaceholderText("Department");
    const nameInput: any = getByPlaceholderText('Enter name');
    const rateInput: any = getByPlaceholderText('Enter rate');
    const transactionAmount: any = getByPlaceholderText('Enter Transaction');
    fireEvent.select(departmentText, {target: {value: 'myDepartment'}});
    fireEvent.change(rateInput, {target: {value: 'myRate'}});
    fireEvent.change(nameInput, {target: {value: 'myName'}})
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction'}})
    fireEvent.select(NarrationText, {target: { value: 'myNarration'}});

    expect(departmentText.value).toMatch('myDepartment');
    expect(NarrationText.value).toMatch('myNarration');
    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');

  });
});
