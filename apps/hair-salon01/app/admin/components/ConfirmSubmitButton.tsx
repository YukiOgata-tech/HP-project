"use client";

import { useRef, useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

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

  const handleConfirm = () => {
    setOpen(false);
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
