import { AdminPageHeader, AdminSecondaryLink } from "../../components/AdminUi";
import { SponsorForm } from "../../components/SponsorForm";

export const metadata = { title: "協賛企業追加 | 管理画面" };

export default function NewSponsorPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Create Sponsor"
        title="協賛企業を追加"
        description="企業名、ロゴ、リンク先、表示順を登録します。保存後、公開サイトの協賛企業セクションに反映されます。"
        actions={<AdminSecondaryLink href="/admin/sponsors">一覧へ戻る</AdminSecondaryLink>}
      />
      <SponsorForm />
    </div>
  );
}
