"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import colors from "@/assets/colors";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "@/assets/svg";
import { activeSideBar, mainMenu } from "./styles";
import SideBarPrimaryButton from "@/components/Buttons/SideBarPrimaryButton";
import { handleRedirect } from "@/services";
import "./App.css";

interface SubMenuItems {
  name: string;
  link: string;
}

interface SidebarMenuItem {
  name: string;
  icon: any;
  subMenuItems: SubMenuItems[];
}

interface SidebarMenuProps {
  sideBarMenu: SidebarMenuItem[];
}

export default function SideBarDropdown({ sideBarMenu }: SidebarMenuProps) {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string>("Manage Users");

  const RenderMenuItems = () => {
    const items = sideBarMenu.map((menuItem) => {
      return (
        <Box
          key={menuItem.name}
          sx={{
            backgroundColor: `${colors.lightGrey}`,
          }}
        >
          <Accordion
            sx={{
              backgroundColor: `${colors.lightGrey}`,
              padding: "3px 0",
            }}
          >
            <AccordionSummary sx={mainMenu} expandIcon={<ChevronDown />}>
              <SideBarPrimaryButton
                buttonTitle={menuItem.name}
                icon={<menuItem.icon />}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2} direction="column">
                {menuItem.subMenuItems.map((subMenuItem) => {
                  return (
                    <Button
                      key={subMenuItem.name}
                      style={{
                        backgroundColor:
                          activeMenu === subMenuItem.name
                            ? `${colors.activeBlue100}`
                            : "",
                 
                            color:
                          activeMenu === subMenuItem.name
                            ? `${colors.activeBlue400}`
                            : "",
                      }}
                      sx={activeSideBar}
                      onClick={() => {
                          setActiveMenu(subMenuItem.name);
                          handleRedirect( router, subMenuItem.link);
                      }}
                    >
                      {subMenuItem.name}
                    </Button>
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });

    return <>{items}</>;
  };

  return <RenderMenuItems />;
}
