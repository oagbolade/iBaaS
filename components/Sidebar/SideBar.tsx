'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';
import { SideBarContainer } from './SideBarContainer';
import { excludeFromSideBarLayout } from '@/constants/appRoutes';
import { useCurrentBreakpoint } from '@/utils/useCurrentBreakpoint';
import { hideScrollbar } from '@/utils/scrollBars';

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
    <Box
      sx={{
        display: shouldShowSideBar(),
        position: 'fixed',
        top: '100',
        zIndex: 3,
        height: '100%',
        ...hideScrollbar,
      }}
    >
      <SideBarContainer />
    </Box>
  );
};
