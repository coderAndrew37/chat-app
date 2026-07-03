// src/lib/seo/indexnow.ts

interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
}

export async function notifyIndexNow(url: string): Promise<IndexNowResult> {
  const host = "velloearn.co.ke";
  const key = "velloearn_secure_crypto_token_2026"; 
  const keyLocation = `https://${host}/indexnow-key`;

  try {
    const endpoint = "https://api.indexnow.org/indexnow";
    
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: host,
        key: key,
        keyLocation: keyLocation,
        urlList: [url],
      }),
    });

    return {
      success: response.ok,
      status: response.status,
      message: response.ok 
        ? "IndexNow notification sent successfully." 
        : `IndexNow failed with status: ${response.statusText}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal network failure pinging IndexNow API.";
    console.error("IndexNow submission execution error:", error);
    return {
      success: false,
      status: 500,
      message: errorMessage,
    };
  }
}