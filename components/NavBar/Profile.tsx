'use client';
import React, { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { Box, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import {
  NavTypography,
  navSettings,
  navbarCont,
  navbarTitle,
  systemDateCont,
  systemDateTitle,
  systemDetails,
  profileTitle,
  NavChangePasswordTypography
} from './styles';
import { NavBarTitle, PageTitle } from '@/components/Typography';
import { DownIcon, SettingsIcon, SignOutIcon } from '@/assets/svg';
import { StyledMenu } from '@/components/Table/StyledMenu';
import { useAuth } from '@/api/auth/useAuth';
import { getStoredUser } from '@/utils/user-storage';
import { useGetSystemDate } from '@/api/general/useSystemDate';

const NavBarButton = dynamic(() => import('./NavBarButton'), { ssr: false });

export const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarInitials, setAvatarInitials] = useState<null | string>(null);
  const { sysmodel } = useGetSystemDate();
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { signout } = useAuth();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRedirect = () => {
    router.push('/admin/users/password/');
  };

  const formattedDate = new Date(
    sysmodel?.systemDate || dayjs().format()
  ).toDateString();

  const getInitials = (fullName: string): string => {
    if (!fullName) return '';

    const names = fullName.split(' ');
    if (names.length >= 2) {
      const firstInitial = names[0].charAt(0);
      const lastInitial = names[names.length - 1].charAt(0);
      return `${firstInitial}${lastInitial}`.toUpperCase();
    }

    return names[0].charAt(0).toUpperCase();
  };
  const loggedInUserId: string | undefined =
    getStoredUser()?.profiles?.userid?.toLowerCase();
  React.useEffect(() => {
    setAvatarInitials(getInitials(getStoredUser()?.fullName || '🚫'));
  }, []);
  return (
    <Box
      pt={{ mobile: 2, desktop: 0 }}
      ml={{ mobile: 3, desktop: 5 }}
      sx={navbarCont}
    >
      <Box sx={systemDateCont}>
        <Tooltip
          title={
            <Box sx={systemDetails}>
              <div style={{ color: 'black' }}>
                <strong style={profileTitle}>System Date:</strong>{' '}
                {formattedDate}
              </div>
              <div style={{ color: 'black' }}>
                <strong style={profileTitle}>Username:</strong>{' '}
                {sysmodel?.userName}
              </div>
              <div style={{ color: 'black' }}>
                <strong style={profileTitle}>Role:</strong> {sysmodel?.role}
              </div>
              <div style={{ color: 'black' }}>
                <strong style={profileTitle}>Approval Officer:</strong>{' '}
                {sysmodel?.approvingOfficer}
              </div>
              <div style={{ color: 'black' }}>
                <strong style={profileTitle}>System Phase:</strong>{' '}
                {sysmodel?.systemPhase}
              </div>
            </Box>
          }
          arrow
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px',
              marginBottom: '4px'
            }}
          >
            <PageTitle
              styles={{ ...systemDateTitle }}
              title={formattedDate || 'No Date'}
            />
          </Box>
        </Tooltip>
      </Box>
      <NavBarButton
        greeting={`Hi, ${getStoredUser()?.fullName || 'Oops!. Cannot find user name'}`}
        name={
          getStoredUser()?.profiles.userid || 'Oops!. Cannot find user name'
        }
      />
      <Box ml={3} sx={navbarTitle}>
        <NavBarTitle title={avatarInitials as string} />
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
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem sx={navSettings} onClick={handleClose}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText sx={NavTypography}>Settings</ListItemText>
        </MenuItem>
        {loggedInUserId && (
          <MenuItem sx={navSettings} onClick={handleClose}>
            <ListItemIcon>
              <Person2OutlinedIcon />
            </ListItemIcon>
            <ListItemText
              onClick={() => handleRedirect()}
              sx={NavChangePasswordTypography}
            >
              Change <br /> Password <br />
            </ListItemText>
          </MenuItem>
        )}
        <MenuItem sx={navSettings} onClick={handleClose}>
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText onClick={() => signout()} sx={NavTypography}>
            Sign Out
          </ListItemText>
        </MenuItem>
      </StyledMenu>
    </Box>
  );
};
