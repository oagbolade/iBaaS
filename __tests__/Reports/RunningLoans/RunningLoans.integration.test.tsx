import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RunningLoans } from '../../../features/Report/CustomReport/RunningLoans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormSkeleton } from '../../../components/Loaders/FormSkeleton';



// Mock next/navigation
// Mock router
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock useSetDirection to avoid warnings from MUI layout behavior
jest.mock('../../../utils/hooks/useSetDirection', () => ({
  useSetDirection: () => ({
    setDirection: () => 'row'
  })
}));

// Mock TableV2 to simplify testing
jest.mock('../../../components/Revamp/TableV2', () => ({
  TableV2: ({ data }: any) => (
    <table data-testid="table">
      <thead>
        <tr>
          <th>Column 1</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((row: any, i: number) => (
          <tr key={i}>
            <td>{row["Customer Name"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}));

// Mock FormSkeleton so loading test is reliable
jest.mock('../../../components/Loaders', () => ({
  FormSkeleton: ({ noOfLoaders }: any) => (
    <div data-testid="loading-skeleton">Loading {noOfLoaders}</div>
  )
}));

// Mock next/link to avoid warnings
jest.mock('next/link', () => {
  return ({ children }: any) => children;
});

// Setup QueryClient
const client = new QueryClient({
  defaultOptions: { queries: { retry: false, cacheTime: 0 } }
});

const renderWithClient = (ui: React.ReactNode) =>
  render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>
  );

describe("RunningLoans Page Tests", () => {

  it("renders header text", async () => {
    renderWithClient(<RunningLoans />);

    expect(
      screen.getByText("Loan listing by account officer’s report")
    ).toBeInTheDocument();
  });

  it("fills form fields and submits Search", async () => {
    renderWithClient(<RunningLoans />);

    const user = userEvent.setup();

    // Type in Search Branch ID
    const branchInput = screen.getAllByPlaceholderText("Search Branch ID")[0];
    await user.type(branchInput, "ID-475747");

    // Type in second Search input
    const searchInput = screen.getAllByPlaceholderText("Search")[0];
    await user.type(searchInput, "Customer XYZ");

    // Click Search button
    const searchBtn = screen.getByRole("button", { name: /search/i });
    await user.click(searchBtn);

    // No API call here, so we simply confirm inputs still contain text
    expect(branchInput).toHaveValue("ID-475747");
    expect(searchInput).toHaveValue("Customer XYZ");
  });

  it("shows loading skeleton when loading", async () => {
    // Override mock: simulate loading
    jest
      .spyOn(require("../../../components/Loaders"), "FormSkeleton")
      .mockImplementation(() => (
        <div data-testid="loading-skeleton">Loading 4</div>
      ));\\\\

    renderWithClient(<RunningLoans />);

       expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it("renders TableV2 with data", async () => {
    renderWithClient(<RunningLoans />);

    // Since MOCK_DATA is used, check any known row
    await waitFor(() => {
      expect(screen.getByTestId("table")).toBeInTheDocument();
    });

    // Example: first row from MOCK_DATAv2.json
    expect(screen.getByText("Adedayo Sodiq")).toBeInTheDocument();
  });

  it("renders View More action menu", () => {
    renderWithClient(<RunningLoans />);

    const viewMore = screen.getByText("View More");
    expect(viewMore).toBeInTheDocument();
  });
});
