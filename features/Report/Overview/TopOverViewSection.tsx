import React, { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, topFilterStyle, dateFilter } from './styles';
import {
  ActionButtonWithPopper,
  BackButton,
} from '@/components/Revamp/Buttons';
import { ChevronDown, ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { allCategoryOptions } from '@/constants/Reports/selectOptions';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  useBackButton?: boolean;
  CustomDateRangePicker?: React.ReactNode;
};

export const TopOverViewSection = ({
  useBackButton,
  CustomDateRangePicker,
}: Props) => {
  const { dateValue } = React.useContext(DateRangePickerContext);

  const formattedDateRange = useMemo(() => {
    const startMonthAndDay = `${dateValue?.[0]?.format('MMM') ?? ''} ${dateValue?.[0]?.format('DD') ?? ''}`;
    const endMonthAndDay = `${dateValue?.[1]?.format('MMM') ?? ''} ${dateValue?.[1]?.format('DD') ?? ''}`;

    return `${startMonthAndDay} - ${endMonthAndDay}`;
  }, [dateValue]);

  const { setDirection } = useSetDirection();

  return (
    <Stack
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#fff',
        borderBottom: useBackButton ? '1px solid #E8E8E8' : 'none',
        padding: '12px 20px',
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
          <ActionButtonWithPopper
            searchGroupVariant="CheckBoxSearchGroup"
            options={allCategoryOptions}
            customStyle={{ ...topFilterStyle }}
            icon={
              <ChevronDown
                color={`${colors.Heading}`}
                props={{ width: '14px', height: '14px' }}
              />
            }
            iconPosition="end"
            buttonTitle="All Category"
          />
        )}
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
            CustomDateRangePicker={CustomDateRangePicker}
            searchGroupVariant="DateRangePicker"
            customStyle={{ ...dateFilter }}
            icon={
              <CalendarTodayOutlinedIcon
                sx={{
                  color: `${colors.Heading}`,
                }}
              />
            }
            iconPosition="end"
            buttonTitle={formattedDateRange}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
