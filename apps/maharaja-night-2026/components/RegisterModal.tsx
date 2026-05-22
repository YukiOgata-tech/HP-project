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
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#D4AF37]/30 sm:rounded-2xl rounded-t-3xl p-6 sm:p-12 relative max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:fade-in-0 duration-300">
        
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-6 sm:top-6 p-2 bg-black/50 hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6 text-gray-400" />
        </button>

        <h2 className="text-2xl sm:text-4xl font-black mb-2 text-gradient-gold text-center tracking-widest">チケット / VIP予約</h2>
        <p className="text-center text-[#FF007F] text-[10px] sm:text-sm mb-6 sm:mb-8 font-bold">
          ※詳細な質問内容は共有待ちのため、仮のフォームとなっています。
        </p>

        {isSuccess ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 animate-bounce">✨</div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F9E596] mb-3 sm:mb-4">お申し込み完了！</h3>
            <p className="text-xs sm:text-base text-gray-300">ご登録ありがとうございます。追って担当者よりご連絡いたします。</p>
            <button 
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold transition-colors"
            >
              閉じる
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-[10px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">お名前</label>
              <input 
                name="name" 
                required 
                className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#D4AF37] transition-colors" 
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">メールアドレス</label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#D4AF37] transition-colors" 
                placeholder="taro@example.com"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-sm text-gray-300 mb-1.5 sm:mb-2 tracking-widest font-bold">ご希望のチケット</label>
              <select 
                name="type" 
                required 
                defaultValue={initialType}
                className="w-full bg-black/50 border border-[#D4AF37]/30 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-[#D4AF37] appearance-none transition-colors"
              >
                <option value="general" className="bg-black text-white">一般入場チケット</option>
                <option value="vip" className="bg-black text-[#D4AF37]">VIPテーブル席</option>
              </select>
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F9E596] text-black text-sm sm:text-base font-black tracking-widest py-3 sm:py-4 rounded-lg hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 mt-2 sm:mt-4 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {isSubmitting ? "送信中..." : "予約を確定する"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
