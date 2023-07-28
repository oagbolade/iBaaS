import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { textStyle, labelTypography, asterix } from './styles';

type Props = {
  placeholder: string;
  label: string;
  required?: boolean;
  icon?: any;
};

export const FormTextInput = ({
  placeholder,
  icon,
  label,
  required,
}: Props) => {
  return (
    <Box>
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
        placeholder={placeholder}
        sx={textStyle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

FormTextInput.defaultProps = {
  required: false,
};
