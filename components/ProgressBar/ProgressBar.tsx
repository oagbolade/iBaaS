'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
  progress: number;
};

export const ProgressBar = ({ progress }: Props) => {
  return (
    <Box sx={{ width: '100%', position: 'sticky', top: 60 }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
