"use client";
import React from "react";
import Box from "@mui/material/Box";
import colors from "@/assets/colors";
import SideBarDropdown from "./SideBarDropdown";
import {sideBarMenu} from "./sideBarMenu";
import "./App.css";

export const SideBarContainer = () => {
  return (
    <Box
      sx={{
        width: 278,
        height: "100vh",
        padding: "0 20px",
        float: "left",
        backgroundColor: `${colors.lightGrey}`,
        "&:hover": {
          boxShadow: 2,
        },
      }}
    >
      <SideBarDropdown sideBarMenu={sideBarMenu} />
    </Box>
  );
};
