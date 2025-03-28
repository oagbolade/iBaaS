'use client';
import { usePathname } from 'next/navigation';
import { useCurrentBreakpoint } from './useCurrentBreakpoint';
import { excludeFromSideBarLayout } from '@/constants/appRoutes';

export const useRemoveSideBar = () => {
  const pathname: string | null = usePathname();
  const { isMobile } = useCurrentBreakpoint();

  const margin =
    excludeFromSideBarLayout.includes(pathname || '') || isMobile
      ? '0px'
      : '278px';

  return {
    marginLeft: margin,
    width: '100%'
  };
};
