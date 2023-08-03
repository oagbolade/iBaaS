import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextError } from '@/components/Forms';
import { textStyle, labelTypography, asterix } from './styles';

type Props = {
  placeholder: string;
  name: string;
  label: string;
  required?: boolean;
  showPassword?: boolean;
  customStyle?: object;
  icon?: any;
  handleClickShowPassword?: () => void | undefined;
  handleMouseDownPassword?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | undefined;
  type?: 'text' | 'password';
};

export const FormTextInput = ({
  placeholder,
  name,
  icon,
  label,
  required,
  customStyle,
  type,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}: Props) => {
  return (
    <Box sx={{ marginBottom: '10px' }}>
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
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              sx={textStyle}
              style={{ ...customStyle }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
                endAdornment: showPassword !== undefined && (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
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
