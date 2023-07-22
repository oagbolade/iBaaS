import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./MuiTheme";
import { SideBar } from "@/components/Sidebar";

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
        <body className={inter.className}>
          <SideBar />
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
