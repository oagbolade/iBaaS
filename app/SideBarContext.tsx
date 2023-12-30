'use client';
import { createContext, useMemo, useState } from 'react';

const initialSideBarContext = {
  openMenu: false,
  setOpenMenu: (open: boolean): void => {},
  toggleMenu: (): void => {},
};
type SideBarContextType = typeof initialSideBarContext;

export const SideBarContext = createContext<SideBarContextType>(
  initialSideBarContext,
);

export default function SideBarContextProvider({ children }: any) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const value: SideBarContextType = useMemo(() => {
    return { openMenu, toggleMenu, setOpenMenu };
  }, [toggleMenu]);

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
}
