import { AlertColor } from '@mui/material';
import {
  getStoredUser,
  clearStoredUser,
  setLastPage
} from '@/utils/user-storage';
import { toast } from '@/utils/toast';
import { IToastActions } from '@/constants/types';
import { environment } from '@/axiosInstance';

const UNPROTECTED_ROUTES = ['/login/', '/login', '/signup/', '/signup'];
export const domain = process.env.DOMAIN || '';

export function isTokenExistingOrExpired(tokenExpire?: string): boolean {
  if (!tokenExpire) {
    return true; // Token is considered expired if it doesn't exist
  }

  const tokenExpiration = new Date(tokenExpire).getTime();
  const currentTime = new Date().getTime();

  return tokenExpiration < currentTime;
}

const getCurrentPath = (): string => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    const ibassIndex = path?.indexOf('/');

    if (ibassIndex !== -1) {
      return path?.substring((ibassIndex as number) + domain.length);
    }
  }

  return '';
};

// Function to handle token expiration
const handleTokenExpiration = (toastActions: IToastActions) => {
  clearStoredUser();
  const toastMessage = {
    message: 'Session expired. Please login again.',
    title: 'Session Expired',
    severity: 'error'
  };

  toast(
    toastMessage.message,
    toastMessage.title,
    toastMessage.severity as AlertColor,
    toastActions
  );

  setTimeout(() => {
    if (environment === 'production') {
      window.location.href = '/login?auth=false';
      return;
    }

    window.location.href = '/ibaas-ui/login?auth=false';
  }, 2000);
};

export const authGuard = (toastActions: IToastActions): void => {
    const isProtectedRoute = !UNPROTECTED_ROUTES.includes(getCurrentPath());

    if (isProtectedRoute && typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setLastPage(currentUrl);
      const checkTokenStatus = () => {
        const authFailed = isTokenExistingOrExpired(
          getStoredUser()?.tokenExpire
        );

        if (authFailed) {
          handleTokenExpiration(toastActions);
        }
      };

      checkTokenStatus();
    }
};
