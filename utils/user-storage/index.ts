import { decryptData } from '../decryptData';
import { encryptData } from '../encryptData';
import { UserLoginResponse } from '@/api/ResponseTypes/login';

export const USER_LOCALSTORAGE_KEY = 'ibaas_user';
export const LAST_PAGE_LOCALSTORAGE_KEY = 'ibaas_last_page';
export const RECENTLY_VISITED_LOCALSTORAGE_KEY = 'recently_visited_modules';
export const BANK_LOGO_LOCALSTORAGE_KEY = 'bank_logo';

export interface IRecentlyVisited {
  moduleName: string;
  moduleLink: string;
}

// helper to get user from localstorage
export function getStoredUser(): UserLoginResponse | null {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    return storedUser ? JSON.parse(decryptData(storedUser) as string) : null;
  }

  return null;
}

export const savePasswordToLocalStorage = (password: string) => {
  localStorage.setItem('userPassword', password);
};

// Utility function to get password from localStorage (can be used outside)
export const getPasswordFromLocalStorage = () => {
  return localStorage.getItem('userPassword');
};

export function getLastPage(): string | null {
  if (typeof window !== 'undefined') {
    const lastPage = localStorage.getItem(LAST_PAGE_LOCALSTORAGE_KEY);

    if (!lastPage) return null;

    try {
      const decrypted = decryptData(lastPage);
      if (!decrypted) return null;

      return JSON.parse(decrypted as string);
    } catch (error) {
      console.error('Error parsing last page from localStorage:', error);
      return null;
    }
  }

  return null;
}

export function getRecentlyVisitedModules(): IRecentlyVisited[] | null {
  if (typeof window !== 'undefined') {
    const recentlyVisitedModules = localStorage.getItem(
      RECENTLY_VISITED_LOCALSTORAGE_KEY
    );

    return recentlyVisitedModules !== 'null'
      ? JSON.parse(decryptData(recentlyVisitedModules as string) as string)
      : null;
  }

  return null;
}

export function setLastPage(url: string): void {
  localStorage.setItem(
    LAST_PAGE_LOCALSTORAGE_KEY,
    String(encryptData(JSON.stringify(url)))
  );
}

export function setStoredUser(user: UserLoginResponse): void {
  localStorage.setItem(
    USER_LOCALSTORAGE_KEY,
    String(encryptData(JSON.stringify(user)))
  );
}

export function saveBankLogoToLocalStorage(logo: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      BANK_LOGO_LOCALSTORAGE_KEY,
      String(encryptData(JSON.stringify(logo)))
    );
  }
}

export function getBankLogoFromLocalStorage(): string | null {
  if (typeof window !== 'undefined') {
    const bankLogo = localStorage.getItem(BANK_LOGO_LOCALSTORAGE_KEY);
    return bankLogo ? JSON.parse(decryptData(bankLogo) as string) : null;
  }
  return null;
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
