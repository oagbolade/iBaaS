Dashboard
    Renders loading state correctly
    Displays the FormSkeleton loader when data is being fetched.
    Displays user greeting with correct name
    Shows "Welcome back, [User Name]" when getStoredUser returns a valid user.
    Handles missing user name gracefully
    Displays a fallback message "Oops!. Cannot find user name" when getStoredUser returns null or undefined.
    Displays balances and calculates percentages correctly
    Shows the formatted total balance (₦total) correctly.
    Accurately calculates and displays the percentage based on cRtotal and dRtotal.
    Renders TrendCard components with correct props
    Displays the "Till Balance" TrendCard with the correct amount and percentage.
    Displays the "Pending Actions" TrendCard with the correct pending data count.
    Displays Recently Visited Modules correctly
    Renders the RecentlyVisitedModules component with the correct list of modules.
    Displays Basic Setup section correctly
    Renders the BasicSetup component showing the setup tasks and progress.
    Displays Pending Tasks correctly
    Renders the PendingTasks component with the correct list of pending requests.


TrendCard
    Renders title and amount correctly
    Displays the title prop accurately.
    Shows the amount prop in the correct format.
    Displays positive trend indicators when applicable
    Shows the PositiveTrendIcon and UpTrendIcon when isPositiveTrend is true.
    Displays the percentage in green color (colors.activeGreen300) when the trend is positive.
    Displays negative trend indicators when applicable
    Shows the NegativeTrendIcon and DownTrendIcon when isPositiveTrend is false.
    Displays the percentage in red color (colors.primaryRedBase) when the trend is negative.
    Handles missing percentage gracefully
    Does not render trend indicators or percentage when the percentage prop is not provided.
    Shows fallback for missing amount
    Displays a fallback text -- when the amount prop is missing or empty.


RecentlyVisitedModules
    Renders header correctly
    Displays the "Recently Visited Modules" title at the top of the component.
    Displays list of recently visited modules
    Renders each module's name and provides a "View" action link.
    Ensures that up to 6 modules are displayed as per the slice operation.
    Handles empty modules list gracefully
    Shows the message "No modules visited today!" when there are no recently visited modules.


BasicSetup
    Renders loading state correctly
    Displays the FormSkeleton loader when any of the setup-related data is being fetched.
    Displays completion percentage accurately
    Calculates the completion percentage based on the number of completed tasks.
    Shows the correct percentage text (e.g., "75% completed").
    Displays progress bar correctly
    Renders the ProgressBar component with the accurate progress value.
    Renders all setup tasks correctly
    Displays each SetupTask with the correct label, checkbox state, and action link based on the fetched data.
    Handles partially completed tasks correctly
    Shows action links only for tasks that are not yet completed (isChecked is false).
    Ensures that completed tasks do not display action links.


SetupTask
    Renders label and checkbox correctly when task is completed
    Displays the task label accurately.
    Shows the checkbox in a checked state when isChecked is true.
    Does not render the action link when the task is completed.
    Renders label, checkbox, and link correctly when task is pending
    Displays the task label accurately.
    Shows the checkbox in an unchecked state when isChecked is false.
    Renders the action link with the correct href and linkText when the task is pending.


PendingTasks
    Renders loading state correctly
    Displays the FormSkeleton loader when pending requests are being fetched.
    Displays pending tasks in the table correctly
    Renders each pending request with the correct authdesc and authid.
    Provides a "View" action link that navigates to the correct URL based on the authid.
    Handles empty pending tasks gracefully
    Shows the message "No pending tasks" when there are no pending requests.
    Displays the correct count of pending tasks
    Shows the accurate number of pending tasks next to the "Pending tasks" title.