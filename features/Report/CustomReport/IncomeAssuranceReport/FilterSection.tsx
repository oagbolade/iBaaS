import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { transactionVolumeStyle } from '../../Overview/styles';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
} from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { transactionVolumeOptions } from '@/constants/Reports/selectOptions';
import { labelTypography } from '@/components/FormikFields/styles';

export const Wrapper = styled.section`
  margin-right: 20px;
  width: 120%;

  /* move the icon towards the end so it looks like a select */
  span {
    margin-left: 150px;
  }
`;

export const branchOptions = [
  'All',
  'ID-475747  Gbagada Branch',
  'ID-475748  Festac Branch',
  'ID-475749  Yaba Branch',
  'ID-475750  Coker Branch',
  'ID-475751  Somolu Branch',
];

export const selectButton = {
  width: '120%',
  height: '56px',
  marginTop: '10px',
  color: `${colors.neutral600}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
};

export const FilterSection = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item mobile={12} tablet={2} justifyContent="center">
          <Wrapper>
            <Typography sx={labelTypography}>Product</Typography>
            <ActionButtonWithPopper
              options={transactionVolumeOptions}
              customStyle={{ ...transactionVolumeStyle, ...selectButton }}
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
        </Grid>
        <Grid item mobile={12} tablet={3} justifyContent="center">
          <Box sx={{ width: '100%' }} mr={6}>
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
        </Grid>
        <Grid item mobile={12} tablet={6} justifyContent="center">
          <Box sx={{ width: '100%' }} mt={4.5} ml={4}>
            <TextInput
              name="Search"
              placeholder="Search by Name or Account Number"
              icon={<SearchIcon />}
              customStyle={{ width: '100%' }}
            />
          </Box>
        </Grid>
        <Grid item mobile={12} tablet={1} justifyContent="center">
          <Box sx={{ width: '100%' }} mt={4.5} ml={3}>
            <ActionButton
              customStyle={{
                backgroundColor: `${colors.activeBlue400}`,
                border: `1px solid ${colors.activeBlue400}`,
                color: `${colors.white}`,
              }}
              buttonTitle="Search"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
