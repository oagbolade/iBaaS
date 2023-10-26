import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Demand } from '@/features/Setup/demand';
import { StepperContainer } from '@/components/Shared/Stepper/StepperContainer';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import {
  MockStepperFormsOne,
  MockStepperFormsTwo,
} from '@/mocks/Forms/MockStepperForm';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Demand Deposit Page', () => {
  it('renders the page description and action button', () => {
    render(<Demand />);
    const mainTitle = screen.getByText(/Add a new product to get started/);
    expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    expect(mainTitle).toBeInTheDocument();
  });

  it('navigates to the listing page', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    render(<Demand />);
    const actionButton = screen.getAllByRole('button')[0];
    fireEvent.click(actionButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith('/setup/demand/steps');
    });
  });

  it('renders the form', async () => {
    let step = 1;

    const stepMapper = {
      '1': <MockStepperFormsOne />,
      '2': <MockStepperFormsTwo />,
      '3': <MockStepperFormsOne />,
      '4': <MockStepperFormsTwo />,
      '5': <MockStepperFormsOne />,
    };

    render(
      <StepperContainer
        stepperTitle="Create Demand Deposit Product"
        step={step}
        stepMapper={stepMapper}
      />
    );
    const mainTitle = screen.getByText(/Create Demand Deposit Product/);
    expect(mainTitle).toBeInTheDocument();
    const nameInput: any = screen.getByPlaceholderText('Enter a number');
    fireEvent.change(nameInput, { target: { value: 'myCompany' } });
    expect(nameInput.value).toMatch('myCompany');
    const nextButton = screen.getByTestId('button');
    expect(nextButton).toBeInTheDocument();
  });
});
