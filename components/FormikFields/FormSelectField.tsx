import React, { ReactNode } from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputLabel } from '@mui/material';
import { textStyle, labelTypography, asterix } from './styles';
import { StyledTextInput } from './FormTextInput';
import { TextError } from '@/components/Forms';
import colors from '@/assets/colors';

export interface OptionsI {
  name: string;
  value: string;
  staffID?: string;
  branchCode?: string;
}

type Props = {
  label: string;
  name: string;
  loading?: boolean;
  options: OptionsI[];
  value?: string | null;
  onChange?: (event: SelectChangeEvent<any>, child: ReactNode) => void;
  required?: boolean;
  disabled?: boolean;
  icon?: any;
  customStyle?: object;
};

export const FormSelectField = ({
  icon,
  options,
  name,
  label,
  required = false,
  customStyle,
  loading,
  disabled,
  onChange,
  value = ''
}: Props) => {
  const safeValue = !options?.some((option) => option?.value === value)
    ? ''
    : value;

  return (
    <Box mb={{ mobile: 0.5, tablet: 1 }} sx={{ marginBottom: '15px' }}>
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          return (
            <>
              <Stack
                sx={{
                  marginBottom: '3px'
                }}
                direction="row"
              >
                <Typography sx={labelTypography}>{label} </Typography>
                {required && <Typography sx={asterix}>*</Typography>}
              </Stack>
              <StyledTextInput>
                <InputLabel sx={{ display: 'none' }} id="name-select-label">
                  {label}
                </InputLabel>
                <Select
                  labelId="name-select-label"
                  label={label}
                  id={name}
                  {...field}
                  onBlur={field.onBlur}
                  onChange={(event, child) => {
                    form.setFieldValue(name, event.target.value);
                    if (onChange) onChange(event, child);
                  }}
                  placeholder={label}
                  displayEmpty
                  disabled={disabled}
                  value={safeValue || field.value}
                  sx={{
                    ...textStyle,
                    paddingRight: '8px',
                    background: disabled
                      ? `${colors.neutral300}`
                      : `${colors.neutral200}`
                  }}
                  style={{ ...customStyle }}
                  inputProps={{
                    name,
                    'data-testid': name,
                    placeholder: name
                  }}
                  IconComponent={() => {
                    return icon || <KeyboardArrowDownIcon fontSize="large" />;
                  }}
                >
                  <MenuItem value="" selected>
                    {loading ? 'Loading...' : 'Select an Option'}
                  </MenuItem>
                  {options?.map((option) => {
                    return (
                      <MenuItem key={option.name} value={option.value}>
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </StyledTextInput>
              <ErrorMessage component={TextError} name={name} />
            </>
          );
        }}
      </Field>
    </Box>
  );
};
