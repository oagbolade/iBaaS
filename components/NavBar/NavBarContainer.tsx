import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import InterSwitchImage from '@/assets/interswitch/image';
import { Profile } from './Profile';
import { navbarStyle } from './styles';

type Props = {
  toggleMenu: () => void;
};

export const NavBarContainer = ({ toggleMenu }: Props) => {
  return (
    <Box sx={navbarStyle}>
      <Stack alignItems="center" spacing={2} direction="row">
        <IconButton onClick={toggleMenu}>
          <MenuIcon sx={{ display: { desktop: 'none' }, marginTop: '6px' }} />
        </IconButton>
        <Link href="/login">
          <InterSwitchImage />
        </Link>
      </Stack>
      <Box sx={{ display: { mobile: 'none', desktop: 'block' } }}>
        <Profile />
      </Box>
    </Box>
  );
};
