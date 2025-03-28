StateManagement Component
    -renders TopActionsArea and SetupContainer
    -renders FilterSection when data is available
    -displays loading state when isLoading is true
    -displays table with data when isLoading is false and data is present
    -displays empty table body when no search is performed
    -handles search correctly
    -renders FormSkeleton when data is loading
    -handles empty states, status, and region gracefully
    -handles API errors gracefully