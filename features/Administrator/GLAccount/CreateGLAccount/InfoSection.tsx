import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Stack, Typography } from '@mui/material';
import colors from '@/assets/colors';

export const InfoSection = () => {
  return (
    <Stack
      mt={4}
      direction="row"
      alignContent="center"
      sx={{
        width: '100%',
        height: '64px',
        padding: '12px 16px',
        borderRadius: '8px',
        border: `1px solid ${colors.neutral300}`,
        background: `${colors.lightGrey}`,
      }}
    >
      <InfoOutlinedIcon
        sx={{
          color: `${colors.primaryBlue}`,
        }}
      />
      <Typography
        ml={1}
        mt={0.3}
        sx={{
          width: '200px',
          color: `${colors.neutral900}`,
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      >
        System Posting Account incudes all Customer Account Related General
        Ledgers
      </Typography>
    </Stack>
  );
};
