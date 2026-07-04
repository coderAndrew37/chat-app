// src/lib/seo/indexnow.ts

interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
}

// Keep this in sync with app/indexnow-key/route.ts.
// Consider extracting to a shared const file (e.g. src/lib/seo/config.ts)
// so the two files can never drift out of sync.
const INDEXNOW_KEY = "velloearn_secure_crypto_token_2026";

export async function notifyIndexNow(url: string): Promise<IndexNowResult> {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname; // dynamically matches whatever domain the URL actually uses
    const keyLocation = `${parsedUrl.protocol}//${host}/indexnow-key`;

    const endpoint = "https://api.indexnow.org/indexnow";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation,
        urlList: [url],
      }),
    });

    let message: string;
    if (response.ok) {
      message = "IndexNow notification sent successfully.";
    } else {
      const responseBody = await response.text().catch(() => "");
      message = `IndexNow failed with status: ${response.status} ${response.statusText}${
        responseBody ? ` — ${responseBody}` : ""
      }`;
    }

    return {
      success: response.ok,
      status: response.status,
      message,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal network failure pinging IndexNow API.";
    console.error("IndexNow submission execution error:", error);
    return {
      success: false,
      status: 500,
      message: errorMessage,
    };
  }
}