import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { labelTypography, asterix } from './styles';

type Props = {
  label: string;
  required?: boolean;
};

export const FormSelectInput = ({ label, required }: Props) => {
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
      <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Box>
  );
};

FormSelectInput.defaultProps = {
  required: false,
};
