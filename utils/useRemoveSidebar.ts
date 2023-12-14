'use client';
import { usePathname } from 'next/navigation';
import { excludeFromSideBarLayout } from '@/constants/appRoutes';

export const useRemoveSideBar = () => {
  const pathname: string | null = usePathname();

  const margin = excludeFromSideBarLayout.includes(pathname || '')
    ? '0px'
    : '278px';

  return {
    marginLeft: margin,
    width: '100%',
  };
};
