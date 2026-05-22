import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { HomePageClient } from "@/components/HomePageClient";

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
  const sponsors = await getSponsors();
  return <HomePageClient sponsors={sponsors} />;
}
