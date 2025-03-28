import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { labelTypography } from '@/components/FormikFields/styles';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeStyle } from '@/features/Report/Overview/styles';
import {
  Wrapper,
  selectButton
} from '@/features/Report/CustomReport/IncomeAssuranceReport/FilterSection';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';
import { useSetDirection } from '@/utils/hooks/useSetDirection';

export const FilterSection = () => {
  const { setDirection } = useSetDirection();

  return (
    <Box>
      <Stack direction={setDirection()} ml={{ mobile: 4, tablet: 0 }}>
        <Box sx={{ width: '350%' }} mt={4.5} mr={4}>
          <Typography sx={{ ...labelTypography, marginBottom: '10px' }}>
            Select Branch
          </Typography>
          <TextInput
            customStyle={{ width: '100%' }}
            name="Search"
            placeholder="Search Branch ID"
            icon={<SearchIcon />}
          />
        </Box>

        <Box sx={{ width: '150%' }} mt={4.5} mr={2}>
          <Wrapper>
            <Typography sx={labelTypography}>Product</Typography>
            <ActionButtonWithPopper
              options={transactionVolumeOptions}
              customStyle={{
                ...transactionVolumeStyle,
                ...selectButton,
                width: '100%'
              }}
              icon={
                <ChevronDown
                  color={`${colors.Heading}`}
                  props={{ width: '12px', height: '12px' }}
                />
              }
              iconPosition="end"
              buttonTitle="Select action"
            />
          </Wrapper>
        </Box>

        <Box sx={{ width: '500%' }} mt={4.5} mr={4}>
          <Typography sx={{ ...labelTypography, marginBottom: '10px' }}>
            Search
          </Typography>
          <TextInput
            customStyle={{ width: '100%' }}
            name="Search"
            placeholder="Search"
            icon={<SearchIcon />}
          />
        </Box>

        <Box sx={{ width: '100%' }} mt={9} ml={2}>
          <ActionButton
            customStyle={{
              backgroundColor: `${colors.activeBlue400}`,
              border: `1px solid ${colors.activeBlue400}`,
              color: `${colors.white}`
            }}
            buttonTitle="Search"
          />
        </Box>
      </Stack>
    </Box>
  );
};
