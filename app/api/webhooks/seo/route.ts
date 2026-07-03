// app/api/webhooks/seo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { notifyGoogleIndexing } from "@/lib/seo/google-indexing";
import { notifyIndexNow } from "@/lib/seo/indexnow";

const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velloearn.co.ke";
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

interface SanityWebhookPayload {
  slug?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Read the custom HTTP header we will specify in Sanity
    const apiKey = req.headers.get("x-api-key");
    
    if (SANITY_WEBHOOK_SECRET && apiKey !== SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized access token" }, { status: 401 });
    }

    const body = (await req.json()) as SanityWebhookPayload | null;
    const slug = body?.slug;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug parameter in request payload" }, { status: 400 });
    }

    const fullTargetUrl = `${NEXT_PUBLIC_SITE_URL}/blog/${slug}`;

    const [googleResult, indexNowResult] = await Promise.all([
      notifyGoogleIndexing(fullTargetUrl, "URL_UPDATED"),
      notifyIndexNow(fullTargetUrl),
    ]);

    return NextResponse.json({
      processed: true,
      url: fullTargetUrl,
      google: { success: googleResult.success, message: googleResult.message },
      indexNow: { success: indexNowResult.success, message: indexNowResult.message },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server crash";
    console.error("SEO Webhook orchestration runtime crash:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}