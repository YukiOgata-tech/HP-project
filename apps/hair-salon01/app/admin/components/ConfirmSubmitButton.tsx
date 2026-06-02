"use client";

import { useRef, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { useLoading } from "../../lib/loading-context";

interface ConfirmSubmitButtonProps {
  className?: string;
  children: React.ReactNode;
  confirmMessage: string;
  confirmDescription?: string;
  confirmLabel?: string;
}

export function ConfirmSubmitButton({
  className,
  children,
  confirmMessage,
  confirmDescription = "この操作は元に戻せません。",
  confirmLabel = "削除する",
}: ConfirmSubmitButtonProps) {
  const [open, setOpen] = useState(false);
  const hiddenRef = useRef<HTMLButtonElement>(null);
  const { setLoading } = useLoading();

  const handleConfirm = () => {
    setOpen(false);
    setLoading(true);
    hiddenRef.current?.click();
  };

  return (
    <>
      {/* 表示ボタン — クリックでモーダルを開く */}
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {/* 実際の submit（非表示） */}
      <button ref={hiddenRef} type="submit" className="hidden" aria-hidden="true" />

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        title={confirmMessage}
        description={confirmDescription}
        confirmLabel={confirmLabel}
        variant="danger"
      />
    </>
  );
}
