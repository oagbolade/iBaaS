import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { TextError } from '@/components/Forms';
import {
  asterix,
  textStyle,
  labelTypography,
} from '@/components/FormikFields/styles';

type Props = {
  endAdornment?: React.JSX.Element | undefined;
  placeholder?: string;
  name: string;
  label: string;
  required?: boolean;
  customStyle?: object;
  icon?: any;
  type?: 'text' | 'password';
};

export default function DateTimePicker({
  placeholder,
  name,
  icon,
  label,
  required,
  customStyle,
  type,
  endAdornment,
}: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography mb={2} sx={labelTypography}>
        {label}{' '}
      </Typography>
      {required && <Typography sx={asterix}>*</Typography>}
      <DatePicker value={value} onChange={(newValue) => {return setValue(newValue);}} />
    </LocalizationProvider>
  );
}
