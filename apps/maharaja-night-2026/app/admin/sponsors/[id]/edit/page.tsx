import { notFound } from "next/navigation";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { AdminPageHeader, AdminSecondaryLink } from "../../../components/AdminUi";
import { SponsorForm, type SponsorFormData } from "../../../components/SponsorForm";

const SITE_ID = process.env.SITE_ID!;

interface Props {
  params: Promise<{ id: string }>;
}

async function getSponsor(id: string): Promise<SponsorFormData | null> {
  const snapshot = await getAdminDb()
    .collection("sites")
    .doc(SITE_ID)
    .collection("sponsors")
    .doc(id)
    .get();

  if (!snapshot.exists) return null;
  const data = snapshot.data() as Omit<SponsorFormData, "id">;
  return {
    id: snapshot.id,
    ...data,
  };
}

export default async function EditSponsorPage({ params }: Props) {
  const { id } = await params;
  const sponsor = await getSponsor(id);
  if (!sponsor) notFound();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Edit Sponsor"
        title="協賛企業を編集"
        description="公開/非公開、ロゴ、リンク先、表示順を調整できます。変更は公開サイトの協賛企業セクションに反映されます。"
        actions={<AdminSecondaryLink href="/admin/sponsors">一覧へ戻る</AdminSecondaryLink>}
      />
      <SponsorForm sponsor={sponsor} />
    </div>
  );
}
