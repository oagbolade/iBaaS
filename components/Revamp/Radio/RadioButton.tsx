import React from 'react';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import { RadioButtonStyle, RadioButtonTitle } from './style';

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
  handleCheck?: Function;
  disabled?: boolean;
};

function BpRadio(props: RadioProps) {
  return <Radio disableRipple color="default" {...props} />;
}

export const RadioButtons = ({
  id,
  className,
  title,
  value,
  name,
  options,
  handleCheck,
  disabled
}: Props) => {
  const [selectedValue, setValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const booleanValue = event.target.value === '1'; // Convert string to boolean directly
    if (handleCheck) {
      handleCheck(booleanValue, event.target.value);
    } else {
      setValue(event.target.value);
    }
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
                control={<BpRadio disabled={disabled} />}
                label={option.label}
                name={name}
                disabled={disabled}
              />
            );
          })}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};
