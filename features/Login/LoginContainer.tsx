'use client';
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
import { getLastPage, getStoredUser } from '@/utils/user-storage';

export const LoginContainer = () => {
  // check if user is authenticated
  // redirect to dashboard if authenticated
  // else show login page
  if (typeof window !== 'undefined') {
    const token = getStoredUser()?.token;
    const lastPage = getLastPage();

    if (token) {
      window.location.href = lastPage || '/dashboard';
      return null;
    }
  } 

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        background: `${colors.neutral200}`,
        height: '100vh',
        padding: { xs: '10px', md: '30px 50px' },
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/** Show only LoginForm on mobile view */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <LoginForm />
      </Box>

      {/** Show banner and LoginForm on larger screens */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, marginRight: '80px' }}>
        <Box sx={bannerContainer}>
          <Box>
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

      <Box sx={{ display: { xs: 'none', md: 'block' }, ...loginContainer }}>
        <LoginForm />
      </Box>
    </Stack>
  );
};
