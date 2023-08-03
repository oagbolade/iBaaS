import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  bannerMainTitle,
  bannerSubtitle,
  bannerTitleContainer,
} from './styles';

export const LoginBannerText = () => {
  return (
    <Box sx={bannerTitleContainer}>
      <Typography sx={bannerMainTitle}>
        One Platform. Multiple Functions
      </Typography>
      <Typography sx={bannerSubtitle}>
        Say hello to various services, features, and functions of multiple
        mobile apps in a single app
      </Typography>
    </Box>
  );
};
