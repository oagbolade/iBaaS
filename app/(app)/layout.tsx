import '../globals.css';
import React from 'react';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { theme } from '../MuiTheme';
import { RenderChildren } from '../RenderChildren';
import { ContextProviders } from '../Providers';
import { queryClient } from '@/react-query/queryClient';
import { NavBarSideBarWrapper } from '@/components/Shared/NavBarSideBarWrapper';
import { MuiSnackbar } from '@/components/Snackbar';
import { ToastMessage } from '@/components/Revamp/ToastMessage';

export const metadata: Metadata = {
  title: 'iBaaS',
  description: 'Core Banking Application'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProviders>
        <ThemeProvider theme={theme}>
          <NextTopLoader />{' '}
          <Stack direction="row">
            <NavBarSideBarWrapper />
            <RenderChildren>{children}</RenderChildren>
            <MuiSnackbar />
            <ToastMessage />
          </Stack>
        </ThemeProvider>
      </ContextProviders>
    </QueryClientProvider>
  );
}
