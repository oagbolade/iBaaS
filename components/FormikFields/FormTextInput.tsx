import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import styled from 'styled-components';
import { textStyle, labelTypography, asterix } from './styles';
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
  autoComplete?: 'on' | 'off' | 'new-password' | 'new-userid';
  customStyle?: object;
  icon?: any;
  type?: 'text' | 'password' | 'number' | 'search';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Remove input label on text input field
export const StyledTextInput = styled.section`
  .MuiInputLabel-outlined {
    display: none;
  }

  .MuiInputLabel-sizeMedium {
    display: none;
  }
`;

export const FormTextInput = ({
  placeholder,
  name,
  icon,
  label,
  required = false,
  customStyle,
  type = 'text',
  autoComplete = 'off',
  endAdornment,
  disabled,
  value,
  onChange
}: Props) => {
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
                  data-testid={name}
                  disabled={disabled}
                  type={type}
                  {...field}
                  value={value || field.value}
                  id={name}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    form.setFieldValue(name, event.target.value);
                    if (onChange) onChange(event);
                  }}
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
