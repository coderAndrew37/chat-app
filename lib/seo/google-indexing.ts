// src/lib/seo/google-indexing.ts
import { google } from "googleapis";

type IndexingAction = "URL_UPDATED" | "URL_DELETED";

interface IndexingResult {
  success: boolean;
  url: string;
  message: string;
}

export async function notifyGoogleIndexing(
  url: string,
  action: IndexingAction = "URL_UPDATED"
): Promise<IndexingResult> {
  try {
    const email = process.env.GOLDEN_GOOGLE_EMAIL;
    const privateKey = process.env.GOLDEN_GOOGLE_PRIVATE_KEY;

    if (!email || !privateKey) {
      throw new Error("Missing Google Indexing API environment variables.");
    }

    const jwtClient = new google.auth.JWT({
      email,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/indexing"]
    });

    await jwtClient.authorize();

    const indexing = google.indexing({
      version: "v3",
      auth: jwtClient,
    });

    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: action,
      },
    });

    return {
      success: true,
      url,
      message: `Successfully notified Google. Status: ${response.statusText || "OK"}`,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error connecting to Google API.";
    console.error(`Google Indexing API error for URL [${url}]:`, error);
    return {
      success: false,
      url,
      message: errorMessage,
    };
  }
}