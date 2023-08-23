import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  customStyle?: object;
};

export const FormSelectInput = ({
  label,
  required,
  icon,
  name,
  options,
  customStyle,
}: Props) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

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
        value={age}
        onChange={handleChange}
        sx={{ ...textStyle, paddingRight: '8px' }}
        style={{ ...customStyle }}
        inputProps={{
          name,
        }}
        IconComponent={() =>
          icon || (
            <KeyboardArrowDownIcon
              sx={{ color: `${colors.neutral700}` }}
              fontSize="large"
            />
          )
        }
      >
        <MenuItem value="">Select an Option</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

FormSelectInput.defaultProps = {
  required: false,
};
