'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import { SideBarContainer } from './SideBarContainer';
import { excludeFromSideBarLayout } from '@/constants/appRoutes';
import { useCurrentBreakpoint } from '@/utils/useCurrentBreakpoint';

type Props = {
  openMenu: boolean;
};

export const SideBar = ({ openMenu }: Props) => {
  const pathname: string | null = usePathname();
  const { isDesktop } = useCurrentBreakpoint();

  if (excludeFromSideBarLayout.includes(pathname || '')) {
    return;
  }

  const shouldShowSideBar = () => {
    if (openMenu || isDesktop) return 'block';
    return 'none';
  };

  return (
    <Box sx={{ display: shouldShowSideBar() }}>
      <SideBarContainer />
    </Box>
  );
};
