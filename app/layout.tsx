import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./MuiTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBaaS",
  description: "Core Banking Application",
};

// const theme = createTheme({
//   components: {
//     // Name of the component
//     MuiButtonBase: {
//       defaultProps: {
//         // The props to change the default for.
//         disableRipple: true, // No more ripple, on the whole application 💣!
//       },
//     },
//   },
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
