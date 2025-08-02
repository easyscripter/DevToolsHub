import { routing } from "@/config";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSyncWrapper } from "@/components/theme-sync-wrapper";
import { LocaleSyncWrapper } from "@/components/locale-sync-wrapper";
import QueryProvider from "@/providers/query-provider";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <ThemeSyncWrapper>
            <LocaleSyncWrapper>
              <SidebarProvider>
                <AppSidebar />
                <main className="p-8 w-full">
                  <SidebarTrigger />
                  {children}
                </main>
              </SidebarProvider>
            </LocaleSyncWrapper>
          </ThemeSyncWrapper>
        </ThemeProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
