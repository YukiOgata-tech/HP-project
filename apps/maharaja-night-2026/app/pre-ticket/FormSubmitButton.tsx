"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync, useFormStatus } from "react-dom";
import { MaharajaLoadingOverlay } from "@/components/MaharajaLoadingOverlay";

interface FormSubmitButtonProps {
  label: string;
  pendingLabel: string;
  className?: string;
}

export function FormSubmitButton({
  label,
  pendingLabel,
  className = "",
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  const [started, setStarted] = useState(false);
  const hasPendingStarted = useRef(false);
  const fallbackTimer = useRef<number | null>(null);
  const showLoading = started || pending;

  useEffect(() => {
    if (pending) {
      hasPendingStarted.current = true;
      if (fallbackTimer.current) {
        window.clearTimeout(fallbackTimer.current);
        fallbackTimer.current = null;
      }
      return;
    }

    if (hasPendingStarted.current) {
      const timer = window.setTimeout(() => {
        setStarted(false);
        hasPendingStarted.current = false;
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [pending]);

  useEffect(() => {
    return () => {
      if (fallbackTimer.current) {
        window.clearTimeout(fallbackTimer.current);
      }
    };
  }, []);

  return (
    <>
      <MaharajaLoadingOverlay show={showLoading} label={pendingLabel} />
      <button
        type="submit"
        disabled={pending}
        onClick={(event) => {
          const form = event.currentTarget.form;
          if (form && !form.checkValidity()) return;
          flushSync(() => setStarted(true));
          if (fallbackTimer.current) {
            window.clearTimeout(fallbackTimer.current);
          }
          fallbackTimer.current = window.setTimeout(() => {
            if (!hasPendingStarted.current) {
              setStarted(false);
            }
          }, 1200);
        }}
        className={[
          "inline-flex items-center justify-center disabled:cursor-wait disabled:opacity-70",
          className,
        ].join(" ")}
      >
        {showLoading ? pendingLabel : label}
      </button>
    </>
  );
}
