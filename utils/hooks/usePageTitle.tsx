'use client';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { usePathname } from 'next/navigation';
import { sideBarMenu } from '@/components/Sidebar/sideBarMenu';
import { environment } from '@/axiosInstance';

const flatModules = ['/requests', '/requests/']; // Modules without a dropdown

const flatModulesMapper: Record<string, string> = {
  '/requests': 'Requests',
  '/requests/': 'Requests'
};

export const usePageTitle = () => {
  const mapped = _.map(sideBarMenu, _.partialRight(_.pick, ['subMenuItems']));
  const pathname: string | null = usePathname();
  const [pageTitle, setPageTitle] = useState<string>('IBaaS');

  useEffect(() => {
    if (flatModules.includes(pathname)) {
      setPageTitle(flatModulesMapper[pathname]);
      return;
    }

    mapped.forEach(({ subMenuItems }: any): void => {
      const selectPathName =
        environment === 'development' ? `${pathname}/` : pathname;

      const items = subMenuItems.filter(
        (item: { link: string }) => item.link === selectPathName
      );

      if (items.length > 0) {
        setPageTitle(items[0].name);
      }
    });
  }, [pathname]);

  return {
    pageTitle,
    setPageTitle
  };
};
