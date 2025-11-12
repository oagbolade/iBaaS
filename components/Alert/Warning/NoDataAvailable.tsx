'use client';
import React from 'react';
import { Typography, Box } from '@mui/material';
import colors from '@/assets/colors';

type Props = {
  message: string;
  height?: number;
  width?: number;
};

export const NoDataAvailable = ({ message, height, width }: Props) => {
  return (
    <Box
      mb={3}
      sx={{
        width: '200px',
        height: '200px',
        margin: '0px auto'
      }}
    >
      <Typography
        sx={{
          textAlign: 'center',
          color: `${colors.neutral700}`,
          width: '100%',
          textWrap: 'wrap'
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};
