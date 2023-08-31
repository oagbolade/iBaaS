'use client';
import './globals.css';
import { useState } from 'react';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './MuiTheme';
import { SideBar } from '@/components/Sidebar/index';
import Stack from '@mui/material/Stack';
import { NavBar } from '@/components/NavBar/index';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'iBaaS',
  description: 'Core Banking Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <NextTopLoader />{' '}
          <Stack direction="row">
            <NavBar toggleMenu={toggleMenu} />
            <SideBar openMenu={openMenu} />
            {children}
          </Stack>
        </body>
      </html>
    </ThemeProvider>
  );
}
