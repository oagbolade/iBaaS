import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Theme, useTheme } from '@mui/material/styles';
import {
  labelTypography,
  asterix,
  chipTypography,
  multiSelect
} from './styles';

interface OptionsI {
  name: string;
  value: string;
}

type Props = {
  label: string;
  name: string;
  options: OptionsI[];
  required?: boolean;
  icon?: any;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export const FormMultiSelectField = ({
  icon,
  options,
  name,
  label,
  required
}: Props) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box>
      <Stack
        sx={{
          marginBottom: '3px'
        }}
        direction="row"
      >
        <Typography sx={labelTypography}>{label} </Typography>
        {required && <Typography sx={asterix}>*</Typography>}
      </Stack>
      <Select
        multiple
        value={personName}
        onChange={handleChange}
        renderValue={(selected) => {
          return (
            <Box>
              {selected.map((value) => {
                return (
                  <Chip
                    sx={chipTypography}
                    key={value}
                    label={value}
                    onDelete={handleDelete}
                  />
                );
              })}
            </Box>
          );
        }}
        inputProps={{
          name
        }}
        sx={multiSelect}
        MenuProps={MenuProps}
        IconComponent={() => {
          return icon || <KeyboardArrowDownIcon fontSize="large" />;
        }}
      >
        {options.map((option) => {
          return (
            <MenuItem
              key={option.name}
              value={option.value}
              style={getStyles(option.name, personName, theme)}
            >
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
};

FormMultiSelectField.defaultProps = {
  required: false
};
