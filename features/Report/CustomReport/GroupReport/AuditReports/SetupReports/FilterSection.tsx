import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { labelTypography } from '@/components/FormikFields/styles';
import { useSetDirection } from '@/utils/useSetDirection';

export const FilterSection = () => {
  const { setDirection } = useSetDirection();

  return (
    <Box>
      <Stack direction={setDirection()} ml={{ mobile: 4, tablet: 0 }}>
        <Box sx={{ width: '1200%' }} mt={4.5} mr={4}>
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
