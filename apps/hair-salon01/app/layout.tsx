import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import { Header } from "./components/header";
import { Providers } from "./providers";
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value as "dark" | "light" | undefined;

  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={[noto.variable, playfair.variable, savedTheme ?? ""].join(" ").trim()}
    >
      <body>
        <Providers initialTheme={savedTheme}>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
