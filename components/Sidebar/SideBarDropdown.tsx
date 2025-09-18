'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import { comingSoon, sideBarItem } from './styles';
import styles from './App.module.css';
import { ChevronDown } from '@/assets/svg';
import SideBarPrimaryButton from '@/components/Buttons/SideBarPrimaryButton';
import colors from '@/assets/colors';
import { renderAsActive } from '@/utils/renderActiveSideMenu';
import { shouldDisableMenuItem } from '@/utils/checkUserRoleAccess';

interface SubMenuItems {
  name: string;
  link: string;
  hideSubMenuItem: boolean;
}

export interface SidebarMenuItem {
  name: string;
  groupPath: string;
  icon: any;
  subMenuItems: SubMenuItems[];
  hideMenuItem: boolean;
}

export interface SidebarMenuProps {
  sideBarMenu: SidebarMenuItem[];
  setIsAccordionOpen?: (isOpen: boolean) => void;
}

function ComingSoon({ menuName }: { menuName: string }) {
  const comingSoonItems = ['Overview'];

  if (comingSoonItems.includes(menuName)) {
    return (
      <span style={comingSoon}>
        Coming soon
      </span>
    );
  }
}

export default function SideBarDropdown({
  sideBarMenu,
  setIsAccordionOpen
}: SidebarMenuProps) {
  const mapped = _.map(sideBarMenu, _.partialRight(_.pick, ['subMenuItems']));
  const pathname: string | null = usePathname();
  const defaultExpanded = pathname;
  const defaultActive = process.env.DEFAULT_ACTIVE_MENU || '';
  const [expanded, setExpanded] = React.useState<string>(defaultExpanded);
  const [activeMenu, setActiveMenu] = useState<string>(defaultActive);

  useEffect(() => {
    mapped.forEach(({ subMenuItems }: any): void => {
      const items = subMenuItems.filter((item: { link: string }) => {
        return item.link === pathname;
      });
      if (items.length > 0) {
        setActiveMenu(items[0].name);
      }
    });
  }, [pathname]);

  const handleChange = (panel: string) => {
    return (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '');
      if (typeof setIsAccordionOpen === 'function') {
        setIsAccordionOpen(isExpanded); // ✅ update parent
      }
    };
  };

  const RenderMenuItems = () => {
    const items = sideBarMenu.map((menuItem) => {
      const hasSubItems = menuItem.subMenuItems.length > 0;
      if (menuItem.hideMenuItem) return;

      if (!hasSubItems) {
        return (
          <Button
            key={menuItem.name}
            sx={{
              padding: '0'
            }}
            onClick={() => setActiveMenu(menuItem.name)}
            disabled={shouldDisableMenuItem(menuItem.name)}
          >
            <SideBarPrimaryButton
              isActive={activeMenu === menuItem.name}
              hasSubItems={hasSubItems}
              buttonTitle={menuItem.name}
              link={menuItem.groupPath}
              icon={<menuItem.icon />}
            />
          </Button>
        );
      }
      return (
        <Box
          key={menuItem.name}
          sx={{
            backgroundColor: `${colors.white}`
          }}
        >
          <Accordion
            expanded={expanded.includes(menuItem.groupPath)}
            onChange={handleChange(menuItem.groupPath)}
            className={styles.MuiPaperElevation}
            sx={{
              backgroundColor: `${colors.white}`
            }}
          >
            <AccordionSummary expandIcon={hasSubItems && <ChevronDown />}>
              <SideBarPrimaryButton
                hasSubItems={hasSubItems}
                buttonTitle={menuItem.name}
                link={menuItem.groupPath}
                icon={<menuItem.icon />}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Stack ml={3} spacing={2} direction="column">
                {menuItem.subMenuItems.map((subMenuItem: { link: string, name: string }) => {
                  return (
                    <Button
                      component={Link}
                      href={subMenuItem.link}
                      key={subMenuItem.name}
                      style={renderAsActive(activeMenu === subMenuItem.name)}
                      sx={sideBarItem}
                      onClick={() => {
                        setActiveMenu(subMenuItem.name);
                      }}
                      disabled={shouldDisableMenuItem(subMenuItem.name)}
                    >
                      {subMenuItem.name}
                      <ComingSoon menuName={subMenuItem.name} />
                    </Button>
                  );
                })}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{items}</>;
  };

  return <RenderMenuItems />;
}
