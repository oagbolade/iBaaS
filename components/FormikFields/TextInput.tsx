// Use text input without formik validation, often used for table filters
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { labelTypography, asterix, textStyle } from './styles';
import { CustomStyleI } from '@/constants/types';

type Props = {
  placeholder: string;
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: any;
  customStyle?: CustomStyleI;
  iconPosition?: 'start' | 'end';
};

export const TextInput = ({
  placeholder,
  icon,
  label,
  required,
  customStyle,
  name,
  disabled,
  iconPosition,
}: Props) => {
  return (
    <Stack>
      {label && (
        <Stack
          sx={{
            marginBottom: '3px',
          }}
          direction="row"
        >
          <Typography sx={labelTypography}>{label} </Typography>
          {required && <Typography sx={asterix}>*</Typography>}
        </Stack>
      )}
      <TextField
        name={name}
        placeholder={placeholder}
        sx={{ ...textStyle, ...customStyle }}
        InputProps={{
          startAdornment: iconPosition !== 'end' && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: iconPosition === 'end' && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
        disabled={disabled}
      />
    </Stack>
  );
};
