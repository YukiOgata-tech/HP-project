"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmActionModalProps {
  action: (formData: FormData) => void | Promise<void>;
  triggerLabel: React.ReactNode;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  triggerClassName?: string;
  confirmClassName?: string;
  cancelClassName?: string;
}

export function ConfirmActionModal({
  action,
  triggerLabel,
  title,
  description,
  confirmLabel = "実行する",
  cancelLabel = "キャンセル",
  triggerClassName,
  confirmClassName,
  cancelClassName,
}: ConfirmActionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="閉じる"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 text-gray-950 shadow-2xl">
        <div className="space-y-2">
          <h2 id={titleId} className="text-lg font-bold leading-tight">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="text-sm font-medium leading-6 text-gray-600">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            className={
              cancelClassName ??
              "inline-flex h-10 items-center justify-center rounded-full border border-gray-300 bg-white px-4 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
            }
            onClick={() => setIsOpen(false)}
          >
            {cancelLabel}
          </button>
          <form action={action}>
            <button
              type="submit"
              className={
                confirmClassName ??
                "inline-flex h-10 w-full items-center justify-center rounded-full bg-gray-950 px-4 text-sm font-bold text-white transition-colors hover:bg-gray-800"
              }
            >
              {confirmLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setIsOpen(true)}>
        {triggerLabel}
      </button>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
