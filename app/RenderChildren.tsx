'use client';
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRemoveSideBar } from '@/utils/hooks/useRemoveSidebar';
import { SideBarContext } from '@/app/SideBarContext';
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

type Props = {
  children: React.ReactNode;
};

export const RenderChildren = ({ children }: Props) => {
  const toastActions = useContext(ToastMessageContext);
  const { setRecentlyVisitedModules } = useContext(
    TrackRecentlyVisitedModulesContext
  );
  const { marginLeft, width } = useRemoveSideBar();
  const { setOpenMenu } = useContext(SideBarContext);
  const { pageTitle } = usePageTitle();
  const handleClick = () => setOpenMenu(false);
  const onKeyPressHandler = () => {};

  // Check Auth Status every minute
  const ONE_MINUTE = 1 * 60 * 1000;

  setInterval(() => {
    authGuard(toastActions);
  }, ONE_MINUTE);

  useTrackRecentlyVisitedModules();

  const { signout } = useAuth();

  useIdleTimer(5 * 60 * 1000, signout, toastActions); // 5 minutes in milliseconds

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
  }, []);

  useNipAuthprovider();

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyUp={onKeyPressHandler}
      onClick={handleClick}
      style={{ marginLeft, width }}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="IBaaS" content="IBaaS" />
      </Helmet>
      {children}
      <Footer />
    </div>
  );
};
