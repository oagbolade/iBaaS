import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { labelTypography } from '@/components/FormikFields/styles';

export const FilterSection = () => {
  return (
    <Box>
      <Stack direction="row">
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

        <Box sx={{ width: '780%' }} mt={4.5} mr={4}>
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

        <Box sx={{ width: '100%' }} mt={9}>
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
