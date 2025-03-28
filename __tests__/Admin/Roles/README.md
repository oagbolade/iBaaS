Create Role
-renders the component with form fields and titles
-displays the loading skeleton when editing and data is loading
-renders 'Create New Role' title when creating a new role
-renders 'Edit Role' title when editing an existing role
-pre-populates form fields with role data when editing
-validates role name, idle timeout, access days, role level, and role description fields on submit
-triggers error messages for missing required fields
-submits form with valid data
-calls onSubmit function when submitting the form
-invokes mutate function from useCreateRole hook with form values
-displays toast message when privileges are missing for a new role
-renders privilege sections for data capture and authorization
-does not render the authorization privilege section when showPermission is false
-renders authorization privilege section when showPermission is true
-sets data capture privilege checklist when setSumbissionCheckList is called in PrivilegeSection
-sets authorization privilege checklist when setAuthPriviledgeCheckList is called in PrivilegeSection

Fetch Role
-Render Check: Verifies the component renders with its main elements.
-Loading Skeleton: Shows loading skeleton while data is loading.
-Table Data Rendering: Displays role data correctly in table rows.
-Pagination Functionality: Changes the page when the page state is updated.
-Delete Action - Confirmation Modal: Displays the delete confirmation modal with appropriate content.
-Delete Action - Password Validation and Role Deletion: Simulates role deletion and ensures API calls for password validation and role deletion are made.
