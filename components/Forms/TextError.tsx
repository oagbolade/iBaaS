import React from 'react';
import Box from '@mui/material/Box';

interface Props {
    children: React.ReactNode;
}

export const TextError: React.FC<Props> = ({ children }) => {
  return <Box sx={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{children}</Box>;
};
