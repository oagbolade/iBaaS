import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { ReturnCheque } from '@/features/Operation/Forms/ReturnCheques';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Return Cheques Reversal Form', () => {
   it('renders the form title', () => {
       const {getByText} =  render(<ReturnCheque />);
        const mainTitle = getByText(/Return Cheques Reversal/);
        const accoutTitle = getByText(/Account Info/);
        const personTitle = getByText(/Payment Info/);
        expect(mainTitle).toBeInTheDocument();
        expect(accoutTitle).toBeInTheDocument();
        expect(personTitle).toBeInTheDocument();
    });

  it('goes to the form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole } = render(<ReturnCheque />);

    const departmentText:any = getByPlaceholderText('Department');
    fireEvent.select(departmentText, {target: {value: 'myDepartment'}});
    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const NarrationText: any = getByPlaceholderText('Short text...');
    const nameInput:any = getByPlaceholderText('Enter name');
    const rateInput:any = getByPlaceholderText('Enter rate');
    const transactionAmount:any = getByPlaceholderText('Enter Transaction');
    fireEvent.change(rateInput, {target: {value: 'myRate'}});
    fireEvent.change(nameInput, {target: {value: 'myName'}})
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction'}})
    fireEvent.select(NarrationText, {target: { value: 'myNarration'}})

    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');
    expect(departmentText.value).toMatch('myDepartment');
    expect(NarrationText.value).toMatch('myNarration');
  });
});
