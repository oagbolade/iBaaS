Rendering and Structure
Renders all child components correctly
Ensures that TopActionsArea, SetupCompanyForm, and PermissionsSection are present in the DOM.
Renders SetupCompanyForm with correct props
Verifies that SetupCompanyForm receives the appropriate isSubmitting, currencies, and states props.
Renders PermissionsSection correctly
Confirms that the PermissionsSection component is displayed as expected.
Renders TopActionsArea with action buttons
Checks that the TopActionsArea includes the PrimaryIconButton with the correct properties.

Loading States
Displays loading state when global loading is active
Verifies that the submit button is disabled or shows a loading indicator when isLoading is true.
Displays loading state for SetupCompanyForm when data is loading
Ensures that SetupCompanyForm does not render and appropriate loading indicators are shown when currencies or states are loading.

Form Submission and Interactions
Handles submit button click and triggers submission
Simulates a user clicking the submit button and checks that the isSubmitting state updates to true.
Submits form and calls mutate function on submission
Ensures that the form submission invokes the mutate function with the correct data.
Handles multiple submit button clicks and maintains state
Tests that multiple clicks on the submit button correctly trigger multiple submissions and maintain the isSubmitting state.

Conditional Rendering
Does not render SetupCompanyForm when currencies or states are undefined
Checks that SetupCompanyForm is not displayed if either currencies or states data is missing.
Does not render submit button when isLoading is true
Confirms that the submit button is disabled or hidden when the global loading state is active.

Prop Handling and Edge Cases
Passes correct props to SetupCompanyForm
Validates that SetupCompanyForm receives the correct currencies, states, and submission state.
Handles absence of userid prop gracefully
Ensures that the component functions correctly even when the optional userid prop is not provided.

State Management and Updates
Handles state changes correctly during form submission
Verifies that the isSubmitting state toggles appropriately before and after form submission.
Maintains consistent state across multiple renders
Ensures that state persists correctly across component re-renders and user interactions.

Action Buttons Functionality
Renders action buttons correctly in TopActionsArea
Checks that the action buttons, including the submit button, are rendered with the correct labels and styles.
Submit button reflects loading state appropriately
Confirms that the submit button shows a loading indicator and is disabled when the form is submitting.
