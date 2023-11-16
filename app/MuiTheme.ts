'use client';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
    largescreen: true;
  }
}

export const theme = createTheme({
  breakpoints: {
    keys: ['mobile', 'tablet', 'desktop', 'largescreen'],
    values: {
      mobile: 0,
      tablet: 481,
      desktop: 769,
      largescreen: 1025,
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Averta Regular',
      textTransform: 'none',
      whiteSpace: 'nowrap',
      lineHeight: '24px',
    },
  },
});
