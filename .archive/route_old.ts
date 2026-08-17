import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body?.question;

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    let agentUrl = process.env.AGENT_REST_URL;

    // If AGENT_REST_URL isn't provided, try to construct it from env vars
    if (!agentUrl) {
      const projectIdEnv = process.env.PROJECT_ID;
      const agentLocation = process.env.AGENT_LOCATION;
      const agentId = process.env.AGENT_ID;
      if (!projectIdEnv || !agentLocation || !agentId) {
        return NextResponse.json(
          { error: "Server not configured: set AGENT_REST_URL or PROJECT_ID/AGENT_LOCATION/AGENT_ID." },
          { status: 500 }
        );
      }

      // DataChat REST chat endpoint (Geminidata Analytics)
      // e.g. https://geminidataanalytics.googleapis.com/v1/projects/PROJECT_ID/locations/AGENT_LOCATION/dataAgents/AGENT_ID:chat
      agentUrl = `https://geminidataanalytics.googleapis.com/v1/projects/${projectIdEnv}/locations/${agentLocation}/dataAgents/${agentId}:chat`;
    }

    const projectId = process.env.PROJECT_ID;
    const location = process.env.LOCATION || "global";
    if (!projectId) {
      return NextResponse.json({ error: "Server not configured: set PROJECT_ID." }, { status: 500 });
    }

    // Support two auth modes:
    // - SERVICE_ACCOUNT_KEY (base64 or raw JSON) to mint OAuth2 access tokens
    // - AGENT_API_KEY to call an API-key-protected endpoint
    const serviceAccountRaw = process.env.SERVICE_ACCOUNT_KEY;
    const apiKey = process.env.AGENT_API_KEY;

    let headers: Record<string, string> = { "Content-Type": "application/json" };

    if (serviceAccountRaw) {
      // Try parse base64 first, fall back to raw JSON
      let cred: any;
      try {
        cred = JSON.parse(Buffer.from(serviceAccountRaw, "base64").toString("utf8"));
      } catch (e) {
        try {
          cred = JSON.parse(serviceAccountRaw);
        } catch (e2) {
          return NextResponse.json({ error: "Invalid SERVICE_ACCOUNT_KEY format" }, { status: 500 });
        }
      }

      const auth = new GoogleAuth({ credentials: cred, scopes: ["https://www.googleapis.com/auth/cloud-platform"] });
      const client = await auth.getClient();
      const tokenResponse = await client.getAccessToken();
      const token = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;
      if (!token) return NextResponse.json({ error: "Failed to obtain access token" }, { status: 500 });

      headers.Authorization = `Bearer ${token}`;
    }

    // Build fetch URL (append api key if provided)
    const fetchUrl = apiKey ? `${agentUrl}${agentUrl.includes("?") ? "&" : "?"}key=${encodeURIComponent(apiKey)}` : agentUrl;

    // Build DataChat-style request body
    const parent = `projects/${projectId}/locations/${location}`;
    const chatRequestBody = {
      parent,
      messages: [{ user_message: { text: question } }],
    };

    const res = await fetch(fetchUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(chatRequestBody),
    });

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data, { status: res.status });
    }

    // Upstream returned non-JSON (HTML or plain text). Return body text for debugging.
    const text = await res.text();
    return NextResponse.json(
      { error: "Upstream returned non-JSON response", status: res.status, body: text },
      { status: 502 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Internal server error", details: String(err?.message || err) }, { status: 500 });
  }
}
