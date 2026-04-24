import { appendFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";

const g = globalThis as unknown as {
  __nlheDebugEvents?: unknown[];
};

function eventStore(): unknown[] {
  if (!g.__nlheDebugEvents) g.__nlheDebugEvents = [];
  return g.__nlheDebugEvents;
}

/** NDJSON one line per POST — used by `public/nlhe/poker.html` debug (same-origin, avoids mixed-content). */
export async function POST(request: Request) {
  const text = await request.text();
  const referer = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const logDir = "/Users/draketong/poker learning/.cursor";
  const logPath = "/Users/draketong/poker learning/.cursor/debug-1d80d9.log";
  const fallbackPath = "/Users/draketong/poker learning/debug-1d80d9-fallback.log";
  let parsed: unknown = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { raw: text };
  }
  const store = eventStore();
  store.push(parsed);
  if (store.length > 500) store.splice(0, store.length - 500);
  console.log("debug-nlhe-request", {
    referer,
    userAgent,
    textLength: text.length,
    textPreview: text.slice(0, 220),
  });
  console.log("debug-nlhe-event", parsed);
  try {
    await mkdir(logDir, { recursive: true });
    await appendFile(logPath, `${text}\n`);
    await appendFile(fallbackPath, `${text}\n`);
    return new NextResponse(null, {
      status: 204,
      headers: { "X-Debug-Route-Version": "v2" },
    });
  } catch (err) {
    console.error("debug-nlhe write failed", { logPath, error: String(err) });
    return NextResponse.json(
      { ok: false, error: String(err), logPath, fallbackPath },
      { status: 500, headers: { "X-Debug-Route-Version": "v2" } },
    );
  }
}

export async function GET() {
  return NextResponse.json({ events: eventStore() }, { status: 200 });
}

export async function DELETE() {
  g.__nlheDebugEvents = [];
  return NextResponse.json({ ok: true, events: [] }, { status: 200 });
}
