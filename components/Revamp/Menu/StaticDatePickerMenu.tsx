import React from 'react';
import dayjs from 'dayjs';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NestedMenuItem } from 'mui-nested-menu';
import { Button, Menu } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { SearchLoanFilters } from './SearchLoanFilters';
import { TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export const StaticDatePickerMenu = ({
  open,
  handleClose,
  handleClick,
  anchorEl,
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button sx={{ padding: '0' }} onClick={(e) => {return handleClick(e);}}>
        <TextInput
          customStyle={{
            width: setWidth('560px'),
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
          }}
          defaultValue={dayjs('2022-04-17')}
        />
      </Menu>
    </LocalizationProvider>
  );
};
