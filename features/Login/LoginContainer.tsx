import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoginBanner } from '@/assets/images';
import { LoginForm } from './LoginForm';
import { LoginBannerText } from './LoginBannerText';

export const LoginContainer = () => {
  return (
    <Stack direction="row">
      <Box>
        <LoginForm />
      </Box>
      <Box
        sx={{
          display: {
            desktop: 'block',
            tablet: 'none',
            mobile: 'none',
          },
        }}
      >
        <LoginBanner width="45vw" height="100vh" />
        <LoginBannerText />
      </Box>
    </Stack>
  );
};
