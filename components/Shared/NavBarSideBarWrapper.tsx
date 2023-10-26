'use client';
import { useState } from 'react';
import { SideBar } from '@/components/Sidebar/index';
import { NavBar } from '@/components/NavBar/index';

export function NavBarSideBarWrapper() {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <NavBar toggleMenu={toggleMenu} />
      <SideBar openMenu={openMenu} />
    </>
  );
}
