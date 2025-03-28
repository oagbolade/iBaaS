import * as React from 'react';
import { Dayjs } from 'dayjs';
import { Typography, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { asterix, labelTypography } from '@/components/FormikFields/styles';
import colors from '@/assets/colors';
import { TextError } from '@/components/Forms';

// Note: Deprecatted, use this instead: import { FormikDateTimePicker } from '@/components/FormikFields';

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
    border: ${colors.neutral200};
    background: ${colors.neutral200};
    color: ${colors.neutral600};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }

  .MuiFormControl-root {
    width: 100%;
  }

  .MuiFormControl-root:hover {
    border-radius: 4px;
    border: ${colors.neutral200};
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
  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;

          return (
            <DateTimeWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography sx={labelTypography}>{label} </Typography>
                {required && <Typography sx={asterix}>*</Typography>}
                <DatePicker
                  disabled={disabled}
                  className={className}
                  defaultValue={defaultValue}
                  {...field}
                  value={value || field.value}
                  onChange={(newValue) => {
                    return setFieldValue(name as string, newValue);
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
