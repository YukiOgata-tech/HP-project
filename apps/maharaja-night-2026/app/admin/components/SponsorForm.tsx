import Link from "next/link";
import { ConfirmSubmitButton } from "./ConfirmSubmitButton";
import {
  createSponsorAction,
  deleteSponsorAction,
  updateSponsorAction,
} from "../actions/sponsors";

export interface SponsorFormData {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  tier?: string;
  order?: number;
  isActive?: boolean;
}

export function SponsorForm({ sponsor }: { sponsor?: SponsorFormData }) {
  const isEdit = !!sponsor;
  const action = isEdit
    ? updateSponsorAction.bind(null, sponsor.id)
    : createSponsorAction;

  return (
    <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <form
        id="sponsor-form"
        action={action}
        className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_16px_rgba(0,0,0,0.3)] sm:rounded-[28px] sm:p-6 sm:shadow-[0_0_20px_rgba(0,0,0,0.35)]"
      >
        <div className="space-y-4 sm:space-y-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs">
              Sponsor Profile
            </p>
            <h2 className="mt-1 text-base font-black text-white sm:mt-2 sm:text-xl">掲載情報</h2>
            <p className="mt-1 text-xs leading-5 text-gray-400 sm:mt-2 sm:text-sm sm:leading-6">
              公開サイトの協賛企業セクションに表示される内容です。ロゴがない場合は企業名をテキストで表示します。
            </p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-gray-200">企業名</span>
              <input
                name="name"
                required
                defaultValue={sponsor?.name ?? ""}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] sm:rounded-2xl sm:px-4"
                placeholder="CHAMPAGNE COLLET"
              />
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-bold text-gray-200">表示順</span>
              <input
                name="order"
                type="number"
                defaultValue={sponsor?.order ?? 0}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] sm:rounded-2xl sm:px-4"
              />
            </label>
          </div>

          <label className="space-y-2">
            <span className="block text-sm font-bold text-gray-200">ロゴ画像 URL</span>
            <input
              name="logoUrl"
              type="url"
              defaultValue={sponsor?.logoUrl ?? ""}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] sm:rounded-2xl sm:px-4"
              placeholder="https://..."
            />
          </label>

          <label className="space-y-2">
            <span className="block text-sm font-bold text-gray-200">公式サイト URL</span>
            <input
              name="websiteUrl"
              type="url"
              defaultValue={sponsor?.websiteUrl ?? ""}
              className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] sm:rounded-2xl sm:px-4"
              placeholder="https://..."
            />
          </label>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-bold text-gray-200">掲載ランク</span>
              <select
                name="tier"
                defaultValue={sponsor?.tier ?? "regular"}
                className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white outline-none transition-colors focus:border-[#D4AF37] sm:rounded-2xl sm:px-4"
              >
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="regular">Regular</option>
              </select>
            </label>

            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
              <input
                name="isActive"
                type="checkbox"
                defaultChecked={sponsor?.isActive ?? true}
                className="size-4 accent-[#D4AF37]"
              />
              <span className="text-sm font-bold text-gray-200">公開サイトに表示する</span>
            </label>
          </div>
        </div>
      </form>

      <aside className="space-y-4 sm:space-y-6">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:rounded-[28px] sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37] sm:text-xs">
            Preview
          </p>
          <div className="mt-3 flex min-h-24 items-center justify-center rounded-xl border border-white/10 bg-black/35 p-3 sm:mt-5 sm:min-h-32 sm:rounded-2xl sm:p-4">
            {sponsor?.logoUrl ? (
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                className="max-h-16 object-contain"
              />
            ) : (
              <p className="text-center text-lg font-black text-white/58">
                {sponsor?.name || "Sponsor Name"}
              </p>
            )}
          </div>
          <p className="mt-3 text-xs leading-5 text-gray-500 sm:mt-4 sm:text-sm sm:leading-6">
            新規作成時のプレビューは保存後に実データで確認できます。
          </p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:rounded-[28px] sm:p-6">
          <div className="space-y-3">
            <button
              type="submit"
              form="sponsor-form"
              className="w-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F9E596] px-5 py-3 text-sm font-black tracking-widest text-black transition-transform hover:scale-[1.02]"
            >
              {isEdit ? "変更を保存する" : "協賛企業を追加する"}
            </button>
            <Link
              href="/admin/sponsors"
              className="flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold tracking-widest text-gray-300 transition-colors hover:border-[#D4AF37] hover:text-white"
            >
              一覧へ戻る
            </Link>
          </div>
        </section>

        {isEdit ? (
          <section className="rounded-2xl border border-[#FF007F]/20 bg-[#FF007F]/5 p-3 sm:rounded-[28px] sm:p-6">
            <form action={deleteSponsorAction.bind(null, sponsor.id)}>
              <ConfirmSubmitButton
                className="w-full rounded-full border border-[#FF007F]/40 px-5 py-3 text-sm font-black tracking-widest text-[#FF5DAF] transition-colors hover:bg-[#FF007F] hover:text-white"
                confirmMessage="この協賛企業を削除しますか？"
              >
                削除する
              </ConfirmSubmitButton>
            </form>
          </section>
        ) : null}
      </aside>
    </div>
  );
}
