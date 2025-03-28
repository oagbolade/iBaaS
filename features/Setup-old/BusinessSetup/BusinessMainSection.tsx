import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { primaryTitle, secondaryTitle } from './styles';

export const BusinessMainSection = () => {
  return (
    <Box sx={{ width: '100%', marginTop: '80px' }}>
      <Typography sx={primaryTitle}>Hi Ayobami,</Typography>
      <Typography sx={secondaryTitle}>Let's setup the business</Typography>
    </Box>
  );
};
