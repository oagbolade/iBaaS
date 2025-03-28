// Use text input without formik validation, often used for table filters
import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { labelTypography, asterix, textStyle } from './styles';
import { CustomStyleI } from '@/constants/types';

type Props = {
  type?: 'password' | 'text';
  onChange?: Function;
  placeholder?: string;
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: any;
  customStyle?: CustomStyleI;
  iconPosition?: 'start' | 'end';
  value?: string;
  autoFocus?: boolean;
};

export const TextInput = ({
  type = 'text',
  onChange,
  placeholder,
  icon,
  label,
  required,
  customStyle,
  name,
  disabled,
  iconPosition,
  value,
  autoFocus
}: Props) => {
  return (
    <Stack>
      {label && (
        <Stack
          sx={{
            marginBottom: '3px'
          }}
          direction="row"
        >
          <Typography sx={labelTypography}>{label} </Typography>
          {required && <Typography sx={asterix}>*</Typography>}
        </Stack>
      )}
      <TextField
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        sx={{ ...textStyle, ...customStyle }}
        InputProps={{
          startAdornment: iconPosition !== 'end' && (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: iconPosition === 'end' && (
            <InputAdornment position="start">{icon}</InputAdornment>
          )
        }}
        disabled={disabled}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.(event)
        }
      />
    </Stack>
  );
};
