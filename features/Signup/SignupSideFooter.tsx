import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { footerTextBox, signupSideFooterText } from './styles';

export const SignupSideFooter = () => {
  return (
    <Box sx={footerTextBox}>
      <MailOutlineOutlinedIcon
        style={{ color: 'white', width: '16px', height: '16px' }}
      />
      <Typography sx={signupSideFooterText}>
        <Link color="inherit" href="mailto:help@interswitch.com">
          help@interswitch.com
        </Link>
      </Typography>
    </Box>
  );
};
