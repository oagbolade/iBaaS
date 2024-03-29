import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import { RadioButtonStyle, RadioButtonTitle } from './style';

interface OptionsI {
  value: string;
  label: string;
}
type Props = {
  title?: string;
  value: string;
  options: OptionsI[];
  name: string;
};

function BpRadio(props: RadioProps) {
  return <Radio disableRipple color="default" {...props} />;
}

export const RadioButtons = ({ title, value, name, options }: Props) => {
  const [selectedValue, setValue] = React.useState('active');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      {title && <FormLabel sx={{ ...RadioButtonTitle }}>{title}</FormLabel>}
      <RadioGroup
        defaultValue={value || selectedValue}
        onChange={handleChange}
        name={name}
      >
        <Box sx={RadioButtonStyle}>
          {options.map((option) => {
            return (
              <FormControlLabel
                value={option.value}
                control={<BpRadio />}
                label={option.label}
              />
            );
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
