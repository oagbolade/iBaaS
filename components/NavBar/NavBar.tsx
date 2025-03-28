'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { NavBarContainer } from './NavBarContainer';
import { excludeFromNavBarLayout } from '@/constants/appRoutes';

type Props = {
  toggleMenu: () => void;
};

export const NavBar = ({ toggleMenu }: Props) => {
  const pathname: string | null = usePathname();

  if (excludeFromNavBarLayout.includes(pathname || '')) {
    return;
  }

  return <NavBarContainer toggleMenu={toggleMenu} />;
};
