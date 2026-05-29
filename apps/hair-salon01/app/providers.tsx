"use client";

import { ThemeProvider } from "./lib/theme";
import { LoadingProvider } from "./lib/loading-context";
import { PageLoader } from "./components/PageLoader";
import { NavigationEvents } from "./components/NavigationEvents";

export function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: "light" | "dark";
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LoadingProvider>
        <NavigationEvents />
        <PageLoader />
        {children}
      </LoadingProvider>
    </ThemeProvider>
  );
}
