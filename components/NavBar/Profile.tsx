'use client';
import { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import NavBarButton from './NavBarButton';
import { NavTypography, navSettings, navbarCont, navbarTitle } from './styles';
import { NavBarTitle } from '@/components/Typography';
import { DownIcon, SettingsIcon, SignOutIcon } from '@/assets/svg';
import { StyledMenu } from '@/components/Table/StyledMenu';

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box ml={5} sx={navbarCont}>
      <NavBarButton greeting="Hi, Omodayo" name="Omodayo.Oluwa..." />
      <Box ml={3} sx={navbarTitle}>
        <NavBarTitle title="AA" />
      </Box>
      <Button sx={{ padding: '0' }} onClick={handleClick}>
        <DownIcon />
      </Button>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem sx={navSettings} onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText sx={NavTypography}>Settings</ListItemText>
        </MenuItem>

        <MenuItem sx={navSettings} onClick={handleClose}>
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText sx={NavTypography}>Sign Out</ListItemText>
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
