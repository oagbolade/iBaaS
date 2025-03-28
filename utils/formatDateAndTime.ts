export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Format the date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);

  return formattedDate; // Aug 26, 2024, 2:30 PM
};
