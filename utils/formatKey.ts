// Helper function to format keys
export const formatKey = (key: string) => {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
    .replace(/([A-Z])/g, (match) => ` ${match}`) // Add space before each capital letter (for PascalCase)
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter of the string

  // so if you have AccountNumber as key it will return Account Number (note the space is in between)
};
