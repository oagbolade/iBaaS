'use client';
import React from 'react';
import Box from '@mui/material/Box';
import SideBarDropdown from './SideBarDropdown';
import { sideBarMenu } from './sideBarMenu';
import { sideBarContainer } from './styles';
import './App.module.css';
import { Profile } from '@/components/NavBar/Profile';

export const SideBarContainer = () => {
  return (
    <Box sx={sideBarContainer}>
      <Box
        sx={{
          display: { mobile: 'block', desktop: 'none' },
          marginBottom: '20px',
        }}
      >
        <Profile />
      </Box>
      <SideBarDropdown sideBarMenu={sideBarMenu} />
    </Box>
  );
};
