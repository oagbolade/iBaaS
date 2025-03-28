import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import {
  transactionVolumeStyle,
  allBranchesStyle
} from '@/features/Report/Overview/styles';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton
} from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';
import { labelTypography } from '@/components/FormikFields/styles';
import { inputFields } from '@/features/Report/CustomReport/style';
import {
  Wrapper,
  branchOptions,
  selectButton
} from '@/features/Report/CustomReport/IncomeAssuranceReport/FilterSection';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';

export const FilterSection = () => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Stack direction={setDirection()}>
        <Wrapper>
          <Typography sx={labelTypography}>Branch Name</Typography>
          <ActionButtonWithPopper
            searchGroupVariant="BasicSearchGroup"
            options={branchOptions}
            customStyle={{
              ...allBranchesStyle,
              ...selectButton
            }}
            icon={
              <ChevronDown
                color={`${colors.Heading}`}
                props={{
                  position: 'relative',
                  marginRight: '70px',
                  width: '12px',
                  height: '12px'
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
            customStyle={{
              width: setWidth(isMobile ? '240px' : '1100px')
            }}
          />
        </Box>
        <Box mt={4.5}>
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
