"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "実行する",
  cancelLabel = "キャンセル",
  variant = "danger",
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!open || !mounted) return null;

  const confirmCls =
    variant === "danger"
      ? "w-full bg-red-600 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700"
      : "w-full bg-(--cta) px-4 py-3 text-xs font-bold uppercase tracking-widest text-(--cta-text) transition-opacity hover:opacity-75";

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* モーダル本体 */}
      <div className="relative z-10 w-full max-w-sm border border-(--border) bg-(--bg)">
        {/* ヘッダー */}
        <div className="border-b border-(--border) px-5 py-4">
          <p className={`label-en text-[10px] ${variant === "danger" ? "text-red-500" : "text-(--fg-subtle)"}`}>
            {variant === "danger" ? "Confirm Delete" : "Confirm"}
          </p>
          <h2 className="mt-1 font-serif text-lg font-bold text-(--fg)">{title}</h2>
        </div>

        {/* 説明文 */}
        {description && (
          <div className="px-5 py-4">
            <p className="text-xs leading-6 text-(--fg-subtle)">{description}</p>
          </div>
        )}

        {/* アクション */}
        <div className={`flex border-t border-(--border) ${!description ? "mt-0" : ""}`}>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border-r border-(--border) px-4 py-3 text-xs font-bold uppercase tracking-widest text-(--fg-subtle) transition-colors hover:bg-(--card-off) hover:text-(--fg)"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 ${confirmCls}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
