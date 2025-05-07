import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { asterix, labelTypography } from '@/components/FormikFields/styles';
import colors from '@/assets/colors';
import { TextError } from '@/components/Forms';

// Note: Deprecated, use this instead: import { FormikDateTimePicker } from '@/components/FormikFields';

type Props = {
  label: string;
  name?: string;
  className?: string;
  handledValue?: Dayjs | string | null;
  required?: boolean;
  disabled?: boolean;
  handleDateChange?: Function;
  value?: Dayjs;
  defaultValue?: string | Dayjs;
};

const DateTimeWrapper = styled.section`
  .MuiInputBase-root {
    border-radius: 4px;
    border: 1px solid ${colors.neutral200};
    background: ${colors.neutral200};
    color: ${colors.neutral600};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  .MuiInputBase-root.Mui-error {
    border: 1px solid ${colors.neutral200}; /* Override red border for error state */
  }

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiFormControl-root:hover .MuiInputBase-root {
    border: 1px solid ${colors.neutral200};
    background: ${colors.neutral200};
  }
`;

export default function DateTimePicker({
  name = 'default',
  label,
  required,
  className,
  value,
  disabled,
  defaultValue
}: Props) {
  // Set default date to today if no defaultValue is provided
  // To use a specific default date (e.g., 2023-01-01), replace dayjs() with dayjs('2023-01-01')
  // eslint-disable-next-line no-nested-ternary
  const defaultDate = defaultValue
    ? typeof defaultValue === 'string'
      ? dayjs(defaultValue)
      : defaultValue
    : dayjs(); // Default to current date

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;

          return (
            <DateTimeWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography sx={labelTypography}>{label}</Typography>
                {required && <Typography sx={asterix}>*</Typography>}
                <DatePicker
                  disabled={disabled}
                  className={className}
                  defaultValue={defaultDate}
                  {...field}
                  value={value || field.value || defaultDate} // Ensure initial value to avoid validation errors
                  onChange={(newValue) => {
                    setFieldValue(name as string, newValue);
                  }}
                />
                <ErrorMessage component={TextError} name={name} />
              </LocalizationProvider>
            </DateTimeWrapper>
          );
        }}
      </Field>
    </Box>
  );
}
