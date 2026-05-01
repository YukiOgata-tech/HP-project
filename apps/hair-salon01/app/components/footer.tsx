import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-darkest)] px-5 py-5 text-white/70 md:py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/"
            className="text-base font-black tracking-[0.2em] text-white transition-colors hover:text-[var(--accent-warm)] md:text-lg"
          >
            RISPLENDERE BROLETTO
          </Link>
          <p className="mt-1 text-xs text-white/45">Niigata private salon journal and information</p>
        </div>
        <p className="text-xs">© RISPLENDERE BROLETTO. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
