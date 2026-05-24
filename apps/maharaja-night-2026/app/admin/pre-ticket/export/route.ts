import { NextResponse } from "next/server";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { getSessionUser } from "../../actions/session";

const SITE_ID = process.env.SITE_ID!;

interface PreTicketExportRow {
  receiptId?: string;
  email?: string;
  name?: string;
  gender?: string;
  source?: string;
  sourceOther?: string;
  numberOfPeople?: number;
  referrer?: string;
  vipTable?: string;
  note?: string;
  status?: string;
  createdAt?: {
    toDate?: () => Date;
  };
}

const headers = [
  "受付ID",
  "申込日時",
  "お名前",
  "メールアドレス",
  "性別",
  "参加人数",
  "通常単価",
  "割引後単価",
  "割引額合計",
  "割引後合計",
  "流入経路",
  "流入経路その他",
  "紹介者",
  "VIP希望",
  "備考",
  "ステータス",
];

function getPricing(gender?: string) {
  if (gender === "WOMEN") {
    return { regular: 3500, discounted: 3000 };
  }

  return { regular: 4500, discounted: 4000 };
}

function formatDate(row: PreTicketExportRow) {
  return row.createdAt?.toDate ? row.createdAt.toDate().toLocaleString("ja-JP") : "";
}

function escapeCsv(value: string | number | undefined) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function yyyymmdd(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const snapshot = await getAdminDb()
    .collection("sites")
    .doc(SITE_ID)
    .collection("preTickets")
    .orderBy("createdAt", "desc")
    .get();

  const rows = snapshot.docs.map((doc) => doc.data() as PreTicketExportRow);
  const bodyRows = rows.map((row) => {
    const people = Number(row.numberOfPeople) || 1;
    const pricing = getPricing(row.gender);
    const discountTotal = (pricing.regular - pricing.discounted) * people;
    const discountedTotal = pricing.discounted * people;

    return [
      row.receiptId,
      formatDate(row),
      row.name,
      row.email,
      row.gender,
      people,
      pricing.regular,
      pricing.discounted,
      discountTotal,
      discountedTotal,
      row.source,
      row.sourceOther,
      row.referrer,
      row.vipTable,
      row.note,
      row.status,
    ];
  });

  const csv = `\uFEFF${[headers, ...bodyRows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\r\n")}`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="maharaja-pre-ticket-${yyyymmdd(new Date())}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
