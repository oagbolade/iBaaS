import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { allBranchesStyle } from '@/features/Report/Overview/styles';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
} from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { labelTypography } from '@/components/FormikFields/styles';
import {
  Wrapper,
  branchOptions,
  selectButton,
} from '@/features/Report/CustomReport/ChartAccount/FilterSection';
import { inputFields } from '@/features/Report/CustomReport/DrillDown/style';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { useSetDirection } from '@/utils/useSetDirection';

export const RadioOption = [
  { value: 'mainAction', label: 'Trial Balance' },
  { value: 'profit', label: 'Profit & Loss ' },
];

export const FilterSection = () => {
  const { setDirection } = useSetDirection();

  return (
    <Box>
      <Stack direction={setDirection()}>
        <Box>
          <RadioButtons
            options={RadioOption}
            title="Select Report Type"
            value="mainAction"
            name="reportType"
          />
        </Box>
        <Wrapper>
          <Typography sx={labelTypography}>Branch ID</Typography>
          <ActionButtonWithPopper
            searchGroupVariant="BasicSearchGroup"
            options={branchOptions}
            customStyle={{
              ...allBranchesStyle,
              ...selectButton,
            }}
            icon={
              <ChevronDown
                color={`${colors.Heading}`}
                props={{
                  position: 'relative',
                  marginRight: '70px',
                  width: '12px',
                  height: '12px',
                }}
              />
            }
            iconPosition="end"
            buttonTitle="Select"
          />
        </Wrapper>

        <Box mt={4.5} mr={4}>
          <TextInput
            name="Search"
            placeholder="Search"
            icon={<SearchIcon />}
            customStyle={{ ...inputFields }}
          />
        </Box>
        <Box mt={4.5}>
          <ActionButton
            customStyle={{
              backgroundColor: `${colors.activeBlue400}`,
              border: `1px solid ${colors.activeBlue400}`,
              color: `${colors.white}`,
            }}
            buttonTitle="Search"
          />
        </Box>
      </Stack>
    </Box>
  );
};
