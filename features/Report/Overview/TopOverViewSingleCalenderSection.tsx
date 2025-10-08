import React from 'react';
import { Box, Stack } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DateCalendar } from '@mui/x-date-pickers';
import { exportData, dateFilter } from './styles';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

export const TopOverViewSingeCalendarSection = () => {
  const { setDirection } = useSetDirection();

  const { dateValue, setDateValue } = React.useContext(DateRangePickerContext);
  type Key = 'startDate';
  const handleDateChange = (newValue: any, key: Key) => {
    if (key === 'startDate') {
      setDateValue([newValue, dateValue[1]]);
    }
  };

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: '60px',
        zIndex: 3,
        backgroundColor: `${colors.white}`,
        borderLeft: `1px solid ${colors.loanTitleColor}`,
        borderBottom: '1px solid #E8E8E8',
        paddingLeft: '10px',
        paddingRight: '10px'
      }}
      direction={setDirection()}
      justifyContent="space-between"
    >
      <Box mt={2.3}>
        <BackButton />
      </Box>

      <Stack
        mt={1}
        direction={setDirection()}
        spacing={2}
        justifyContent="space-between"
      >
        <Box>
          <ActionButtonWithPopper
            searchGroupVariant="ExportReport"
            customStyle={{ ...exportData }}
            icon={<ExportIcon />}
            iconPosition="start"
            buttonTitle="Export Data"
          />
        </Box>

        <Box>
          <ActionButtonWithPopper
            searchGroupVariant="DateRangePicker"
            CustomDateRangePicker={
              <DateCalendar
                value={dateValue[0]}
                onChange={(newValue) => handleDateChange(newValue, 'startDate')}
              />
            }
            customStyle={{ ...dateFilter }}
            icon={
              <CalendarTodayOutlinedIcon
                sx={{
                  color: `${colors.Heading}`
                }}
              />
            }
            iconPosition="end"
            buttonTitle={dateValue[1]?.format('YYYY-MM-DD')}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
