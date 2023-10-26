import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { textStyle, labelTypography, asterix } from './styles';
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
  customStyle?: object;
};

export const FormSelectField = ({
  icon,
  options,
  name,
  label,
  required,
  customStyle,
}: Props) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box mb={{ mobile: 0.5, tablet: 1 }} sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {return (
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
              label={label}
              id={label}
              placeholder={label}
              value={age}
              onChange={handleChange}
              displayEmpty
              sx={{ ...textStyle, paddingRight: '8px' }}
              style={{ ...customStyle }}
              inputProps={{
                name,
              }}
              IconComponent={() =>
                {return icon || <KeyboardArrowDownIcon fontSize="large" />;}
              }
            >
              <MenuItem value="">Select an Option</MenuItem>
              {options.map((option) => {return (
                <MenuItem key={option.name} value={option.value}>
                  {option.name}
                </MenuItem>
              );})}
            </Select>
            <ErrorMessage component={TextError} name={name} />
          </>
        );}}
      </Field>
    </Box>
  );
};

FormSelectField.defaultProps = {
  required: false,
};
