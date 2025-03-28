import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const useCurrentBreakpoint = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const matchesTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  const setWidth = (width: number | string = 0) => {
    if (width) return width;
    if (matchesTablet) return width || '100%';
  };

  const setDirection = (direction: {
    mobileDirection: string;
    tabletDirection: string;
    desktopDirection: string;
  }) => {
    if (matchesDesktop) return direction.desktopDirection;
    if (matchesTablet) return direction.tabletDirection;
    if (matchesMobile) return direction.mobileDirection;
    return 'row';
  };

  return {
    theme,
    isMobile: matchesMobile,
    isTablet: matchesTablet,
    isDesktop: matchesDesktop,
    setWidth,
    setDirection
  };
};
