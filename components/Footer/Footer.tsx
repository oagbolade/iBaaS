'use client';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { usePathname } from 'next/navigation';
import { footerStyles, footerTextStyles } from './styles';
import { InterSwitchImage } from '@/assets/interswitch/image';

const Footer = () => {
  const router = usePathname();

  if (router.includes('login') || router.includes('signup')) {
    return;
  }

  return (
    <Box sx={{ marginTop: '250px' }}>
      <Box sx={footerStyles}>
        <Typography sx={footerTextStyles}>
          Copyright © Interswitch Limited. All Rights Reserved.
        </Typography>
        <InterSwitchImage />
      </Box>
    </Box>
  );
};

export default Footer;
