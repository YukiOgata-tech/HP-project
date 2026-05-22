import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "maharaja-night-2026",
  description: "maharaja-night-2026 website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
