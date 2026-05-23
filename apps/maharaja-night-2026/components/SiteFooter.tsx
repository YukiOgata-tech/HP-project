import Link from "next/link";
import { eventInfo } from "./eventData";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050306] px-3 py-8 text-white sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-7xl gap-5 sm:gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[#d9b84f] sm:text-sm sm:tracking-[0.32em]">
            Official Site
          </p>
          <h2 className="mt-1 text-xl font-black tracking-[0.12em] sm:mt-3 sm:text-3xl">
            MAHARAJA NIGHT
          </h2>
          <p className="mt-2 max-w-md text-[13px] font-bold leading-5 text-white/62 sm:mt-3 sm:text-sm sm:leading-7">
            {eventInfo.subcopy} 新潟のまちに一夜限りで立ち上がる、大人のためのディスコイベント。
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black tracking-[0.22em] text-white sm:text-sm">EVENT</h3>
          <dl className="mt-2 grid grid-cols-2 gap-2 text-[13px] text-white/68 sm:mt-4 sm:block sm:space-y-3 sm:text-sm">
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-white/42">Date</dt>
              <dd className="font-bold text-white">{eventInfo.date}</dd>
            </div>
            <div>
              <dt className="text-white/42">Venue</dt>
              <dd className="font-bold text-white">{eventInfo.venue}</dd>
            </div>
            <div>
              <dt className="text-white/42">Address</dt>
              <dd>{eventInfo.address}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-black tracking-[0.22em] text-white sm:text-sm">ORGANIZER</h3>
          <ul className="mt-2 space-y-1 text-[13px] font-bold text-white/68 sm:mt-4 sm:space-y-2 sm:text-sm">
            {eventInfo.organizers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-3 text-[12px] font-bold tracking-[0.18em] text-[#d9b84f] sm:mt-6 sm:text-sm">
            <Link href="/news" className="hover:text-white">
              NEWS
            </Link>
            <a href="#access" className="hover:text-white">
              ACCESS
            </a>
            <a href="#vip" className="hover:text-white">
              VIP
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-7xl flex-col gap-1.5 border-t border-white/10 pt-4 text-[12px] text-white/35 sm:mt-10 sm:gap-2 sm:pt-6 sm:text-sm md:flex-row md:items-center md:justify-between">
        <p>© 2026 MAHARAJA NIGHT in Niigata.</p>
        <p>Powered by Media-line, Global Innovation, I.D.Additional&apos;s.</p>
      </div>
    </footer>
  );
}
