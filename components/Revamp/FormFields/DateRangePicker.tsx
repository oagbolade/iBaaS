import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { DateRange } from '@mui/x-date-pickers-pro';

type Props = {
  handleClose: Function;
};

export function DateRangePicker({ handleClose }: Props) {
  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2023-11-17'),
    dayjs('2023-12-21'),
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangeCalendar']}>
        <DateRangeCalendar
          value={value}
          onChange={(newValue: any) => {
            setValue(newValue);
            handleClose();
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
