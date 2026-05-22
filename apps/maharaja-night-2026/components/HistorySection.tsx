"use client";

import useEmblaCarousel from "embla-carousel-react";

export function HistorySection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "center" });

  const images = [
    "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c560?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
  ];

  return (
    <section className="py-12 sm:py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-12 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-gradient-gold tracking-widest">HISTORY</h2>
        <p className="text-[10px] sm:text-sm text-gray-400 mt-2 sm:mt-4 tracking-widest font-bold">過去の開催の様子</p>
      </div>
      
      <div className="embla w-full" ref={emblaRef}>
        <div className="embla__container flex cursor-grab active:cursor-grabbing">
          {images.map((img, i) => (
            <div className="embla__slide flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_40%] min-w-0 px-2 sm:px-4" key={i}>
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden glass-neon border-[#FF007F]/20">
                <img src={img} alt={`History ${i}`} className="object-cover w-full h-full opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
