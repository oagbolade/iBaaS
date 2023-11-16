import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import colors from '@/assets/colors';

type Props = {
  buttonTitle: string;
  icon: any;
  isActive?: boolean;
  hasSubItems?: boolean;
  link?: string;
};

export default function SideBarPrimaryButton({
  isActive,
  buttonTitle,
  icon,
  link,
  hasSubItems,
}: Props) {
  return (
    <>
      {hasSubItems && (
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
      )}

      {!hasSubItems && (
        <>
          <Box sx={{ marginTop: '3px' }}>{icon}</Box>
          <Typography
            component={Link}
            href={link || ''}
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
      )}
    </>
  );
}
