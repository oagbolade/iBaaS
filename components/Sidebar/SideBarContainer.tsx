"use client";
import React from "react";
import Box from "@mui/material/Box";
import SideBarDropdown from "./SideBarDropdown";
import {sideBarMenu} from "./sideBarMenu";
import {sideBarContainer} from "./styles";
import "./App.css";

export const SideBarContainer = () => {
  return (
    <Box
      sx={sideBarContainer}
    >
      <SideBarDropdown sideBarMenu={sideBarMenu} />
    </Box>
  );
};
