import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { TextError } from '@/components/Forms';
import { textStyle, labelTypography, asterix } from './styles';

type Props = {
  placeholder: string;
  name: string;
  label: string;
  required?: boolean;
  icon?: any;
};

export const FormTextInput = ({
  placeholder,
  name,
  icon,
  label,
  required,
}: Props) => {
  return (
    <Box>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
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
            name={name}
            id={name}
              placeholder={placeholder}
              sx={textStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }}
            />
            <ErrorMessage component={TextError} name={name} />
          </>
        )}
      </Field>
    </Box>
  );
};

FormTextInput.defaultProps = {
  required: false,
};
