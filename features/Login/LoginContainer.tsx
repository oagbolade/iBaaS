import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {LoginBanner} from '@/assets/images';

export const LoginContainer = () => {
  return (
    <Stack direction="row">
      <Box>Form</Box>
      <Box><LoginBanner /></Box>
    </Stack>
  );
};
