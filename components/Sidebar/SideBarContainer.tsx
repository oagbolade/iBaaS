'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Link from 'next/link';
import SideBarDropdown from './SideBarDropdown';
import { sideBarMenu } from './sideBarMenu';
import { sideBarContainer } from './styles';
import './App.module.css';
import { Profile } from '@/components/NavBar/Profile';
import InterSwitchImage from '@/assets/interswitch/image';
import colors from '@/assets/colors';

export const SideBarContainer = () => {
  const pathname: string | null = usePathname();
  const customReportPage = '/report/custom-report';

  const setHeight = {
    height: `${pathname === customReportPage ? '420vh' : '100vh'}`,
  };

  return (
    <>
      <Box
        py={1.5}
        ml={5}
        sx={{
          borderRight: `1px solid ${colors.neutral300}`,
          display: { mobile: 'none', desktop: 'block' },
        }}
      >
        <Link href="/login">
          <InterSwitchImage />
        </Link>
      </Box>
      <Box sx={{ ...sideBarContainer, ...setHeight }}>
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
    </>
  );
};
