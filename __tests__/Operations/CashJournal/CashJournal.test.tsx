import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik } from 'formik';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mockToastActions } from '@/mocks';
import { useCreateCashJournal } from '@/api/operation/useCashJournal';
import { CashJournal } from '@/features/Operation/Forms/CashJournal';

const mockMutate = jest.fn();

jest.mock('../../../api/operation/useCashJournal', () => ({
  useCreateCashJournal: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

const currencies = [
  {
    name: 'Nigeria',
    value: 'NGN',
  },
  {
    name: 'America',
    value: 'USD',
  },
];

const commBanks = [
  {
    name: 'First Bank',
    value: 'First Bank',
  },
  {
    name: 'UBA',
    value: 'UBA',
  },
];

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() })),
}));

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => {
  const originalModule = jest.requireActual('next/navigation');
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
        replace: mockRouterReplace,
        refresh: mockRouterRefresh,
      };
    }),
    useSearchParams: jest.fn().mockImplementation(() => {
      return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArg) => {
      return pathArg;
    }),
  };
});

describe('Cash Journal Form', () => {
  beforeEach(() => {
    (useCreateCashJournal as jest.Mock).mockReturnValue({ mutate: mockMutate });
  });

  const queryClient = new QueryClient();

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <ToastMessageContext.Provider value={mockToastActions}>
          <Formik initialValues={{}} onSubmit={mockMutate}>
            <CashJournal currencies={currencies} commBanks={commBanks} />
          </Formik>
        </ToastMessageContext.Provider>
      </QueryClientProvider>
    );

  it('Should render all form fields correctly', () => {
    renderComponent();

    expect(screen.getAllByText('GL Account Name')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Currency')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Transaction Type')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Balanced Amount')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Pay Amount')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Voucher Number')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Transaction Amount')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Till Balance')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Value Date')[0]).toBeInTheDocument();
    expect(screen.getByLabelText('Rate')).toBeInTheDocument();
    expect(screen.getByLabelText('Narration')).toBeInTheDocument();
  });

  it('Should call mutate function with correct data on form submission', async () => {
    renderComponent();

    const narration = screen.getByRole('textbox', { name: /narration/i });

    fireEvent.change(narration, { target: { value: 'test narration' } });

    const valueDate = screen.getByPlaceholderText('MM/DD/YYYY');

    fireEvent.change(valueDate, { target: { value: '01/01/2023' } });

    fireEvent.change(screen.getByLabelText(/pay amount/i), {
      target: { value: '100' },
    });

    const rate = screen.getByLabelText(/rate/i);

    fireEvent.change(rate, { target: { value: '1' } });

    const transAmount = screen.getByLabelText(/transaction amount/i);

    fireEvent.change(transAmount, { target: { value: 100 } });

    const voucherNumber = screen.getByLabelText(/voucher number/i);

    fireEvent.change(voucherNumber, { target: { value: '1' } });

    expect(narration).toHaveValue('test narration');
    expect(valueDate).toHaveValue('01/01/2023');
    expect(rate).toHaveValue('1');
    expect(transAmount).toHaveValue('100');
    expect(voucherNumber).toHaveValue('1');

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => expect(mockMutate).toHaveBeenCalledTimes(1));
  });

  it('Should validate required fields and show errors for missing values', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Narration is required/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Currency Code is Required/i)).toBeInTheDocument();
    });
  });

  it('Should show "Select Bank" dropdown when "From Bank" is selected', async () => {
    renderComponent();

    const fromBankRadio = screen.getByLabelText('From Bank');
    fireEvent.click(fromBankRadio);

    await waitFor(() => {
      expect(screen.getAllByText('Select Bank')[0]).toBeInTheDocument();
    });
  });

  it('Should not show "Select Bank" dropdown when "Dispense Cash" is selected', async () => {
    renderComponent();

    const dispenseCashRadio = screen.getByLabelText('Dispense Cash');
    fireEvent.click(dispenseCashRadio);

    await waitFor(() => {
        expect(screen.queryByLabelText('Select Bank')).not.toBeInTheDocument();
    });
});

  it('Should show "GL Account Name" input when "Dispense Cash" is selected', async () => {
    renderComponent();

    const dispenseCashRadio = screen.getByLabelText('Dispense Cash');
    fireEvent.click(dispenseCashRadio);

    await waitFor(() => {
      expect(screen.getByLabelText('GL Account Name')).toBeInTheDocument();
    });
  });

  it('Should show "GL Account Number" by default', () => {
    renderComponent();

    expect(screen.getByLabelText('GL Account Name')).toBeInTheDocument();
  });
});
