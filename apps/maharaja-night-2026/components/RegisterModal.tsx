"use client";

import { useState, useEffect } from "react";
import { submitRegistration } from "../app/register/actions";
import { X } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: "general" | "vip";
}

export function RegisterModal({ isOpen, onClose, initialType = "general" }: RegisterModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await submitRegistration(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-[#D4AF37]/30 bg-[#0a0a0a] p-4 animate-in slide-in-from-bottom-10 duration-300 sm:rounded-2xl sm:p-12 sm:slide-in-from-bottom-0 sm:fade-in-0">
        
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
        >
          <X className="size-4 text-gray-400 sm:size-6" />
        </button>

        <h2 className="mb-1 text-center text-2xl font-black tracking-widest text-gradient-gold sm:mb-2 sm:text-4xl">事前申込 / VIP問い合わせ</h2>
        <p className="mb-4 text-center text-sm leading-5 text-white/58 sm:mb-8 sm:text-sm sm:leading-6">
          申込内容を確認後、運営より詳細をご案内します。
        </p>

        {isSuccess ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-bounce">✨</div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F9E596] mb-3 sm:mb-4">お申し込み完了！</h3>
            <p className="text-sm sm:text-base text-gray-300">ご登録ありがとうございます。追って担当者よりご連絡いたします。</p>
            <button 
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors"
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-3 sm:gap-6">
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">お名前</label>
              <input 
                name="name" 
                required 
                className="h-10 w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:h-12 sm:px-4 sm:text-base" 
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">メールアドレス</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="h-10 w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:h-12 sm:px-4 sm:text-base" 
                placeholder="taro@example.com"
              />
            </div>
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">電話番号</label>
              <input 
                name="phone" 
                type="tel"
                className="h-10 w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:h-12 sm:px-4 sm:text-base" 
                placeholder="090-0000-0000"
              />
            </div>
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">ご希望のチケット</label>
              <select 
                name="type" 
                required 
                defaultValue={initialType}
                className="h-10 w-full appearance-none rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:h-12 sm:px-4 sm:text-base"
              >
                <option value="general" className="bg-black text-white">一般入場チケット</option>
                <option value="vip" className="bg-black text-[#D4AF37]">VIPテーブル席</option>
              </select>
            </div>
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">人数</label>
              <input 
                name="numberOfPeople" 
                type="number"
                min="1"
                defaultValue="1"
                className="h-10 w-full rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:h-12 sm:px-4 sm:text-base" 
              />
            </div>
            <div>
              <label className="block text-[12px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">備考</label>
              <textarea
                name="note"
                rows={3}
                className="w-full resize-none rounded-lg border border-[#D4AF37]/30 bg-black/50 px-3 py-2 text-sm text-white transition-colors focus:border-[#D4AF37] focus:outline-none sm:px-4 sm:py-3 sm:text-base"
                placeholder="VIP希望人数、紹介者、問い合わせ内容など"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-1 h-10 w-full rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F9E596] text-sm font-black tracking-widest text-black shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 sm:mt-4 sm:h-12 sm:text-base"
            >
              {isSubmitting ? "送信中..." : "予約を確定する"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
