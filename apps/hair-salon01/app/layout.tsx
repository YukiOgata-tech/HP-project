import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import { Breadcrumb } from "./components/breadcrumb";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Providers } from "./providers";
import { checkSessionExists } from "./admin/actions/session";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/images/logo/RB-logo-light-trans.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/logo/RB-logo-dark-trans.png",  media: "(prefers-color-scheme: dark)"  },
    ],
    apple: "/images/logo/RB-logo-dark-trans.png",
  },
  title: "RISPLENDERE BROLETTO｜新潟市中央区本馬越の美容室",
  description:
    "新潟市中央区本馬越の女性スタッフ中心の小さな美容室。カット、カラー、トリートメント、ヘッドスパまで、髪にやさしく一人ひとりに寄り添うサロンです。",
  keywords: [
    "新潟市 美容室",
    "新潟市中央区 美容室",
    "本馬越 美容室",
    "リスプレンデレ ブロレット",
    "BROLETTO",
    "ヘッドスパ 新潟",
    "白髪カバー 新潟",
  ],
  openGraph: {
    title: "RISPLENDERE BROLETTO｜新潟市中央区本馬越の美容室",
    description:
      "キラキラ輝く小さな場所。新潟市中央区本馬越の美容室 RISPLENDERE BROLETTO。",
    type: "website",
    locale: "ja_JP",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "RISPLENDERE BROLETTO",
  "alternateName": "リスプレンデレ ブロレット",
  "description": "新潟市中央区本馬越の女性スタッフ中心の小さな美容室。カット、カラー、トリートメント、ヘッドスパまで、髪にやさしく一人ひとりに寄り添うサロンです。",
  "url": process.env.NEXT_PUBLIC_SITE_URL ?? "",
  "telephone": "+81-25-278-7274",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "本馬越2丁目8番17号",
    "addressLocality": "新潟市中央区",
    "addressRegion": "新潟県",
    "postalCode": "950-0865",
    "addressCountry": "JP",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:15",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "10:00",
      "closes": "17:00",
    },
  ],
  "priceRange": "¥¥",
  "currenciesAccepted": "JPY",
  "paymentAccepted": "Cash, Credit Card",
  "sameAs": [
    "https://www.instagram.com/risplendere_broletto/",
    "https://beauty.hotpepper.jp/slnH000142482/",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const pathname = (await headers()).get("x-admin-pathname");
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;
  const savedTheme = cookieStore.get("theme")?.value as "dark" | "light" | undefined;
  const isAdmin = !isAdminRoute && await checkSessionExists();

  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={[noto.variable, playfair.variable, savedTheme ?? ""].join(" ").trim()}
    >
      <body>
        {!isAdminRoute && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          />
        )}
        <Providers initialTheme={savedTheme}>
          {!isAdminRoute && <Header isAdmin={isAdmin} />}
          {!isAdminRoute && <Breadcrumb />}
          {children}
          {!isAdminRoute && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
