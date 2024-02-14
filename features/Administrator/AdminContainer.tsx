import React from 'react';
import { Box } from '@mui/material';
import { ChildrenProps } from '@/constants/types';

export const AdminContainer = ({ children }: ChildrenProps) => {
  return (
    <Box
      sx={{
        padding: '25px',
        marginTop: '5px',
      }}
    >
      {children}
    </Box>
  );
};
