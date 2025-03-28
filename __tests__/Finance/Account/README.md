# ClassifyAccount Component Tests

This document outlines the test cases for the `ClassifyAccount` component, which is part of the Administrator Forms in the Finance feature. The tests are implemented using React Testing Library and Jest.

## Test Cases

1. **Render ClassifyAccount Component with All Form Fields**

   - Verifies that the component renders correctly with all necessary form fields.
   - Checks for the presence of:
     - Title: "Classify Account"
     - Label: "Account Number"
     - Label: "Classification Type"
     - Button: "Classify"
     - Button: "De-Classify"

2. **Handle Radio Button Selection for Classify/De-Classify**

   - Tests the functionality of the radio button for de-classifying an account.
   - Ensures that the "De-Classify" radio button can be selected and is checked.

3. **Display Account Number in Disabled Input Field**

   - Confirms that the account number is displayed in a disabled input field.
   - Checks that the input field has the correct value of '12345' and is disabled.

4. **Handle Classification Type Selection**

   - Tests the selection of a classification type from a dropdown.
   - Ensures that selecting "Active Interest Accrual" sets the hidden input value for `provisionType` to '0'.

5. **Submit Form with Correct Values When isSubmitting is True**
   - Verifies that the form submits with the correct values when the `isSubmitting` prop is set to true.
   - Checks that the `mockMutate` function is called with the expected parameters:
     - `classify`: 1
     - `accountNumber`: '12345'
     - `provisionType`: 0

# Account Component Test Cases

## Test Suite Overview

The test suite for the `Account` component is located in the file `__tests__/Finance/Account/Account.test.tsx`. The tests cover the following functionalities:

### 1. Rendering the Account Component

- **Test Case**: Renders the Account component with a create account button.
  - **Description**: This test verifies that the "Create Account" button is present in the rendered component.
  - **Expectation**: The button should be in the document.

### 2. Rendering Account Table

- **Test Case**: Renders account table with correct columns.
  - **Description**: This test checks if the account overview and a description of the accounts are displayed correctly.
  - **Expectation**: The text "Account Overview" and "See a directory of all accounts on this system." should be present in the document.

### 3. Search Functionality

- **Test Case**: Handles search functionality.
  - **Description**: This test simulates a click on the search button and verifies that the search function is called.
  - **Expectation**: The `useFilterCustomerAccountSearch` hook should be called when the search button is clicked.

## Mocked Dependencies

The following dependencies are mocked to isolate the tests and provide controlled responses:

- **useGetBranches**: Mocked to return a predefined list of branches.
- **useFilterCustomerAccountSearch**: Mocked to return a predefined account data set.
- **next/navigation**: Mocked to simulate navigation functions.
- **next/link**: Mocked to render links as anchor tags.
- **moment**: Mocked to return a fixed date format.

## Running the Tests

To run the tests, use the following command:
