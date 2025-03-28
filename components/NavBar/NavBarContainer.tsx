import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import { Profile } from './Profile';
import { navbarStyle } from './styles';
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
        </Stack>
      </Box>

      <Stack
        alignItems="center"
        direction="row"
        justifyContent={{ mobile: 'flex-end', desktop: 'space-between' }}
        spacing={3}
        sx={{
          padding: '12px 25px',
          width: '85%'
        }}
      >
        <Box ml={{ mobile: 2.5, desktop: 0 }}>
          <Typography
            sx={{
              color: `${colors.neutral900}`,
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '32px'
            }}
          >
            {pageTitle}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            left: '65px',
            display: { mobile: 'none', desktop: 'block' }
          }}
        >
          <Profile />
        </Box>
      </Stack>
    </Box>
  );
};
