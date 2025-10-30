import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useNipAuth } from '@/api/auth/useNipAuth';
import { NipLoginResponse, NipLoginValue } from '@/schemas/schema-values/auth';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

const EXCLUDED_ROUTES = ['/login', '/signup'];

export const useNipAuthprovider = () => {
  const currentPath = usePathname();
  const { mutate } = useNipAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to check if the current route is excluded
    const isExcludedRoute = (path: string): boolean => {
      return EXCLUDED_ROUTES.includes(path);
    };

    // Function to validate the token
    const isTokenValid = (): boolean => {
      if (typeof window === 'undefined') return false;

      const storedToken = localStorage.getItem('nipToken');
      const storedExpiredAt = localStorage.getItem('expiresAt');
      const token = storedToken ? decryptData(storedToken) : null;
      const expiresAt = storedExpiredAt ? decryptData(storedExpiredAt) : null;

      if (!token || !expiresAt) return false;

      const expirationDate = new Date(expiresAt);
      if (Number.isNaN(expirationDate.getTime())) return false; // Invalid date

      const currentTime = new Date();
      return currentTime < expirationDate;
    };

    // Main authentication logic
    const authenticate = () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      if (isExcludedRoute(currentPath)) {
        if (isTokenValid()) {
          setIsAuthenticated(true);
        }
        setLoading(false);
        return;
      }

      if (isTokenValid()) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      const credentials: NipLoginValue = {
        username:
          typeof window !== 'undefined' &&
          process.env.NODE_ENV !== 'development'
            ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_NIP_USERNAME
            : process.env.NEXT_PUBLIC_NIP_USERNAME || '',
        password:
          typeof window !== 'undefined' &&
          process.env.NODE_ENV !== 'development'
            ? window.RUNTIME_CONFIG?.NEXT_PUBLIC_NIP_PASSWORD
            : process.env.NEXT_PUBLIC_NIP_PASSWORD || ''
      };

      mutate(credentials, {
        onSuccess: (data: NipLoginResponse) => {
          if (typeof window !== 'undefined') {
            if (data.data.token && data.data.expiresAt) {
              localStorage.setItem(
                'nipToken',
                encryptData(data.data.token) as string
              );
              localStorage.setItem(
                'expiresAt',
                encryptData(data.data.expiresAt) as string
              );
              setIsAuthenticated(true);
              setLoading(false);
            } else {
              throw Error('Invalid token data');
            }
          }
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
    };

    authenticate();
  }, [currentPath, mutate, router]);

  const logout = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('nipToken');
    localStorage.removeItem('expiresAt');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout, loading };
};
