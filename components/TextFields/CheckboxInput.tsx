import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

type Props = {
    label?: string;
    required?: boolean;
  };

export const CheckboxInput = ({required, label} : Props) => {
  return (
    <FormGroup>
      <FormControlLabel required={required} control={<Checkbox />} label={label} />
    </FormGroup>
  );
}