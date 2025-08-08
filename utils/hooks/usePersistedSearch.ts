import { useState, useEffect } from 'react';

type PersistedSearchState<T> = {
  searchParams: T | null;
  setSearchParams: (params: T | null) => void;
  searchActive: boolean;
  setSearchActive: (active: boolean) => void;
  page: number;
  setPage: (page: number) => void;
  resetSearchState: () => void;
};

export function usePersistedSearch<T>(storageKeyPrefix: string): PersistedSearchState<T> {
  const [searchParams, setSearchParamsState] = useState<T | null>(null);
  const [searchActive, setSearchActiveState] = useState(false);
  const [page, setPageState] = useState(1);

  const keyParams = `${storageKeyPrefix}-searchParams`;
  const keyActive = `${storageKeyPrefix}-searchActive`;
  const keyPage = `${storageKeyPrefix}-searchPage`;

  useEffect(() => {
    const fromSameOrigin = document.referrer?.includes(window.location.origin);
    if (fromSameOrigin) {
      const storedParams = sessionStorage.getItem(keyParams);
      const storedActive = sessionStorage.getItem(keyActive);
      const storedPage = sessionStorage.getItem(keyPage);

      if (storedParams && storedActive === 'true') {
        setSearchParamsState(JSON.parse(storedParams));
        setSearchActiveState(true);
        setPageState(parseInt(storedPage || '1', 10));
      }
    }
  }, []);

  const setSearchParams = (params: T | null) => {
    setSearchParamsState(params);
    sessionStorage.setItem(keyParams, JSON.stringify(params));
  };

  const setSearchActive = (active: boolean) => {
    setSearchActiveState(active);
    sessionStorage.setItem(keyActive, String(active));
  };

  const setPage = (pageNum: number) => {
    setPageState(pageNum);
    sessionStorage.setItem(keyPage, String(pageNum));
  };

  const resetSearchState = () => {
    sessionStorage.removeItem(keyParams);
    sessionStorage.removeItem(keyActive);
    sessionStorage.removeItem(keyPage);
    setSearchParamsState(null);
    setSearchActiveState(false);
    setPageState(1);
  };

  return {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
    resetSearchState
  };
}
