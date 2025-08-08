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
import { useGetSystemDate } from '@/api/general/useSystemDate';

type Props = {
  label: string;
  name?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  disableFuture?: boolean;
  value?: string | Dayjs;
  defaultValue?: string | Dayjs;
  handleDateChange?: Function;
  minDate?: Dayjs;
  maxDate?: Dayjs;
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
  minDate,
  maxDate,
}: Props) => {
  const { sysmodel, isLoading } = useGetSystemDate();
  const systemDate = sysmodel?.systemDate;

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const { setFieldValue } = form;

          if (!field.value && systemDate && !isLoading) {
            setFieldValue(name, dayjs(systemDate));
          }

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
                    disabled={disabled}
                    disableFuture={disableFuture}
                    minDate={minDate}
                    maxDate={maxDate}
                    className={className}
                    {...field}
                    label={label}
                    defaultValue={field.value || defaultValue}
                    value={field.value ? value || dayjs(field.value) : null}
                    onChange={(newValue) => {
                      handleDateChange?.(newValue);
                      setFieldValue(name, newValue);
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
