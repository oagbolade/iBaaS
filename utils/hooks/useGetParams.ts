'use client';
import { useSearchParams } from 'next/navigation';

export const useGetParams = (params: string) => {
  const searchParams = useSearchParams();
  const getParam = searchParams.get(params);

  return getParam;
};
