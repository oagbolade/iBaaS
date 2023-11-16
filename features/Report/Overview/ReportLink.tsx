import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import colors from '@/assets/colors';

type Props = {
  link: string;
};

export const ReportLink = ({ link }: Props) => {
  return (
    <Link href={link}>
      <Typography
        sx={{
          color: `${colors.activeBlue400}`,
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
          float: 'right',
          position: 'relative',
          bottom: '40px',
        }}
      >
        See full report{' '}
        <ArrowForwardIcon
          sx={{ width: '16px', height: '16px', marginBottom: '3px' }}
        />
      </Typography>
    </Link>
  );
};
