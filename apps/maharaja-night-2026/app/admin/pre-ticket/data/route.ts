import { NextResponse } from "next/server";
import { getAdminDb } from "@client-sites/lib/cms/firebase-admin";
import { getSessionUser } from "../../actions/session";

const SITE_ID = process.env.SITE_ID!;

interface PreTicketData {
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

function serializeTicket(id: string, data: PreTicketData) {
  const createdAt = data.createdAt?.toDate?.() ?? null;

  return {
    id,
    receiptId: data.receiptId ?? "",
    email: data.email ?? "",
    name: data.name ?? "",
    gender: data.gender ?? "",
    source: data.source ?? "",
    sourceOther: data.sourceOther ?? "",
    numberOfPeople: Number(data.numberOfPeople) || 1,
    referrer: data.referrer ?? "",
    vipTable: data.vipTable ?? "",
    note: data.note ?? "",
    status: data.status ?? "",
    createdAtMs: createdAt?.getTime() ?? 0,
    createdAtLabel: createdAt?.toLocaleString("ja-JP") ?? "",
  };
}

export async function GET(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const since = Number(searchParams.get("since") ?? 0);
  const collection = getAdminDb()
    .collection("sites")
    .doc(SITE_ID)
    .collection("preTickets");

  const query = Number.isFinite(since) && since > 0
    ? collection.where("createdAt", ">", new Date(since)).orderBy("createdAt", "desc")
    : collection.orderBy("createdAt", "desc");

  const snapshot = await query.get();
  const tickets = snapshot.docs.map((doc) => serializeTicket(doc.id, doc.data() as PreTicketData));

  return NextResponse.json({
    tickets,
    fetchedAt: Date.now(),
  });
}
