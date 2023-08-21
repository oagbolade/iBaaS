'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import { ChevronDown } from '@/assets/svg';
import { activeSideBar, mainMenu } from './styles';
import SideBarPrimaryButton from '@/components/Buttons/SideBarPrimaryButton';
import colors from '@/assets/colors';
import './App.css';

interface SubMenuItems {
  name: string;
  link: string;
}

interface SidebarMenuItem {
  name: string;
  groupPath: string;
  icon: any;
  subMenuItems: SubMenuItems[];
}

interface SidebarMenuProps {
  sideBarMenu: SidebarMenuItem[];
}

export default function SideBarDropdown({ sideBarMenu }: SidebarMenuProps) {
  const router = useRouter();
  const pathname: string | null = usePathname();
  const [expanded, setExpanded] = React.useState<string>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
    };
  const [activeMenu, setActiveMenu] = useState<string>('');

  const renderAsActive = (groupPath: string) => {
    if (pathname?.includes(groupPath)) {
      return {
        borderRadius: '8px',
        background: `${colors.neutral200}`,
        boxShadow:
          '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
      };
    }

    return { ...mainMenu };
  };
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
            expanded={expanded.includes(menuItem.groupPath)}
            onChange={handleChange(menuItem.groupPath)}
            sx={{
              backgroundColor: `${colors.lightGrey}`,
              padding: '3px 0',
            }}
          >
            <AccordionSummary
              sx={renderAsActive(menuItem.groupPath)}
              expandIcon={<ChevronDown />}
            >
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
                      component={Link}
                      href={subMenuItem.link}
                      key={subMenuItem.name}
                      style={{
                        backgroundColor:
                          activeMenu === subMenuItem.name
                            ? `${colors.activeBlue100}`
                            : '',
                        color:
                          activeMenu === subMenuItem.name
                            ? `${colors.activeBlue400}`
                            : '',
                      }}
                      sx={activeSideBar}
                      onClick={() => {
                        setActiveMenu(subMenuItem.name);
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
