import React, { useContext } from 'react';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import { Profile } from './Profile';
import { navbarStyle } from './styles';
import InterSwitchImage from '@/assets/interswitch/image';
import { NavBarContext } from '@/app/NavBarContext';
import colors from '@/assets/colors';

type Props = {
  toggleMenu: () => void;
};

export const NavBarContainer = ({ toggleMenu }: Props) => {
  const { pageTitle } = useContext(NavBarContext);

  return (
    <Box sx={navbarStyle}>
      <Box sx={{ width: '237px' }}>
        <Stack alignItems="center" spacing={2} direction="row">
          <IconButton onClick={toggleMenu}>
            <MenuIcon sx={{ display: { desktop: 'none' }, marginTop: '6px' }} />
          </IconButton>
          <Link href="/login">
            <InterSwitchImage />
          </Link>
        </Stack>
      </Box>

      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          borderLeft: `1px solid ${colors.neutral300}`,
          padding: '12px 25px',
          width: '85%',
        }}
      >
        <Box ml={2.5}>
          <Typography
            sx={{
              color: `${colors.neutral900}`,
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '32px',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
        <Box
          sx={{ display: { mobile: 'none', desktop: 'block', align: 'right' } }}
        >
          <Profile />
        </Box>
      </Stack>
    </Box>
  );
};
