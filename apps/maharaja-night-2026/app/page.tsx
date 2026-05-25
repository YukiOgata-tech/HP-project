import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { getPublishedPosts } from "@client-sites/lib/cms";
import { HomePageClient } from "@/components/sections/HomePageClient";
import { StructuredData } from "@/components/ui/StructuredData";
import { eventJsonLd, faqJsonLd, pageMetadata } from "@/components/data/seo";

export const metadata = pageMetadata({
  title: "新潟の大人向けディスコイベント公式サイト",
  description:
    "MAHARAJA NIGHT in Niigata 2026 公式サイト。2026年10月24日、STUDIO NEXSで開催。マーク・パンサー、ミノルクリス滝沢、DJ NaO、DJ MITSUKURIが出演。",
  path: "/",
  image: "/images/event/hero-disco-floor.jpg",
});

const SITE_ID = process.env.SITE_ID!;

async function getSponsors() {
  const db = getAdminDb();
  const snapshot = await db
    .collection("sites")
    .doc(SITE_ID)
    .collection("sponsors")
    .orderBy("order", "asc")
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export default async function Home() {
  const [sponsors, posts] = await Promise.all([
    getSponsors(),
    getPublishedPosts(SITE_ID, 3),
  ]);

  return (
    <>
      <StructuredData data={[eventJsonLd, faqJsonLd]} />
      <HomePageClient sponsors={sponsors} posts={posts} />
    </>
  );
}
