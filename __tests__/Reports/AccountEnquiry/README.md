# AccountEnquiry Integration Tests

What this folder contains

- `AccountEnquiry.integration.test.tsx` — integration-style test that renders the real `AccountEnquiry` page (uses the real `FilterSection`, Formik fields and the real button) while mocking only the network/persistence hooks.

What the test verifies

- Selecting a branch and entering an account number then clicking Search shows the loading skeleton.
- After the mocked API returns, the table is rendered with the expected account rows (account title and account number).

How the tests are implemented

- The tests mock the following hooks only:
  - `useGetBranches` — returns a small list of branches used to populate the `FilterSection` select.
  - `useGetAccountEnquiryByBranchId` — mocked to simulate both loading and successful data responses.
  - `usePersistedSearch` — mocked to provide `searchParams`, `setSearchParams`, and pagination values.
  - `useGlobalLoadingState` — mocked to simulate the global loading flag.
- The table and loader components are lightly mocked so the test can assert loader and table children easily.

- Overview
  - Purpose: validate the `AccountEnquiry` page and its `FilterSection` search workflow.
  - Scope: integration-style test exercises the real `FilterSection` Formik inputs and `ActionButton` while mocking network and persisted-search hooks to keep the run deterministic.

- How the test works:
  - The test renders the real `AccountEnquiry` component (which imports `FilterSection`).
  - To avoid external network calls and keep tests deterministic, the following hooks are mocked:
    - `@/api/general/useBranches` — returns a fixed `branches` array containing `Head Office`.
    - `@/utils/hooks/usePersistedSearch` — provides `searchParams`, `setSearchParams`, and `searchActive`. The current mock returns no-op setters; the test manually toggles mocked API returns.
    - `@/api/reports/useGetAccountEnquiryBybranchId` — mocked to return module-level `data/isLoading` values so the test can simulate loading -> response lifecycle.
    - `@/utils/hooks/useGlobalLoadingState` — mocked to control global loading flag.
  - The test interacts with actual DOM elements created by `FormSelectField` and `FormTextInput`:
    - `data-testid="branchID"` (select input)
    - `data-testid="accountNo"` (text input)
    - `data-testid="action-button"` (search button)
  - The loader component uses `data-testid="loading-skeleton"` (the test asserts this appears during loading).

- Selectors used in tests:
  - Branch select: `getByTestId('branchID')`
  - Account input: `getByTestId('accountNo')` or `getByPlaceholderText(/Search a customer by Name or Account Number/i)`
  - Search button: `getByTestId('action-button')` or `getByRole('button', { name: /Search/i })`
  - Loader: `getByTestId('loading-skeleton')`
  - Table container: `getByTestId('table-container')`
