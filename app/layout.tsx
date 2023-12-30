import './globals.css';
import React from 'react';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { theme } from './MuiTheme';
import NavBarContextProvider from './NavBarContext';
import SideBarContextProvider from './SideBarContext';
import { RenderChildren } from './RenderChildren';
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
    <SideBarContextProvider>
      <NavBarContextProvider>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <body className={inter.className} suppressHydrationWarning>
              <NextTopLoader />{' '}
              <Stack direction="row">
                <NavBarSideBarWrapper />
                <RenderChildren>{children}</RenderChildren>
              </Stack>
            </body>
          </html>
        </ThemeProvider>
      </NavBarContextProvider>
    </SideBarContextProvider>
  );
}
