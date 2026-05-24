"use client";

import { useEffect, useRef } from "react";

export function PreTicketSpamFields() {
  const startedAtRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtRef.current) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <>
      <input ref={startedAtRef} type="hidden" name="formStartedAt" />
      <div className="hidden" aria-hidden="true">
        <label>
          Web site
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}
