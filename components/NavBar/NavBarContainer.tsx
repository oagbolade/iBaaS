'use client';
import { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from '@mui/material';
import { NavBarTitle } from '../Typography';
import InterSwitchImage from '@/assets/interswitch/image';
import NavBarButton from './NavBarButton';
import {
  NavTypography,
  navSettings,
  navbarCont,
  navbarStyle,
  navbarTitle,
} from './styles';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SettingsIcon, SignOutIcon } from '@/assets/svg';
import { StyledMenu } from '@/components/Table/StyledMenu';

export const NavBarContainer = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={navbarStyle}>
      <InterSwitchImage />
      <Box sx={navbarCont}>
        <Box sx={navbarTitle}>
          <NavBarTitle title="AA" />
        </Box>
        <Button onClick={handleClick}>
          <NavBarButton buttonTitle="Admin Admin" />
          <KeyboardArrowDownIcon
            sx={{ margin: '5px', width: '30px', height: '20px' }}
          />
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
    </Box>
  );
};
