'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  bannerMainTitle,
  bannerSubtitle,
  bannerTitleContainer
} from './styles';

export const LoginBannerText = () => {
  return (
    <Box sx={bannerTitleContainer}>
      <Typography sx={bannerMainTitle}>
        One Platform, Infinite Banking Possibilities!
      </Typography>
      <Typography sx={bannerSubtitle}>
        Experience seamless banking with one powerful platform that delivers
        multiple functions effortlessly
      </Typography>
    </Box>
  );
};
