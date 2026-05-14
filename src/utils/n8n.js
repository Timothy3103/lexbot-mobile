import Constants from "expo-constants";

const DEFAULT_N8N_WEBHOOK_URL =
  "https://lexbot-server.onrender.com/webhook/chat";

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra ?? {};

export const N8N_WEBHOOK_URL = extra.N8N_WEBHOOK_URL ?? DEFAULT_N8N_WEBHOOK_URL;

export async function postToN8n(payload) {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(
      `n8n webhook returned ${response.status}: ${bodyText || "No response body"}`,
    );
  }

  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
