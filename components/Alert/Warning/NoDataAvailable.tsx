'use client';
import React from 'react';
import { Typography, Box } from '@mui/material';
import Lottie from 'lottie-react';
import emptyBox from '@/assets/lottie/empty_box.json';
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
      <Lottie
        height={height || 200}
        width={width || 200}
        animationData={emptyBox}
        loop
      />
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
