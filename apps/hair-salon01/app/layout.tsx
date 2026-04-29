import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hair Salon",
  description: "Hair Salon website",
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
