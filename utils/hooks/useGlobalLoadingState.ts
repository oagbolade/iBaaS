import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export const useGlobalLoadingState = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!(isFetching || isMutating);

  return {
    isLoading
  };
};
