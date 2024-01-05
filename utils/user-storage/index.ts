import { UserLoginResponse } from '@/constants/Responses';

const USER_LOCALSTORAGE_KEY = 'ibaas_user';

// helper to get user from localstorage
export function getStoredUser(): UserLoginResponse | null {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
}

export function setStoredUser(user: UserLoginResponse): void {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}
