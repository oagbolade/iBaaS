import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { checkboxTypography } from './styles';
import { MenuIDList } from '@/utils/getCheckedMenus';
import { IAccounts } from '@/api/ResponseTypes/admin';

interface IStyles {
  fontSize?: string;
  color?: string;
  fontWeight: number;
  lineHeight: string;
}

type Props = {
  checkList?: MenuIDList;
  customerAccountList?: IAccounts[];
  label?: string;
  handleCheck?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  id?: string;
  required?: boolean;
  value?: number;
  styles?: IStyles;
};

export const CheckboxInput = ({
  required,
  label,
  name,
  className,
  id,
  checkList,
  customerAccountList,
  handleCheck,
  value,
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

  const isChecked = (ids: number) => {
    let isInList = false;

    if (customerAccountList) {
      customerAccountList?.forEach((menu) => {
        if (Number(menu.accountNumber) === ids) {
          isInList = true;
          return true;
        }
      });
    } else {
      checkList?.forEach((menu) => {
        if (menu.menu_id === ids) {
          isInList = true;
          return true;
        }
      });
    }
    return isInList;
  };

  return (
    <FormGroup sx={{ width: '140px', height: '20px' }}>
      <FormControlLabel
        sx={{ ...checkboxTypography, ...styles }}
        required={required}
        control={
          <Checkbox
            className={className}
            id={id}
            value={value}
            name={name}
            checked={isChecked(Number(name)) || checked}
            onChange={handleChange}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};
