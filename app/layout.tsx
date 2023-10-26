import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { theme } from './MuiTheme';
import NavBarContextProvider from './NavBarContext';
import { NavBarSideBarWrapper } from '@/components/Shared/NavBarSideBarWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iBaaS',
  description: 'Core Banking Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavBarContextProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={inter.className} suppressHydrationWarning>
            <NextTopLoader />{' '}
            <Stack direction="row">
              <NavBarSideBarWrapper />
              {children}
            </Stack>
          </body>
        </html>
      </ThemeProvider>
    </NavBarContextProvider>
  );
}
