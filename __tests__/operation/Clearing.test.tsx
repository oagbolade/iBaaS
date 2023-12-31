import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { CashWithDrawal } from '@/features/Operation/Forms/CashWithdrawal';
import { ChequeDeposit } from '@/features/Operation/Forms/ChequeDeposit';
import { Clear } from '@/features/Operation/Forms/Clearing';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Clearing Form', () => {
   it('renders the form title', () => {
       const {getByText} =  render( <Clear /> );
        const mainTitle = getByText(/Clearing/);
        const accoutTitle = getByText(/Account Info/);
        const personTitle = getByText(/Payment Info/);
        expect(mainTitle).toBeInTheDocument();
        expect(accoutTitle).toBeInTheDocument();
        expect(personTitle).toBeInTheDocument();
    });

  it('goes to the form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole } = render(<Clear />);

    const departmentText:any = getByPlaceholderText('Department');
    fireEvent.select(departmentText, {target: {value: 'myDepartment'}});
    expect(departmentText.value).toMatch('myDepartment');
    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const NarrationText:any = getByPlaceholderText('Short text...');
    const nameInput:any = getByPlaceholderText('Enter name');
    const rateInput:any = getByPlaceholderText('Enter rate');
    const transactionAmount:any = getByPlaceholderText('Enter Transaction');
    fireEvent.select(departmentText, {target: {value: 'myDepartment'}});
    fireEvent.change(rateInput, {target: {value: 'myRate'}});
    fireEvent.change(nameInput, {target: {value: 'myName'}})
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction'}})
    fireEvent.select(NarrationText, {target: { value: 'myNarration'}})


    expect(departmentText.value).toMatch('myDepartment');
    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');
    expect(NarrationText.value).toMatch('myNarration');

  });
});
