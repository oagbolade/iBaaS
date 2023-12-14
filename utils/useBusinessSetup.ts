'use client';
import { usePathname } from 'next/navigation';

export const useBusinessSetup = () => {
  const businessSetupPage = '/setup/business';
  const pathname: string | null = usePathname();

  return {
    isBusinessSetupPage: pathname === businessSetupPage,
  };
};
