'use client';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/react-query/constants';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = () => {
    Object.values(queryKeys).forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });
  };

  return {
    invalidateQueries
  };
};
