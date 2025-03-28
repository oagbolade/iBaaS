export const generateUniqueId = (): string => {
  const minLength = 4;
  const maxLength = 20;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let uniqueId = '';
  const charsetLength = charset.length;

  // Generate the unique ID
  Array.from({ length }).forEach(() => {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    uniqueId += charset[randomIndex];
  });

  return uniqueId;
};
