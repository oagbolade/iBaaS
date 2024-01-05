import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import {
  transactionVolumeStyle,
  allBranchesStyle,
} from '../../Overview/styles';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
} from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';
import { labelTypography } from '@/components/FormikFields/styles';
import { inputFields } from '@/features/Report/CustomReport/style';
import { useSetDirection } from '@/utils/useSetDirection';

export const selectButton = {
  width: '270%',
  height: '56px',
  marginTop: '10px',
  color: `${colors.neutral600}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
};
export const branchOptions = [
  'All',
  'ID-475747  Gbagada Branch',
  'ID-475748  Festac Branch',
  'ID-475749  Yaba Branch',
  'ID-475750  Coker Branch',
  'ID-475751  Somolu Branch',
];

export const Wrapper = styled.section`
  margin-right: 20px;
  /* move the icon towards the end so it looks like a select */
  span {
    margin-left: 150px;
  }
`;

export const FilterSection = () => {
  const { setDirection } = useSetDirection();
  return (
    <Box>
      <Stack direction={setDirection()} ml={{ mobile: 9, tablet: 0 }}>
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
