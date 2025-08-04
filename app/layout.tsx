import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { LoginTheme } from './MuiTheme';
import { queryClient } from '@/react-query/queryClient';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { MuiSnackbar } from '@/components/Snackbar';
import MuiSnackbarContextProvider from '@/context/MuiSnackbarContext';
import ToastMessageContextProvider from '@/context/ToastMessageContext';

const inter = Inter({ subsets: ['latin'] });

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
      <ToastMessageContextProvider>
        <MuiSnackbarContextProvider>
          <ThemeProvider theme={LoginTheme}>
            <html lang="en">
              <body className={inter.className} suppressHydrationWarning>
                <Head>
                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />         
                </Head>
                {children}
                <MuiSnackbar />
                <ToastMessage />
              </body>
            </html>
          </ThemeProvider>
        </MuiSnackbarContextProvider>
      </ToastMessageContextProvider>
    </QueryClientProvider>
  );
}
