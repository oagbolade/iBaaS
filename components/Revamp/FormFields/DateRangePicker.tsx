import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import styled from 'styled-components';
import { DateCalendar } from '@mui/x-date-pickers';
import { Box, ClickAwayListener } from '@mui/material';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import dayjs from 'dayjs';
import useFormattedDates from '@/utils/hooks/useFormattedDates';

type Props = {
  handleClose?: any;
  CustomDateRangePicker: any;
};

// Remove liscence key water mark
const StyledDateRangeCalendar = styled.section`
  .MuiDateRangeCalendar-root > div:first-child {
    display: none;
  }
`;

export function DateRangePicker({ handleClose, CustomDateRangePicker }: Props) {
  const { dateValue, setDateValue, setIsDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const confirmAndClose = () => {
    setIsDateFilterApplied(true);
    handleClose();
  };

  type Key = 'startDate' | 'endDate';

  const handleDateChange = (newValue: any, key: Key) => {
    if (key === 'startDate') {
      setDateValue([newValue, dateValue[1]]);
    } else {
      setDateValue([dateValue[0], newValue]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <ClickAwayListener onClickAway={handleClose}>
      <StyledDateRangeCalendar >
        {CustomDateRangePicker || (
          <Box sx={{ display: 'flex' }}>
            <DateCalendar
              value={dateValue[0]}
              onChange={(newValue) => handleDateChange(newValue, 'startDate')}
            />
            <DateCalendar
              value={dateValue[1]}
              onChange={(newValue) => handleDateChange(newValue, 'endDate')}
            />
          </Box>
        )}

        <PrimaryIconButton
          customStyle={{
            margin: '0 0 12px 25px',
            width: '20px',
            height: '25px',
            color: 'white'
          }}
          buttonTitle="Apply"
          onClick={confirmAndClose}
        />
      </StyledDateRangeCalendar>
      </ClickAwayListener>
    </LocalizationProvider>
  );
}