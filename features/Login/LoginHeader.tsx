import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { mainTitle, subTitle } from './styles';

export const LoginHeader = () => {
  return (
    <Box
      sx={{
        margin: '120px 0 30px 0',
        width: '208px',
        height: '72px',
      }}
    >
      <Typography sx={mainTitle}>Log In</Typography>
      <Typography sx={subTitle}>Log in to access dashboard</Typography>
    </Box>
  );
};
