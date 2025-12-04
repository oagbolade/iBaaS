import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter } from './styles';
import {
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  useBackButton?: boolean;
  CustomDateRangePicker?: React.ReactNode;
  showDatePicker?: boolean;
};

export const TopOverView = ({
  useBackButton,
  CustomDateRangePicker,
  showDatePicker = true
}: Props) => {
  const { dateValue } = React.useContext(DateRangePickerContext);

  const formattedDateRange = useMemo(() => {
    const startMonthDayYear = `${dateValue?.[0]?.format('MMM DD, YYYY') ?? ''}`;
    const endMonthDayYear = `${dateValue?.[1]?.format('MMM DD, YYYY') ?? ''}`;

    return `${startMonthDayYear} - ${endMonthDayYear}`;
  }, [dateValue]);

  const { setDirection } = useSetDirection();

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: '60px',
        zIndex: 3,
        backgroundColor: `${colors.white}`,
        borderBottom: useBackButton
          ? `1px solid ${colors.loanTitleColor}`
          : 'none',
        paddingLeft: '10px',
        paddingRight: '10px'
      }}
      direction={setDirection()}
      justifyContent="space-between"
    >
      <Box>
        {useBackButton ? (
          <Box mt={2.3}>
            <BackButton />
          </Box>
        ) : (
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
              {showDatePicker ? (
                <ActionButtonWithPopper
                  CustomDateRangePicker={CustomDateRangePicker}
                  searchGroupVariant="DateRangePicker"
                  customStyle={{ ...dateFilter }}
                  icon={
                    <CalendarTodayOutlinedIcon
                      sx={{
                        color: `${colors.Heading}`
                      }}
                    />
                  }
                  iconPosition="end"
                  buttonTitle={formattedDateRange}
                />
              ) : null}
            </Box>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};
