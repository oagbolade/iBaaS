import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('Password is Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .test(
      'no-sequential-numbers',
      'Password cannot contain a sequence of numbers (e.g., 1234 or 4321)',
      (value) => {
        if (!value) return true; // Skip if value is empty (handled by required)
        // Check for ascending or descending sequences of 4 or more digits
        const sequentialNumbersRegex =
          /(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)/;
        return !sequentialNumbersRegex.test(value);
      }
    ),
  confirmPassword: Yup.string()
    .required('Password is Required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .test(
      'no-sequential-numbers',
      'Password cannot contain a sequence of numbers (e.g., 1234 or 4321)',
      (value) => {
        if (!value) return true; // Skip if value is empty (handled by required)
        // Check for ascending or descending sequences of 4 or more digits
        const sequentialNumbersRegex =
          /(?:0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210)/;
        return !sequentialNumbersRegex.test(value);
      }
    )
});
