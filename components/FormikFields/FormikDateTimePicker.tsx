import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Typography, Box, InputLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { StyledTextInput } from './FormTextInput';
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
  disableFuture?: boolean;
  handleDateChange?: Function;
  value?: string | Dayjs;
  defaultValue?: string | Dayjs;
  minDate?: Dayjs;
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

  .MuiTypography-root {
    display: inline;
  }
`;

export const FormikDateTimePicker = ({
  name = 'default',
  label,
  required,
  className,
  value,
  disabled,
  defaultValue,
  handleDateChange,
  disableFuture,
  minDate
}: Props) => {
  const today = value || dayjs();

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;
          return (
            <DateTimeWrapper>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Typography sx={labelTypography}>{label}</Typography>
                {required && <Typography sx={asterix}>*</Typography>}
                <StyledTextInput>
                  <InputLabel sx={{ display: 'none' }} id={label}>
                    {label}
                  </InputLabel>
                  <DatePicker
                    data-testid={name}
                    label={label}
                    disabled={disabled}
                    disableFuture={disableFuture}
                    minDate={minDate}
                    className={className}
                    {...field}
                    defaultValue={today || defaultValue}
                    value={today || field.value}
                    onChange={(newValue) => {
                      if (handleDateChange) {
                        handleDateChange(newValue);
                      }
                      return setFieldValue(name as string, newValue);
                    }}
                    slotProps={{
                      field: { clearable: true }
                    }}
                  />
                </StyledTextInput>
                <ErrorMessage component={TextError} name={name} />
              </LocalizationProvider>
            </DateTimeWrapper>
          );
        }}
      </Field>
    </Box>
  );
};
