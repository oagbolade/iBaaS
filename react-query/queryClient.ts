'use client';
import { QueryClient, QueryCache } from '@tanstack/react-query';
import { useQueryErrorHandler } from '@/utils/useQueryErrorHandler';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: useQueryErrorHandler,
  }),
});
