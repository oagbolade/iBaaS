import React from 'react';
import dayjs from 'dayjs';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Menu } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  handleClick: Function;
};

export const StaticDatePickerMenu = ({
  open,
  handleClose,
  handleClick,
  anchorEl,
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        sx={{ padding: '0', width: { mobile: '300px', tablet: '560px' } }}
        onClick={(e) => {
          return handleClick(e);
        }}
      >
        <TextInput
          customStyle={{
            width: setWidth(isMobile ? '300px' : '560px'),
          }}
          icon={<CalendarTodayOutlinedIcon />}
          iconPosition="end"
          name="datePicker"
          placeholder="Please Select"
          label="Posting Date"
          disabled
        />{' '}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <StaticDatePicker
          sx={{
            padding: '10px',
            '& .MuiPickersToolbar-root': {
              display: 'none',
            },
            width: { mobile: '300px', tablet: '560px' },
          }}
          defaultValue={dayjs('2022-04-17')}
          onChange={handleClose}
        />
      </Menu>
    </LocalizationProvider>
  );
};
