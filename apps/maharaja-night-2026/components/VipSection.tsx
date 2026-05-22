interface VipSectionProps {
  onOpenModal: () => void;
}

export function VipSection({ onOpenModal }: VipSectionProps) {
  return (
    <section className="py-12 sm:py-24 px-4 sm:px-12 bg-black relative border-y border-[#D4AF37]/20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-10" />
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <h2 className="text-3xl sm:text-6xl font-black mb-4 sm:mb-8 text-gradient-gold">V.I.P TABLE</h2>
        <p className="text-gray-300 text-xs sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0">
          選ばれし大人のための、最上級のプライベート空間。専用テーブルとプレミアムなサービスで、ステージの熱気を特等席からお楽しみいただけます。
        </p>
        <div className="glass-gold p-5 sm:p-12 rounded-xl sm:rounded-2xl inline-block text-left max-w-3xl w-full mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 border-b border-[#D4AF37]/30 pb-2 sm:pb-4">Royal VIP</h3>
          <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-200 text-xs sm:text-base font-bold">
            <li className="flex items-center gap-2 sm:gap-3"><span className="text-[#D4AF37]">✦</span> 優先エントランス入場</li>
            <li className="flex items-center gap-2 sm:gap-3"><span className="text-[#D4AF37]">✦</span> プレミアムシャンパン 2本付き</li>
            <li className="flex items-center gap-2 sm:gap-3"><span className="text-[#D4AF37]">✦</span> 専用VIPラウンジへのアクセス</li>
            <li className="flex items-center gap-2 sm:gap-3"><span className="text-[#D4AF37]">✦</span> 専属アテンドサービス</li>
          </ul>
          <div className="text-center">
            <button 
              onClick={onOpenModal}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F9E596] text-black w-full sm:w-auto px-10 py-3.5 sm:py-4 rounded-lg sm:rounded-full font-black tracking-widest hover:scale-105 transition-transform"
            >
              VIP席を予約する
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
