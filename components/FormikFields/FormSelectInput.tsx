// Use select field without formik validation, often used for table filters
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { labelTypography, asterix, textStyle } from './styles';
import colors from '@/assets/colors';

interface OptionsI {
  name: string;
  value: string;
}

type Props = {
  label?: string;
  name: string;
  icon?: any;
  options: OptionsI[];
  required?: boolean;
  disabled?: boolean;
  customStyle?: object;
  placeholder?: string;
  onChange?: Function;
  value?: string;
};

export const FormSelectInput = ({
  label,
  required = false,
  icon,
  name,
  options,
  customStyle,
  placeholder,
  disabled = false,
  onChange,
  value
}: Props) => {
  return (
    <Box mb={2}>
      <Stack
        sx={{
          marginBottom: '3px'
        }}
        direction="row"
      >
        <Typography sx={labelTypography}>{label} </Typography>
        {required && <Typography sx={asterix}>*</Typography>}
      </Stack>
      <InputLabel sx={{ display: 'none' }} id="name-select-label">
        {label}
      </InputLabel>
      <Select
        labelId="name-select-label"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange?.(event)}
        sx={{
          ...textStyle,
          paddingRight: '8px',
          background: disabled ? `${colors.neutral300}` : `${colors.neutral200}`
        }}
        style={{ ...customStyle }}
        inputProps={{
          name,
          'data-testid': name,
          placeholder: name
        }}
        displayEmpty
        IconComponent={() => {
          return (
            icon || (
              <KeyboardArrowDownIcon
                sx={{ color: `${colors.neutral700}` }}
                fontSize="large"
              />
            )
          );
        }}
      >
        <MenuItem value="" selected>
          {placeholder || 'Select an Option'}
        </MenuItem>

        {options?.map((option) => {
          return (
            <MenuItem key={option.name} value={option.value}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
