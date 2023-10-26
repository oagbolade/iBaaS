import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { ReturnCheque } from '@/features/Operation/Forms/ReturnCheques';
import { WithDrawTowards } from '@/features/Operation/Forms/Uclear';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Withdraw Towards Uncleared Form', () => {
   it('renders the form title', () => {
        render(<WithDrawTowards />);
        const mainTitle = screen.getByText(/Withdraw Towards Uncleared/);
        const accoutTitle = screen.getByText(/Account Info/);
        const personTitle = screen.getByText(/Payment Info/);
        expect(mainTitle).toBeInTheDocument();
        expect(accoutTitle).toBeInTheDocument();
        expect(personTitle).toBeInTheDocument();
    });

  it('goes to the form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole } = render(
      <WithDrawTowards />
    );

    const departmentText: any = getByPlaceholderText('Department');
    fireEvent.change(departmentText, {target: {value: 'myDepartment'}});
    expect(departmentText.value).toMatch('myDepartment');
    const saveButton = getAllByRole('button')[1];
    const backButton = getAllByRole('button')[2];
    const ResetButton = getAllByRole('button')[3];
    fireEvent.click(saveButton);
    fireEvent.click(backButton);
    fireEvent.click(ResetButton);
    const NarrationText: any = getByPlaceholderText('Short text...');
    expect(NarrationText.value).toMatch('myNarration');

    const nameInput: any = getByPlaceholderText('Enter name');
    const rateInput: any = getByPlaceholderText('Enter rate');
    const transactionAmount: any = getByPlaceholderText('Enter Transaction');
    fireEvent.change(rateInput, {target: {value: 'myRate'}});
    fireEvent.change(nameInput, {target: {value: 'myName'}})
    fireEvent.change(transactionAmount, {target: {value: 'myTransaction'}})

    expect(nameInput.value).toMatch('myName');
    expect(rateInput.value).toMatch('myRate');
    expect(transactionAmount.value).toMatch('myTransaction');
    fireEvent.change(NarrationText, {target: { value: 'myNarration'}})

  });
});
