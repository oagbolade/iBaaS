'use client';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Box, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { largeMultiSelectField, labelTypography } from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

interface OptionsI {
  name: string;
  value: string;
}

type Props = {
  label: string;
  options: OptionsI[];
  icon?: any;
  placeholder: string;
  customStyle?: object;
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const LargeFormMultiSelectField = ({
  label,
  options,
  icon,
  placeholder,
  customStyle,
}: Props) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Stack>
      <Stack
        sx={{
          marginBottom: '3px',
          marginLeft: '40px',
        }}
        direction="row"
      >
        <Typography mb={0.4} sx={labelTypography}>
          {label}
        </Typography>
      </Stack>
      <Box sx={{ marginLeft: '40px' }}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          placeholder={placeholder}
          value={personName}
          onChange={handleChange}
          MenuProps={MenuProps}
          sx={largeMultiSelectField}
          style={{ ...customStyle }}
          IconComponent={() => {
            return icon || <KeyboardArrowDownIcon fontSize="large" />;
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {options.map((option) => (
            <MenuItem
              key={option.name}
              value={option.name}
              style={getStyles(option.name, personName, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Stack>
  );
};
