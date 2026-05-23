import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const siteTitle = "MAHARAJA NIGHT in Niigata 2026";
const siteDescription =
  "2026年10月24日、STUDIO NEXSで開催。伝説のディスコが一夜限りで新潟のまちに蘇る、MAHARAJA NIGHT in Niigata 2026 公式サイト。";
const logoImage = "/images/maharaja_logo_whiteBG.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: logoImage,
    shortcut: logoImage,
    apple: logoImage,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: logoImage,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [logoImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
