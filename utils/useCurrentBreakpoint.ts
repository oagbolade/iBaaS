import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const useCurrentBreakpoint = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const matchesTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const matchesDesktop = useMediaQuery(theme.breakpoints.up('desktop'));

  return {
    theme,
    isMobile: matchesMobile,
    isTablet: matchesTablet,
    isDesktop: matchesDesktop,
  };
};
