export function convertToISOString(dateString: string): string {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Convert the Date object to an ISO string
  return date.toISOString();
}

// Example usage
//   const inputDate = 'Thu Nov 17 2023 00:00:00 GMT+0100 (West Africa Standard Time)';
//   const formattedDate = convertToISOString(inputDate);

//   console.log(formattedDate);  // Output: 2023-11-16T23:00:00.000Z
