import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { allBranchesStyle } from '../../Overview/styles';
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
import { inputFields } from '@/features/Report/CustomReport/ChequeBook/style';
import { useSetDirection } from '@/utils/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';

export const FilterSection = () => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();

  return (
    <Box>
      <Stack direction={setDirection()} ml={{ mobile: 4, tablet: 0 }}>
        <Wrapper>
          <Typography sx={labelTypography}>Branch Name</Typography>
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
        <Wrapper>
          <Box mt={{ mobile: 1, desktop: 0 }}>
            <Typography sx={labelTypography}>Product</Typography>
            <ActionButtonWithPopper
              searchGroupVariant="BasicSearchGroup"
              options={branchOptions}
              customStyle={{ ...allBranchesStyle, ...selectButton }}
              icon={
                <ChevronDown
                  color={`${colors.Heading}`}
                  props={{ width: '12px', height: '12px' }}
                />
              }
              iconPosition="end"
              buttonTitle="Select"
            />
          </Box>
        </Wrapper>
        <Box mt={4.5} mr={4}>
          <TextInput
            name="Search"
            placeholder="Search"
            icon={<SearchIcon />}
            customStyle={{
              ...inputFields,
              width: setWidth(isMobile ? '240px' : '100%'),
            }}
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
