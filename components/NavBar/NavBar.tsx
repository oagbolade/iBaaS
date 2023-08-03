'use client'
import React from 'react'
import { NavBarContainer } from './NavBarContainer';
import { usePathname } from 'next/navigation';

export const NavBar = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return;
  }

  return (  
       <NavBarContainer />
  )
}

