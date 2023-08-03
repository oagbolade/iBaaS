'use client'
import React from "react";
import Box from "@mui/material/Box";
import { SideBarContainer } from "./SideBarContainer";
import { usePathname } from 'next/navigation';

export const SideBar = () => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return;
  }

  return (
    <Box>
      <SideBarContainer />
    </Box>
  );
};
