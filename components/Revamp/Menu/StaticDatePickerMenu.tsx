import React from 'react';
import dayjs from 'dayjs';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button, Menu } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { StyledTextInput } from '@/components/FormikFields/FormTextInput';

type Props = {
  desktopWidth?: string;
  label?: string;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  handleClick: Function;
};

export const StaticDatePickerMenu = ({
  label,
  desktopWidth,
  open,
  handleClose,
  handleClick,
  anchorEl
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const today = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        sx={{
          padding: '0',
          width: {
            mobile: '300px',
            tablet: '560px',
            desktop: desktopWidth || '560px'
          }
        }}
        onClick={(e) => {
          return handleClick(e);
        }}
      >
        <StyledTextInput>
          <TextInput
            customStyle={{
              width: setWidth(isMobile ? '300px' : desktopWidth || '560px')
            }}
            icon={<CalendarTodayOutlinedIcon />}
            iconPosition="end"
            name="datePicker"
            placeholder="Please Select"
            label={label || 'Posting Date'}
            disabled
          />{' '}
        </StyledTextInput>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <StaticDatePicker
          sx={{
            padding: '10px',
            '& .MuiPickersToolbar-root': {
              display: 'none'
            },
            width: { mobile: '300px', tablet: '560px' }
          }}
          defaultValue={today}
          onChange={handleClose}
        />
      </Menu>
    </LocalizationProvider>
  );
};
