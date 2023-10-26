import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BusinessSetup } from '@/features/Setup/BusinessSetup';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
configure({ testIdAttribute: 'id' });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const useRouter = jest.spyOn(require('next/navigation'), 'useRouter');

describe('Business Setup Form', () => {
  it('renders the form title', () => {
    render(<BusinessSetup />);

    const mainTitle = screen.getByText(/Hi/);
    const seconndaryTitle = screen.getByText(/Let's setup the business/i);
    expect(mainTitle).toBeInTheDocument();
    expect(seconndaryTitle).toBeInTheDocument();
  });

  it('renders the progress bar', () => {
    render(<BusinessSetup />);
    const ProgressBar = screen.getByRole('progressbar');
    expect(ProgressBar).toBeInTheDocument();
    expect(ProgressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('goes to the next form', async () => {
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { getByPlaceholderText, getAllByRole, getByRole } = render(
      <BusinessSetup />
    );
    const ProgressBar = getByRole('progressbar');
    const button = getAllByRole('button')[1];
    fireEvent.click(button);
    const companyCodeInput: any = getByPlaceholderText(
      "Enter company's email address"
    );
    expect(companyCodeInput).toBeInTheDocument();
    expect(ProgressBar).toBeInTheDocument();
    expect(ProgressBar).toHaveAttribute('aria-valuenow', '100');
    const nextButton = getAllByRole('button')[3];
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledTimes(1);
      expect(router.push).toHaveBeenCalledWith('/admin/users');
    });
  });
});
