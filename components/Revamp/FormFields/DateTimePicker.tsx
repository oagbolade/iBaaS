import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { asterix, labelTypography } from '@/components/FormikFields/styles';

type Props = {
  label: string;
  required?: boolean;
};

export default function DateTimePicker({ label, required }: Props) {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography mb={2} sx={labelTypography}>
        {label}{' '}
      </Typography>
      {required && <Typography sx={asterix}>*</Typography>}
      <DatePicker
        value={value}
        onChange={(newValue) => {
          return setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
