import React from 'react';
import { Box, Stack } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, topFilterStyle, dateFilter } from './styles';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ChevronDown, ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import { allCategoryOptions } from '@/constants/Reports/selectOptions';

export const TopOverViewSection = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
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
      </Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
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
