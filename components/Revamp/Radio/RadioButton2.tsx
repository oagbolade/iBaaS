import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import { RadioButtonStyle, RadioButtonTitle } from './style';
import { CustomStyleI } from '@/constants/types';

// Note: Deprecatted, use this instead: import { FormikRadioButton } from '@/components/FormikFields';

interface OptionsI {
  value: string | number;
  label: string;
}
type Props = {
  title?: string;
  value: string;
  options: OptionsI[];
  name: string;
  id?: string;
  className?: string;
  handleCheck?: (value: string) => void;
  disabled?: boolean;
  customStyle?: object;
};

function BpRadio(props: RadioProps) {
  // eslint-disable-next-line no-undef
  return <Radio disableRipple color="default" {...props} />;
}

export const RadioButtons2 = ({
  id,
  className,
  title,
  value,
  name,
  options,
  handleCheck,
  disabled,
  customStyle
}: Props) => {
  const [selectedValue, setValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value; // Get the raw value from the radio button
    if (handleCheck) {
      handleCheck(newValue); // Pass the raw value to handleCheck
    }
    setValue(newValue); // Update local state
  };

  return (
    <FormControl>
      {title && <FormLabel sx={{ ...RadioButtonTitle }}>{title}</FormLabel>}
      <button
        className={className}
        type="button"
        id={id}
        value={selectedValue}
        style={{ display: 'none' }}
        disabled={disabled}
      >
        Hidden
      </button>
      <RadioGroup
        defaultValue={value || selectedValue}
        onChange={handleChange}
        name={name}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <Box>
          {options.map((option) => {
            return (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={
                  <BpRadio disabled={disabled} style={{ ...customStyle }} />
                }
                label={option.label}
                name={name}
                disabled={disabled}
                style={{ ...customStyle }}
              />
            );
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
