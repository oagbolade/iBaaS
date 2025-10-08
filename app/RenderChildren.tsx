'use client';
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { usePathname } from 'next/navigation';
import { useRemoveSideBar } from '@/utils/hooks/useRemoveSidebar';
import { usePageTitle } from '@/utils/hooks/usePageTitle';
import { authGuard } from '@/utils/hooks/useAuthGuard';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import Footer from '@/components/Footer/Footer';
import { useTrackRecentlyVisitedModules } from '@/utils/hooks/useTrackRecentlyVisitedModules';
import {
  IRecentlyVisited,
  RECENTLY_VISITED_LOCALSTORAGE_KEY
} from '@/utils/user-storage';
import { TrackRecentlyVisitedModulesContext } from '@/context/TrackRecentlyVisitedModulesContext';
import { decryptData } from '@/utils/decryptData';
import { useNipAuthprovider } from '@/utils/hooks/NipAuthProvider/useNipAuthprovider';
import { useAuth } from '@/api/auth/useAuth';
import useIdleTimer from '@/utils/hooks/useIdleTimer';
import { useSingleTabSession } from '@/utils/useSessionTimeout';
import { DownloadReportContext } from '@/context/DownloadReportContext';

type Props = {
  children: React.ReactNode;
};

export const RenderChildren = ({ children }: Props) => {
  const pathname = usePathname();
  const toastActions = useContext(ToastMessageContext);
  const { setRecentlyVisitedModules } = useContext(
    TrackRecentlyVisitedModulesContext
  );
  const { setExportData } = useContext(DownloadReportContext);
  const { marginLeft, width } = useRemoveSideBar();
  const { pageTitle } = usePageTitle();

  // Check Auth Status every two seconds
  const TWO_SECONDS = 2000;

  setInterval(() => {
    authGuard(toastActions);
  }, TWO_SECONDS);

  useTrackRecentlyVisitedModules();

  const { signout } = useAuth();
  useIdleTimer(10 * 60 * 1000, signout, toastActions);

  useEffect(() => {
    // Reset context state on route change
    // to avoid data leaking between different reports
    setExportData([]);

    if (
      pathname?.includes('dashboard') &&
      sessionStorage.getItem('shouldRefreshDashboard')
    ) {
      sessionStorage.removeItem('shouldRefreshDashboard');
      window.location.reload();
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      const { localStorage } = require('reactive-localstorage'); // Dynamically import here
      localStorage.on('change', (key: any, value: any) => {
        if (key === RECENTLY_VISITED_LOCALSTORAGE_KEY) {
          const arrayOfModules = JSON.parse(
            decryptData(value as string) as string
          ) as IRecentlyVisited[];
          setRecentlyVisitedModules(arrayOfModules.reverse());
        }
      });
    }
  }, [setRecentlyVisitedModules]);

  useNipAuthprovider();
  useSingleTabSession(toastActions);
  return (
    <div
      style={{
        marginLeft,
        width,
        minWidth: 0,
        overflowX: 'auto',
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="IBaaS" content="IBaaS" />
      </Helmet>
      {children}
      <Footer />
    </div>
  );
};
