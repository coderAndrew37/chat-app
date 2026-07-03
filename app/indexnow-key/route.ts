// app/indexnow-key/route.ts
import { NextResponse } from "next/server";

// This can be any random 32-character hexadecimal string
const INDEXNOW_KEY = "velloearn_secure_crypto_token_2026"; 

export async function GET() {
  // IndexNow simply expects a plain text response containing the key itself
  return new NextResponse(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}