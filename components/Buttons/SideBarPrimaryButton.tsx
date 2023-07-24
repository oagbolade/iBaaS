import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import colors from '@/assets/colors';

type Props = {
  buttonTitle: string;
  icon: any;
};

export default function SideBarPrimaryButton({ buttonTitle, icon }: Props) {
  return (
    <>
      <Box sx={{ marginTop: '3px' }}>{icon}</Box>
      <Typography
        sx={{
          backgroundColor: `${colors.lightGrey}`,
          fontFamily: 'Averta Regular',
        }}
        variant="subtitle1"
        ml={2}
      >
        {buttonTitle}
      </Typography>
    </>
  );
}
