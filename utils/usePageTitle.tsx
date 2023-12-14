'use client';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { usePathname } from 'next/navigation';
import { sideBarMenu } from '@/components/Sidebar/sideBarMenu';

export const usePageTitle = () => {
  const mapped = _.map(sideBarMenu, _.partialRight(_.pick, ['subMenuItems']));
  const pathname: string | null = usePathname();
  const [pageTitle, setPageTitle] = useState<string>('Demo');

  useEffect(() => {
    mapped.forEach(({ subMenuItems }: any): void => {
      const items = subMenuItems.filter(
        (item: { link: string }) => item.link === pathname,
      );
      if (items.length > 0) {
        setPageTitle(items[0].name);
      }
    });
  }, [pathname]);

  return {
    pageTitle,
    setPageTitle,
  };
};
