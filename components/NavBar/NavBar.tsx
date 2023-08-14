'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavBarContainer } from './NavBarContainer';
import { excludeFromNavBarLayout } from '@/constants/appRoutes';

export const NavBar = () => {
  const pathname: string | null = usePathname();

  if (excludeFromNavBarLayout.includes(pathname || '')) {
    return;
  }

  return <NavBarContainer />;
};
