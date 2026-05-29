"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ── スライド定義 ──────────────────────────────
   画像追加時はここにオブジェクトを追加するだけ
─────────────────────────────────────────────── */
const slides = [
  { src: "/images/hero/hero-01.jpg", alt: "RISPLENDERE BROLETTOのサロン" },
  { src: "/images/hero/hero-02.jpg", alt: "ヘアスタイルイメージ" },
  { src: "/images/hero/hero-03.jpg", alt: "建物正面画像" },
];

const SLIDE_DURATION = 6000; // ms

const imageVariants = {
  enter:   { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] as const } },
  exit:    { opacity: 0, transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] as const } },
};

export function HeroSlider() {
  const [index, setIndex]   = useState(0);
  const [barKey, setBarKey] = useState(0);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % slides.length);
    setBarKey((k) => k + 1);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(i);
    setBarKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setTimeout(goNext, SLIDE_DURATION);
    return () => clearTimeout(t);
  }, [index, goNext]);

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* 画像 */}
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          variants={imageVariants}
          initial="enter"
          animate="visible"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority={index === 0}
            sizes="(min-width: 768px) 55vw, 100vw"
            className={[
              "object-cover",
              index % 2 === 0 ? "kenburns-a" : "kenburns-b",
            ].join(" ")}
          />
        </motion.div>
      </AnimatePresence>

      {/* 下からのグラデーション（テキスト可読性） */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent"
      />

      {/* プログレスバー + インジケーター */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="h-0.5 w-full bg-white/10">
          <div
            key={barKey}
            className="slider-progress-bar h-full bg-white/55"
            style={{ "--slide-duration": `${SLIDE_DURATION}ms` } as React.CSSProperties}
          />
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-3">
          <span className="label-en mr-1 text-white/25">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`スライド ${i + 1}`}
              className={[
                "h-0.5 transition-all duration-500",
                i === index ? "w-7 bg-white/75" : "w-3.5 bg-white/20 hover:bg-white/45",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
