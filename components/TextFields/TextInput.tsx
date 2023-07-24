import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { textStyle } from './styles';

type Props = {
  placeholder: string;
  icon?: any;
};

export const TextInput = ({ placeholder, icon }: Props) => {
  return (
    <TextField
      placeholder={placeholder}
      sx={textStyle}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
    />
  );
};
