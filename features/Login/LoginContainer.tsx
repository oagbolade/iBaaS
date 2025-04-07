import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoginForm } from './LoginForm';
import {
  bankTitle,
  bannerContainer,
  bannerTitle,
  loginContainer,
  loginIbaas,
  platformTitle
} from './styles';
import { PageTitle } from '@/components/Typography';
import { InterSwitchImage } from '@/assets/interswitch/image';
import colors from '@/assets/colors';

export const LoginContainer = () => {
  return (
    <Stack
      direction="row"
      sx={{
        background: `${colors.neutral200}`,
        height: '860px',
        padding: '49px 150px'
      }}
    >
      <Box sx={loginContainer}>
        <Box sx={bannerContainer}>
          <Box
            sx={{
              marginTop: '60px'
            }}
          >
            <InterSwitchImage />
            <PageTitle title="IBaaS" styles={loginIbaas} />
          </Box>
          <Box sx={bannerTitle}>
            <PageTitle
              title="One Platform. Infinite Banking Possibilities"
              styles={platformTitle}
            />
            <PageTitle
              title="Experience seamless banking with one powerful platform that delivers multiple capabilities effortlessly"
              styles={bankTitle}
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <LoginForm />
      </Box>
    </Stack>
  );
};
