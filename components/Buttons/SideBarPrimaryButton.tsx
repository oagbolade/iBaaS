import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import colors from '@/assets/colors';

type Props = {
  buttonTitle: string;
  icon: any;
  isActive?: boolean;
};

export default function SideBarPrimaryButton({
  isActive,
  buttonTitle,
  icon,
}: Props) {
  return (
    <>
      <Box sx={{ marginTop: '3px' }}>{icon}</Box>
      <Typography
        sx={{
          backgroundColor: `${isActive ? colors.neutral200 : colors.white}`,
          fontFamily: 'Averta Regular',
          fontSize: '15px',
          fontWeight: 400,
          color: `${colors.neutral700}`,
        }}
        ml={2}
        mt={0.3}
      >
        {buttonTitle}
      </Typography>
    </>
  );
}
