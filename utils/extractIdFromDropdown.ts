export const extractIdFromDropdown = (
  inputString: string | null
): string | undefined | null => {
  if (String(inputString).trim().length === 0) {
    return null;
  }

  const splitString = String(inputString).split(' ')[1];
  return splitString?.substring(0, splitString.length - 1);
};

export const extractNameFromDropdown = (
  inputString: string | null
): string | undefined | null => {
  if (String(inputString).trim().length === 0) {
    return null;
  }

  const splitString = String(inputString).split(': ')[1];
  return splitString?.substring(0, splitString.length - 1);
};
