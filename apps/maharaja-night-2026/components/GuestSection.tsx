import { TiltCard } from "./3d/TiltCard";

export function GuestSection() {
  const guests = [
    { name: "Marc Panther", role: "SPECIAL GUEST DJ", image: "/marc.jpg" },
    { name: "DJ BOSS", role: "GUEST DJ", image: "/boss.jpg" },
  ];

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black z-0" />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-5xl font-black mb-8 sm:mb-16 text-center text-gradient-gold tracking-widest">
          <span className="text-sm sm:text-3xl">SPECIAL</span> GUESTS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-12 justify-center">
          {guests.map((guest, i) => (
            <TiltCard key={i} className="aspect-[16/9] sm:aspect-[4/3] md:aspect-[4/3] w-full max-w-lg mx-auto">
              <div className="w-full h-full bg-[#111] flex flex-col justify-end p-4 sm:p-8 relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/5">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1571266028243-cb40fce75729?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-1000 hover:scale-105" />
                
                <div className="relative z-20">
                  <p className="text-[#FF007F] font-bold tracking-widest text-[10px] sm:text-sm mb-1 sm:mb-2 drop-shadow-[0_0_8px_rgba(255,0,127,0.8)]">
                    {guest.role}
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-black text-white">{guest.name}</h3>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
