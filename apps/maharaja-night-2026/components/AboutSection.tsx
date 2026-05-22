export function AboutSection() {
  const conceptText: Record<string, string> = {
    "Music": "新潟の夜を彩る、究極の音楽体験を。",
    "Luxury": "非日常を味わう、至高のラグジュアリー空間。",
    "Encounter": "特別な夜がもたらす、新しい出会いと熱狂。",
    "Experience": "五感を刺激する、かつてないエンターテインメント。"
  };

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-12 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-5xl font-black mb-8 sm:mb-16 text-center text-gradient-gold tracking-widest">CONCEPT</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {["Music", "Luxury", "Encounter", "Experience"].map((concept, i) => (
            <div key={i} className="glass hover:glass-gold transition-all duration-300 p-4 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col items-center text-center group cursor-default">
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white/5 group-hover:bg-[#D4AF37]/20 mb-3 sm:mb-6 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/50 shadow-[0_0_15px_rgba(212,175,55,0)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300">
                <span className="text-base sm:text-2xl grayscale group-hover:grayscale-0 transition-all">✨</span>
              </div>
              <h3 className="text-sm sm:text-2xl font-black mb-1 sm:mb-4 text-gray-300 group-hover:text-[#F9E596] transition-colors">{concept}</h3>
              <p className="text-[10px] sm:text-sm text-gray-500 group-hover:text-gray-300 leading-snug sm:leading-relaxed transition-colors">
                {conceptText[concept]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
