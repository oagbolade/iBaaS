import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { textStyle, labelTypography } from './styles';
import { countries } from '@/constants/countries';

type Props = {
  name: string;
  label: string;
  width?: string;
};

export const CountrySelectField = ({ name, label, width }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSelectedCountry(event.target.value);
  };

  return (
    <Box>
      <Typography mb={0.4} sx={labelTypography}>
        {label}{' '}
      </Typography>
      <Select
        inputProps={{
          name,
        }}
        IconComponent={() => {
          return <KeyboardArrowDownIcon fontSize="large" />;
        }}
        value={selectedCountry}
        sx={{
          ...textStyle,
          width: width || '108px',
          paddingRight: '8px',
          fontSize: '12px',
        }}
        onChange={handleChange}
      >
        {countries.map((country) => {
          return (
            <MenuItem key={country.code} value={country.phone}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                alt=""
              />
              {`+${country.phone}`}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};
