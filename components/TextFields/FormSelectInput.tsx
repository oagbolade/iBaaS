import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { textStyle, labelTypography, asterix } from './styles';

type Props = {
  placeholder: string;
  label: string;
  required?: boolean;
  icon?: any;
};

export const FormSelectInput = ({
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
      <Select
          // value={age}
          // onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      {/* <TextField
        placeholder={placeholder}
        sx={textStyle}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
        }}
      /> */}
    </Box>
  );
};

FormSelectInput.defaultProps = {
  required: false,
};
