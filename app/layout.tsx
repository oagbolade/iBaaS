import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./MuiTheme";
import { SideBar } from "@/components/Sidebar/index";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { NavBar } from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBaaS",
  description: "Core Banking Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}  suppressHydrationWarning={true}>
          <Stack direction='row'>
            <NavBar />
            <SideBar />
            {children}
          </Stack>
        </body>
      </html>
    </ThemeProvider>
  );
}
