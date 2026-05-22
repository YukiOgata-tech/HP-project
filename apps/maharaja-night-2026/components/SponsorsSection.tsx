export function SponsorsSection({ sponsors }: { sponsors: any[] }) {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-8 sm:mb-12 text-gray-500 tracking-widest">SPONSORS</h2>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-80 transition-all duration-500">
          {sponsors.filter(s => s.isActive).map((sponsor) => (
            <div key={sponsor.id} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 bg-white/5 sm:bg-transparent rounded-lg p-3 sm:p-0">
              {sponsor.logoUrl ? (
                <img src={sponsor.logoUrl} alt={sponsor.name} className="h-10 sm:h-16 object-contain" />
              ) : (
                <span className="text-sm sm:text-xl font-bold text-gray-400 hover:text-white transition-colors">
                  {sponsor.name}
                </span>
              )}
            </div>
          ))}
          {sponsors.filter(s => s.isActive).length === 0 && (
            <div className="text-gray-600 font-bold tracking-widest text-[10px] sm:text-sm col-span-2">現在、協賛企業様を募集しております</div>
          )}
        </div>
      </div>
    </section>
  );
}
