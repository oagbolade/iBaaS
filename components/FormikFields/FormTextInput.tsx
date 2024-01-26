import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { textStyle, labelTypography, asterix } from './styles';
import { TextError } from '@/components/Forms';

type Props = {
  endAdornment?: React.JSX.Element | undefined;
  placeholder: string;
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  customStyle?: object;
  icon?: any;
  type?: 'text' | 'password';
};

export const FormTextInput = ({
  placeholder,
  name,
  icon,
  label,
  required = false,
  customStyle,
  type,
  endAdornment,
  disabled,
}: Props) => {
  return (
    <Box sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field }: FieldProps) => {
          return (
            <>
              <Stack
                sx={{
                  marginBottom: '3px',
                }}
                direction="row"
              >
                <Typography sx={labelTypography}>{label} </Typography>
                {required && <Typography sx={asterix}>*</Typography>}
              </Stack>
              <TextField
                disabled={disabled}
                type={type}
                {...field}
                id={name}
                placeholder={placeholder}
                sx={textStyle}
                style={{ ...customStyle }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{icon}</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {endAdornment}
                    </InputAdornment>
                  ),
                }}
              />
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </Box>
  );
};
