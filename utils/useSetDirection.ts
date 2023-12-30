'use client';
import { useCurrentBreakpoint } from './useCurrentBreakpoint';

export const useSetDirection = () => {
  const { isMobile } = useCurrentBreakpoint();

  const setDirection = () => {
    if (isMobile) return 'column';
    return 'row';
  };

  return {
    setDirection,
  };
};
