"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../lib/theme";
import { useLoading } from "../lib/loading-context";

/* ─── フレーム定数 (viewBox 座標系) ─────────────── */
const FW = 520;
const FH = 300;
const P1 = 10;       // 外枠パディング
const P2 = 24;       // 内枠パディング
const DS = 7;        // ダイヤ半径
const LB = 20;       // L字ブラケット長

const ox = P1, oy = P1, ow = FW - 2 * P1, oh = FH - 2 * P1;
const outerPerim = 2 * (ow + oh);
const ix = P2, iy = P2, iw = FW - 2 * P2, ih = FH - 2 * P2;

// 上下センター装飾の y 座標
const topOrnY = iy + 18;
const botOrnY = iy + ih - 18;

export function PageLoader() {
  const { loading } = useLoading();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/images/logo/original-logo-white-text.jpg"
    : "/images/logo/original-logo-black-text.jpg";
  const bg      = isDark ? "#0c0c0c" : "#f9f9f7";
  const accent  = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.38)";
  const sub     = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const shimmer = isDark
    ? "linear-gradient(110deg,transparent 25%,rgba(255,255,255,0.07) 50%,transparent 75%)"
    : "linear-gradient(110deg,transparent 25%,rgba(255,255,255,0.72) 50%,transparent 75%)";

  /* 外枠コーナー */
  const outerCorners: [number, number][] = [
    [ox, oy], [ox + ow, oy], [ox + ow, oy + oh], [ox, oy + oh],
  ];

  /* 辺中点ティック (外枠を横切る小線) */
  const midTicks = [
    [FW/2 - 8, oy,      FW/2 + 8, oy     ],
    [ox + ow,  FH/2-8,  ox + ow,  FH/2+8 ],
    [FW/2 - 8, oy + oh, FW/2 + 8, oy + oh],
    [ox,       FH/2-8,  ox,       FH/2+8 ],
  ] as [number,number,number,number][];

  /* 内枠コーナー L ブラケット */
  const lBrackets = [
    `M ${ix} ${iy+LB} L ${ix} ${iy} L ${ix+LB} ${iy}`,
    `M ${ix+iw-LB} ${iy} L ${ix+iw} ${iy} L ${ix+iw} ${iy+LB}`,
    `M ${ix+iw} ${iy+ih-LB} L ${ix+iw} ${iy+ih} L ${ix+iw-LB} ${iy+ih}`,
    `M ${ix+LB} ${iy+ih} L ${ix} ${iy+ih} L ${ix} ${iy+ih-LB}`,
  ];

  return createPortal(
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          {/* レスポンシブコンテナ (max 520px, モバイルは 90vw) */}
          <div
            className="relative mx-4 w-full"
            style={{ maxWidth: FW, aspectRatio: `${FW}/${FH}` }}
          >

            {/* ── SVG 装飾フレーム ───────────────────── */}
            <svg
              viewBox={`0 0 ${FW} ${FH}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              overflow="visible"
            >
              {/* 外枠コーナーダイヤ — spring で弾む */}
              {outerCorners.map(([cx, cy], i) => (
                <motion.polygon
                  key={`cd-${i}`}
                  points={`${cx},${cy-DS} ${cx+DS},${cy} ${cx},${cy+DS} ${cx-DS},${cy}`}
                  fill={accent}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                  transition={{ duration: 0.32, delay: 0.06 + i * 0.05, ease: [0.34,1.56,0.64,1] }}
                />
              ))}

              {/* 外枠ボーダー — 時計回りに描画 */}
              <motion.rect
                x={ox} y={oy} width={ow} height={oh}
                fill="none" stroke={accent} strokeWidth={0.85}
                strokeDasharray={outerPerim}
                initial={{ strokeDashoffset: outerPerim }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.15, ease: "easeInOut", delay: 0.08 }}
              />

              {/* 辺中点ティック */}
              {midTicks.map(([x1,y1,x2,y2], i) => (
                <motion.line
                  key={`mt-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={accent} strokeWidth={1.4}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ transformOrigin: `${(x1+x2)/2}px ${(y1+y2)/2}px` }}
                  transition={{ delay: 0.62 + i * 0.04, duration: 0.2 }}
                />
              ))}

              {/* 内枠ボーダー */}
              <motion.rect
                x={ix} y={iy} width={iw} height={ih}
                fill="none" stroke={sub} strokeWidth={0.4}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.66, duration: 0.4 }}
              />

              {/* 内枠 L ブラケット — pathLength で描画 */}
              {lBrackets.map((d, i) => (
                <motion.path
                  key={`lb-${i}`}
                  d={d}
                  fill="none" stroke={accent} strokeWidth={0.75}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.72 + i * 0.05, duration: 0.3, ease: "easeOut" }}
                />
              ))}

              {/* 上センター装飾 ────◆──── */}
              {[-1, 1].map((dir) => (
                <motion.line
                  key={`tl-${dir}`}
                  x1={FW/2 + dir * 6} y1={topOrnY}
                  x2={FW/2 + dir * (iw/2 - LB - 4)} y2={topOrnY}
                  stroke={accent} strokeWidth={0.6}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: `${FW/2 + dir * 6}px ${topOrnY}px` }}
                  transition={{ delay: 0.84, duration: 0.32 }}
                />
              ))}
              <motion.polygon
                points={`${FW/2},${topOrnY-4.5} ${FW/2+4.5},${topOrnY} ${FW/2},${topOrnY+4.5} ${FW/2-4.5},${topOrnY}`}
                fill={accent}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ transformOrigin: `${FW/2}px ${topOrnY}px` }}
                transition={{ delay: 0.9, duration: 0.22, ease: [0.34,1.56,0.64,1] }}
              />

              {/* 下センター装飾 ────◆──── */}
              {[-1, 1].map((dir) => (
                <motion.line
                  key={`bl-${dir}`}
                  x1={FW/2 + dir * 6} y1={botOrnY}
                  x2={FW/2 + dir * (iw/2 - LB - 4)} y2={botOrnY}
                  stroke={accent} strokeWidth={0.6}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ transformOrigin: `${FW/2 + dir * 6}px ${botOrnY}px` }}
                  transition={{ delay: 0.87, duration: 0.32 }}
                />
              ))}
              <motion.polygon
                points={`${FW/2},${botOrnY-4.5} ${FW/2+4.5},${botOrnY} ${FW/2},${botOrnY+4.5} ${FW/2-4.5},${botOrnY}`}
                fill={accent}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{ transformOrigin: `${FW/2}px ${botOrnY}px` }}
                transition={{ delay: 0.93, duration: 0.22, ease: [0.34,1.56,0.64,1] }}
              />
            </svg>

            {/* ── ロゴ ──────────────────────────────── */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.44, ease: "easeOut" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="RISPLENDERE BROLETTO"
                style={{ width: "66%", height: "auto", display: "block" }}
              />
            </motion.div>

            {/* ── シマースウィープ ────────────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
              <motion.div
                style={{ position: "absolute", inset: 0, background: shimmer }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 2.2,
                  delay: 1.1,
                  repeat: Infinity,
                  repeatDelay: 2.8,
                  ease: "easeInOut",
                }}
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
