import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// COMPONENT UNDER TEST
import { ShortCardWithAccordion } from '../../../features/Report/CustomReport/BalanceSheet/ShortCardWithAccordion';

// HOOK TO MOCK
import { useGetAllBalanceSheetByItemId } from '../../../api/reports/useGetBalanceSheet';

// TABLE MOCK (MATCHING YOUR STYLE)
jest.mock('../../../components/Table/AssetsTable', () => ({
  AssetsTable: ({ data }: any) => (
    <table data-testid="assets-table">
      <tbody>
        {data.map((row: any, i: number) => (
          <tr key={i}>
            <td>{row.assets}</td>
            <td>{row.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

jest.mock('../../../api/reports/useGetBalanceSheet', () => ({
  useGetAllBalanceSheetByItemId: jest.fn(),
}));

/* ------------------------------------------------------
   TEST UTIL
------------------------------------------------------- */
const renderWithProviders = (ui: any) =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      {ui}
    </QueryClientProvider>
  );

/* ------------------------------------------------------
   DEFAULT PROPS
------------------------------------------------------- */
const defaultProps = {
  column: ['Assets', 'Amount'],
  defaultData: [
    { assets: 'Building', amount: '₦1,000,000' },
  ],
  itemcode: '1001',
  title: 'Fixed Assets',
  assetCount: 10,
  assetValue: '₦500,000',
};

/* ------------------------------------------------------
   TEST SUITE
------------------------------------------------------- */
describe('ShortCardWithAccordion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* ------------------------------------------------------
     TEST 1 — Renders Card Container
  ------------------------------------------------------- */
  it('renders short card container', () => {
    (useGetAllBalanceSheetByItemId as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    renderWithProviders(<ShortCardWithAccordion {...defaultProps} />);

    expect(screen.getByTestId('short-card-item')).toBeInTheDocument();
    expect(screen.getByText('Fixed Assets')).toBeInTheDocument();
  });

  /* ------------------------------------------------------
     TEST 2 — Loader Appears When Loading
  ------------------------------------------------------- */
  it('shows loader when fetching details', async () => {
    (useGetAllBalanceSheetByItemId as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithProviders(<ShortCardWithAccordion {...defaultProps} />);

    expect(await screen.findByTestId('loading-skeleton')).toBeInTheDocument();
  });

  /* ------------------------------------------------------
     TEST 3 — Expands Accordion And Shows Table
  ------------------------------------------------------- */
  it('expands accordion and displays table data', async () => {
    (useGetAllBalanceSheetByItemId as jest.Mock).mockReturnValue({
      data: [
        {
          itemDesc: 'Building',
          sumbalance: '100000',
          itemid: 1,
        },
      ],
      isLoading: false,
    });

    renderWithProviders(<ShortCardWithAccordion {...defaultProps} />);

    fireEvent.click(screen.getByText('Fixed Assets'));

    await waitFor(() => {
      expect(screen.getByTestId('assets-table')).toBeInTheDocument();
      expect(screen.getByText('Building')).toBeInTheDocument();
    });
  });

  /* ------------------------------------------------------
     TEST 4 — Search Filters Data
  ------------------------------------------------------- */
  it('filters data when search is typed', async () => {
    (useGetAllBalanceSheetByItemId as jest.Mock).mockReturnValue({
      data: [
        { itemDesc: 'Building', sumbalance: '100000', itemid: 1 },
        { itemDesc: 'Car', sumbalance: '50000', itemid: 2 },
      ],
      isLoading: false,
    });

    renderWithProviders(<ShortCardWithAccordion {...defaultProps} />);

    // Expand accordion
    fireEvent.click(screen.getByText('Fixed Assets'));

    // Type into search field
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'Bu' } });

    await waitFor(() => {
      expect(screen.getByText('Building')).toBeInTheDocument();
      expect(screen.queryByText('Car')).not.toBeInTheDocument();
    });
  });
});
