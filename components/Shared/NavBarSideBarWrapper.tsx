'use client';
import { useContext } from 'react';
import { SideBar } from '@/components/Sidebar/index';
import { NavBar } from '@/components/NavBar/index';
import { SideBarContext } from '@/app/SideBarContext';

export function NavBarSideBarWrapper() {
  const { openMenu, toggleMenu } = useContext(SideBarContext);

  return (
    <>
      <NavBar toggleMenu={toggleMenu} />
      <SideBar openMenu={openMenu} />
    </>
  );
}
