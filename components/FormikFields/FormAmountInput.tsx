import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import { textStyle, labelTypography, asterix } from './styles';
import { StyledTextInput } from './FormTextInput';
import { TextError } from '@/components/Forms';
import colors from '@/assets/colors';

type Props = {
  endAdornment?: React.JSX.Element | undefined;
  placeholder?: string;
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  customStyle?: object;
  icon?: any;
  type?: 'text' | 'password' | 'number';
};

export const FormAmountInput = ({
  placeholder,
  name,
  icon,
  label,
  required = false,
  customStyle,
  type,
  endAdornment,
  disabled
}: Props) => {
  const formatValueWithCommas = (val: any) => {
    let formattedVal = val;
    if (typeof formattedVal !== 'string') {
      formattedVal = String(formattedVal); // Convert to string if not already
    }
    if (formattedVal) {
      const [integerPart, decimalPart] = formattedVal.split('.');
      const formattedInteger = parseInt(integerPart, 10).toLocaleString();
      return decimalPart !== undefined
        ? `${formattedInteger}.${decimalPart}`
        : formattedInteger;
    }
    return '';
  };

  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <Stack
                sx={{
                  marginBottom: '3px'
                }}
                direction="row"
              >
                <Typography sx={labelTypography}>{label} </Typography>
                {required && <Typography sx={asterix}>*</Typography>}
              </Stack>
              <StyledTextInput>
                <InputLabel sx={{ display: 'none' }} id={label}>
                  {label}
                </InputLabel>
                <TextField
                  label={label}
                  disabled={disabled}
                  type={type}
                  {...field}
                  value={formatValueWithCommas(field.value)}
                  id={name}
                  placeholder={placeholder}
                  sx={{
                    ...textStyle,
                    background: disabled
                      ? `${colors.neutral300}`
                      : `${colors.neutral200}`
                  }}
                  style={{ ...customStyle }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{icon}</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {endAdornment}
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/,/g, '');
                    // Allow only numbers with up to two decimal places
                    if (/^\d*\.?\d{0,2}$/.test(rawValue)) {
                      form.setFieldValue(name, rawValue);
                    }
                  }}
                />
              </StyledTextInput>
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </Box>
  );
};
