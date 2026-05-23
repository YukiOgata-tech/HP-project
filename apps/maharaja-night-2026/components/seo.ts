import type { Metadata } from "next";
import { eventInfo, faqs, lineup } from "./eventData";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "MAHARAJA NIGHT in Niigata 2026";
export const defaultDescription =
  "2026年10月24日、STUDIO NEXSで開催。マーク・パンサーを迎え、伝説のディスコが一夜限りで新潟に蘇る公式イベントサイト。";
export const defaultOgImage = "/images/maharaja_logo_whiteBG.jpg";

export const seoKeywords = [
  "MAHARAJA NIGHT",
  "マハラジャナイト",
  "マハラジャ 新潟",
  "MAHARAJA NIGHT in Niigata 2026",
  "新潟 イベント",
  "新潟 ディスコ",
  "STUDIO NEXS",
  "マーク・パンサー",
  "globe",
  "ミノルクリス滝沢",
  "DJ NaO",
  "DJ MITSUKURI",
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = defaultOgImage,
  type = "website",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords: seoKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "ja_JP",
      type,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: eventInfo.name,
  description: defaultDescription,
  startDate: "2026-10-24T18:00:00+09:00",
  endDate: "2026-10-25T01:00:00+09:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: absoluteUrl("/"),
  image: [
    absoluteUrl("/images/event/hero-disco-floor.jpg"),
    absoluteUrl("/images/event/guest-marc-panther.jpg"),
  ],
  location: {
    "@type": "Place",
    name: eventInfo.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: "万代1-3-1 万代シネモールビルB1",
      addressLocality: "新潟市中央区",
      addressRegion: "新潟県",
      addressCountry: "JP",
    },
  },
  performer: lineup.map((guest) => ({
    "@type": "Person",
    name: guest.name,
  })),
  organizer: eventInfo.organizers.map((name) => ({
    "@type": "Organization",
    name,
  })),
  offers: [
    {
      "@type": "Offer",
      name: "MEN 1D",
      price: "4500",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#register"),
    },
    {
      "@type": "Offer",
      name: "WOMEN 1D",
      price: "3500",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#register"),
    },
    {
      "@type": "Offer",
      name: "VIP TABLE CHARGE",
      price: "50000",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#vip"),
    },
  ],
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};
