"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { Download, FileDown } from "lucide-react";
import { MaharajaLoadingOverlay } from "@/components/ui/MaharajaLoadingOverlay";

interface ReceiptExportButtonsProps {
  fileName: string;
  targetId: string;
}

function getTarget(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) {
    throw new Error("受付カードが見つかりません。");
  }
  return target;
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export function ReceiptExportButtons({ fileName, targetId }: ReceiptExportButtonsProps) {
  const [savingKind, setSavingKind] = useState<"image" | "pdf" | null>(null);
  const isSaving = savingKind !== null;

  const saveImage = async () => {
    flushSync(() => setSavingKind("image"));
    try {
      await waitForPaint();
      const dataUrl = await toPng(getTarget(targetId), {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#070508",
      });
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setSavingKind(null);
    }
  };

  const savePdf = async () => {
    flushSync(() => setSavingKind("pdf"));
    try {
      await waitForPaint();
      const target = getTarget(targetId);
      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#070508",
      });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [100, 176],
      });
      const width = 92;
      const height = (target.offsetHeight / target.offsetWidth) * width;
      pdf.addImage(dataUrl, "PNG", 4, 4, width, Math.min(height, 168));
      pdf.save(`${fileName}.pdf`);
    } finally {
      setSavingKind(null);
    }
  };

  return (
    <>
      <MaharajaLoadingOverlay
        show={isSaving}
        label={savingKind === "pdf" ? "PDFを作成中です" : "画像を保存中です"}
      />
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={saveImage}
          disabled={isSaving}
          className="inline-flex h-9 sm:h-11 items-center justify-center gap-2 rounded-full bg-[#d9b84f] px-5 text-sm font-black text-black transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          <Download className="size-4" />
          {savingKind === "image" ? "保存中..." : "画像保存"}
        </button>
        <button
          type="button"
          onClick={savePdf}
          disabled={isSaving}
          className="inline-flex h-9 sm:h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 text-sm font-black text-white transition-colors hover:bg-white/14 disabled:cursor-wait disabled:opacity-60"
        >
          <FileDown className="size-4" />
          {savingKind === "pdf" ? "作成中..." : "PDF保存"}
        </button>
      </div>
    </>
  );
}
