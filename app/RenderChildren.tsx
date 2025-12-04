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
import { environment } from '@/axiosInstance';

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
  useIdleTimer(5 * 60 * 1000, signout, toastActions);
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

  useEffect(() => {
    // Block right-click context menu
    let blockInspect = false;

    if (typeof window !== 'undefined') {
      if (process.env.NODE_ENV === 'production') {
        blockInspect =
          window.RUNTIME_CONFIG?.NEXT_PUBLIC_BLOCK_INSPECT === 'true';
      }

      if (process.env.NODE_ENV !== 'production') {
        blockInspect = process.env.NEXT_PUBLIC_BLOCK_INSPECT === 'true';
      }
    }
    const isBlockInspectionRequired = !blockInspect;
    if (isBlockInspectionRequired) return;
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    // Block text selection, copy/paste
    document.addEventListener('selectstart', (e) => e.preventDefault());
    document.addEventListener('copy', (e) => e.preventDefault());
    document.addEventListener('paste', (e) => e.preventDefault());
    document.addEventListener('cut', (e) => e.preventDefault());
    // Block DevTools shortcuts
    const blockedKeys = [
      'F12', // DevTools
      'KeyI', // Ctrl+Shift+I
      'KeyJ', // Ctrl+Shift+J (Console)
      'KeyU' // Ctrl+U (View Source)
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+Shift + blocked key
      if (e.ctrlKey && e.shiftKey && blockedKeys.includes(e.code)) {
        e.preventDefault();
        return false;
      }
      // Also block F12 alone
      if (e.code === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Detect if DevTools is open (hacky but works ~80% of time)
    let devtoolsOpen = false;
    const threshold = 160; // Adjust based on your layout

    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const newDevtoolsOpen = widthDiff > threshold || heightDiff > threshold;

      if (newDevtoolsOpen && !devtoolsOpen) {
        // DevTools just opened - redirect or alert
        alert('DevTools detected!'); // Or window.location.href = '/blocked';
      }
      devtoolsOpen = newDevtoolsOpen;
    };

    // Poll every 500ms
    const devtoolsChecker = setInterval(checkDevTools, 500);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', () => {});
      document.removeEventListener('selectstart', () => {});
      document.removeEventListener('copy', () => {});
      document.removeEventListener('paste', () => {});
      document.removeEventListener('cut', () => {});
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(devtoolsChecker);
    };
  }, []);

  useNipAuthprovider();
  useSingleTabSession(toastActions);
  return (
    <div
      style={{
        marginLeft,
        width,
        minWidth: 0,
        boxSizing: 'border-box',
        height: '100vh',
        display: 'flex',
        overflowX: 'auto',
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
