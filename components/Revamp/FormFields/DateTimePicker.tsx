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

type Props = {
  label: string;
  name?: string;
  className?: string;
  handledValue?: Dayjs | string | null;
  required?: boolean;
  disabled?: boolean;
  handleDateChange?: Function;
  value?: Dayjs | null;
  defaultValue?: string | Dayjs | null;
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
  // Parse value to Dayjs object
  const parseToDayjs = (val: any): Dayjs | null => {
    if (!val) return null;
    if (dayjs.isDayjs(val)) return val;
    if (typeof val === 'string') {
      const parsed = dayjs(val);
      return parsed.isValid() ? parsed : null;
    }
    return null;
  };

  // Set default date to today if no defaultValue is provided
  const defaultDate = parseToDayjs(defaultValue) || dayjs();

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;
          const fieldValue = parseToDayjs(field.value);

          return (
            <DateTimeWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                <Typography sx={labelTypography}>{label}</Typography>
                {required && <Typography sx={asterix}>*</Typography>}
                </Box>
                <DatePicker
                  disabled={disabled}
                  className={className}
                  defaultValue={defaultDate}
                  {...field}
                  value={parseToDayjs(value) || fieldValue || defaultDate}
                  onChange={(newValue: Dayjs | null) => {
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
