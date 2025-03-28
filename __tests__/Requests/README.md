Fetch Requests (Pending, My Requests and Rejected Requests)
-Table headers render correctly.
-Table rows are populated with correct data.
-Actions trigger expected events.
-Search functionality works as intended.

PendingRequestTable
-Verify table headers are displayed (Post Type, Created Date, Posting Officer).
-Ensure data rows render correctly with values like Loan, User A, etc.
-Confirm the "View" action button is present for each row.
-Handle Action Button Click:

-Simulate clicking the "View" button for a row.
-Ensure setPendingRequestData is called with the correct data for the selected row.
-Filter Table Rows Based on Search Input:

-Enter a term into the search input (e.g., Mortgage).
-Verify only rows matching the search term are displayed.
-Confirm rows not matching the search term are hidden.


RejectedRequestTable
-Verify table headers are displayed (Post Type, Reject Date, Rejected By).
-Ensure data rows render correctly with values like Loan, Officer A, etc.
-Confirm the "View" action button is present for each row.
Handle Action Button Click:

-Simulate clicking the "View" button for a row.
-Ensure setRejectedRequestData is called with the correct data for the selected row.
-Filter Table Rows Based on Search Input:

-Enter a term into the search input (e.g., Officer B).
-Verify only rows matching the search term are displayed.
-Confirm rows not matching the search term are hidden.

MyRequestTable
-Verify table headers are displayed (Request Type, Request Date, Approving Officer).
-Ensure data rows render correctly with values like Loan Request, Officer A, etc.
-Confirm the "View" action button is present for each row.
-Filter Table Rows Based on Search Input:

-Enter a term into the search input (e.g., Mortgage Request).
-Verify only rows matching the search term are displayed.
-Confirm rows not matching the search term are hidden.