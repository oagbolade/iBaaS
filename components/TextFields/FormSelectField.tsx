import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { textStyle, labelTypography, asterix } from './styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextError } from '@/components/Forms';

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

export const FormSelectField = ({
  icon,
  options,
  name,
  label,
  required,
}: Props) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <>
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
              displayEmpty
              sx={{ ...textStyle, paddingRight: '8px' }}
              inputProps={{
                name,
              }}
              IconComponent={() =>
                icon || <KeyboardArrowDownIcon fontSize="large" />
              }
            >
              <MenuItem value="">Select Option</MenuItem>
              {options.map((option) => (
                <MenuItem key={option.name} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage component={TextError} name={name} />
          </>
        )}
      </Field>
    </Box>
  );
};

FormSelectField.defaultProps = {
  required: false,
};
