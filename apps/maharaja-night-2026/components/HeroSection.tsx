import { ParticleBackground } from "./3d/ParticleBackground";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4">
      <ParticleBackground />
      <div className="z-10 text-center flex flex-col items-center w-full max-w-lg">
        {/* Title */}
        <h1 className="text-[3.5rem] leading-[0.95] sm:text-7xl md:text-8xl font-black mb-2 sm:mb-4 tracking-tighter text-gradient-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
          MAHARAJA<br className="sm:hidden" /> NIGHT
        </h1>
        <p className="text-xs sm:text-2xl md:text-3xl font-bold sm:font-light text-white mb-8 sm:mb-12 tracking-[0.3em] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
          <span className="text-[10px] sm:text-xl">in</span> NIIGATA 2026
        </p>
        <button 
          onClick={onOpenModal}
          className="w-full sm:w-auto glass-gold px-6 py-3.5 sm:px-10 sm:py-4 rounded-xl sm:rounded-full text-sm sm:text-lg font-black tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
        >
          TICKET / VIP
        </button>
      </div>
    </section>
  );
}
