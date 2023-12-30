import React from 'react';
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
import { useSetDirection } from '@/utils/useSetDirection';

type Props = {
  useBackButton?: boolean;
};

export const TopOverViewSection = ({ useBackButton }: Props) => {
  const { setDirection } = useSetDirection();

  return (
    <Stack
      sx={{
        borderBottom: `${useBackButton ? '1px solid #E8E8E8' : 'none'}`,
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
            buttonTitle="Aug 22 - Sep 23"
          />
        </Box>
      </Stack>
    </Stack>
  );
};
