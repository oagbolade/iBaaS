import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { checkboxTypography } from './styles';
import colors from '@/assets/colors';

interface IStyles {
  fontSize?: string;
  color?: string;
  fontWeight: number;
  lineHeight: string;
}

type Props = {
  label?: string;
  handleCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  isChecked?: boolean;
  value?: number;
  styles?: IStyles;
};

export const CheckboxInputV2 = ({
  required,
  label,
  name,
  className,
  id,
  handleCheck,
  value,
  isChecked = false,
  readOnly = false,
  styles
}: Props) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleCheck) {
      handleCheck(event);
    } else {
      setChecked(event.target.checked);
    }
  };

  React.useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    // so this checkbox has read only
    <FormGroup sx={{ width: '140px', height: '20px' }}>
      <FormControlLabel
        sx={{
          ...checkboxTypography,
          ...styles,
          '& .MuiFormControlLabel-label': {
            textDecoration: checked ? 'line-through' : 'none'
          }
        }}
        required={required}
        control={
          <Checkbox
            className={className}
            id={id}
            value={value}
            name={name}
            checked={isChecked}
            onChange={handleChange}
            disabled={!!readOnly}
            sx={{
              '&.Mui-disabled': {
                color: `${colors.activeBlue400}`,
                '& .MuiIconButton-label': {
                  color: `${colors.activeBlue400}`
                }
              }
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
