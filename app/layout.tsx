import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeSyncWrapper } from '@/components/theme-sync-wrapper';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dev Tools Hub",
    template: "%s | Dev Tools Hub",
  },
  description: "Web Application for developers with dev tools for make it work easier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeSyncWrapper>
              <SidebarProvider>
                <AppSidebar/>
                <main className="p-8 w-full">
                  <SidebarTrigger/>
                  {children}
                </main>
              </SidebarProvider>
            </ThemeSyncWrapper>
          </ThemeProvider>
      </body>
    </html>
  );
}
