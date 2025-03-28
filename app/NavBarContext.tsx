'use client';
import { createContext, useMemo } from 'react';
import { usePageTitle } from '@/utils/hooks/usePageTitle';

const initialNavBarContext = {
  pageTitle: ''
};
type NavBarContextType = typeof initialNavBarContext;

export const NavBarContext =
  createContext<NavBarContextType>(initialNavBarContext);

export default function NavBarContextProvider({ children }: any) {
  const { pageTitle } = usePageTitle();

  const value: NavBarContextType = useMemo(() => {
    return { pageTitle };
  }, [pageTitle]);

  return (
    <NavBarContext.Provider value={value}>{children}</NavBarContext.Provider>
  );
}
