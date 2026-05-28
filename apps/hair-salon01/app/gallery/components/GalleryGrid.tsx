"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
  category?: string;
};

interface Props {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const prev = useCallback(() =>
    setSelected((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );

  const next = useCallback(() =>
    setSelected((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  /* キーボード操作 */
  useEffect(() => {
    if (selected === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, close, prev, next]);

  /* モーダル中はスクロール禁止 */
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      {/* ── グリッド ── */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={`${image.src}-${i}`}
            onClick={() => setSelected(i)}
            className="group relative aspect-square overflow-hidden bg-(--bg-off)"
            aria-label={`${image.alt}を拡大表示`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
            {/* ホバーオーバーレイ */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
              <ZoomIn
                size={22}
                className="text-white opacity-0 drop-shadow transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </button>
        ))}
      </div>

      {/* ── モーダル ── */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="画像拡大表示"
        >
          {/* 閉じるボタン */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-white/20 text-white/60 transition-all hover:border-white/60 hover:text-white"
            aria-label="閉じる"
          >
            <X size={18} />
          </button>

          {/* 前へ */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 text-white/60 transition-all hover:border-white/60 hover:text-white md:left-5"
              aria-label="前の画像"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* 画像エリア */}
          <div
            className="relative h-[85dvh] w-[88vw] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected].src}
              alt={images[selected].alt}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 768px, 88vw"
              priority
            />
          </div>

          {/* 次へ */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 text-white/60 transition-all hover:border-white/60 hover:text-white md:right-5"
              aria-label="次の画像"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* カウンター + alt テキスト */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              {selected + 1} / {images.length}
            </p>
            <p className="mt-0.5 text-xs text-white/25">{images[selected].alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
