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

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { mobile: 62, desktop: 0 },
        zIndex: 3,
        height: '100%',
        opacity: openMenu || isDesktop ? '1' : '0',
        transition: 'all 1s ease',
        visibility: openMenu || isDesktop ? 'visible' : 'hidden',
        ...hideScrollbar,
      }}
    >
      <SideBarContainer />
    </Box>
  );
};
