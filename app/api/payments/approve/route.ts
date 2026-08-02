import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin"; // service-role client

const hash = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

export async function POST(req: NextRequest) {
  const { submissionId } = await req.json();
  const supabase = createAdminClient();

  const { data: submission, error } = await supabase
    .from("payment_submissions")
    .update({ status: "approved", approved_at: new Date().toISOString() })
    .eq("id", submissionId)
    .select("*, profiles!payment_submissions_user_id_fkey(id, fbclid, gclid, phone, email)")
    .single();

  if (error || !submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  await supabase.from("profiles").update({ is_activated: true }).eq("id", submission.user_id);

  const p = submission.profiles;

  if (p?.fbclid) {
    await fetch(
      `https://graph.facebook.com/v20.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            event_name: "Activated",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            user_data: { ph: [hash(p.phone)], em: [hash(p.email)] },
            custom_data: { currency: "KES", value: submission.amount },
          }],
        }),
      }
    );
  }

  if (p?.gclid) {
    await supabase.from("google_ads_conversions_queue").insert({
      gclid: p.gclid,
      conversion_time: new Date().toISOString(),
      conversion_value: submission.amount,
    });
  }

  return NextResponse.json({ success: true });
}