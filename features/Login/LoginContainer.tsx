import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoginForm } from './LoginForm';
import { LoginBannerText } from './LoginBannerText';
import { LoginBanner } from '@/assets/images';

export const LoginContainer = () => {
  return (
    <Stack direction="row">
      <Box
        sx={{
          display: {
            desktop: 'block',
            tablet: 'none',
            mobile: 'none'
          }
        }}
      >
        <LoginBanner width="45vw" height="100vh" />
        <LoginBannerText />
      </Box>

      <Box>
        <LoginForm />
      </Box>
    </Stack>
  );
};
