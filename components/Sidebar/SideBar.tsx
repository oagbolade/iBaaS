'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import { SideBarContainer } from './SideBarContainer';
import { excludeFromSideBarLayout } from '@/constants/appRoutes';

export const SideBar = () => {
  const pathname: string | null = usePathname();

  if (excludeFromSideBarLayout.includes(pathname || '')) {
    return;
  }

  return (
    <Box>
      <SideBarContainer />
    </Box>
  );
};
