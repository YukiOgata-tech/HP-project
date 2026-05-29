"use client";

import { useState } from "react";
import { deleteSession } from "../actions/session";
import { ConfirmModal } from "./ConfirmModal";
import { useLoading } from "../../lib/loading-context";

export function LogoutButton() {
  const [open, setOpen] = useState(false);
  const { setLoading } = useLoading();

  const handleLogout = () => {
    setOpen(false);
    setLoading(true);
    deleteSession();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[10px] font-bold uppercase tracking-widest text-red-500 transition-colors hover:text-red-700"
      >
        ログアウト
      </button>

      <ConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleLogout}
        title="ログアウトしますか？"
        description="ログアウトするとこの画面を離れ、再度ログインが必要になります。"
        confirmLabel="ログアウト"
        variant="danger"
      />
    </>
  );
}
