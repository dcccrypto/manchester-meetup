import { NextResponse } from "next/server";

const COLLECTOR = process.env.COLLECTOR_URL || "http://127.0.0.1:18801";
const PROJECT = "manchester";

async function fetchJSON(path: string) {
  try {
    const r = await fetch(`${COLLECTOR}${path}`, { next: { revalidate: 30 } });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

export async function GET() {
  const [dashboard, allMessages] = await Promise.all([
    fetchJSON(`/api/dashboard?project_id=${PROJECT}`),
    fetchAllMessages(),
  ]);

  if (!dashboard) {
    return NextResponse.json({ error: "Collector API unavailable" }, { status: 502 });
  }

  return NextResponse.json({
    tasks: dashboard.tasks || [],
    health: dashboard.health || {},
    unreadMessages: dashboard.unreadMessages || [],
    costLast24h: dashboard.costLast24h || [],
    systemSnapshot: dashboard.systemSnapshot || { session_details: [], cron_jobs: { jobs: [] } },
    recentActivity: dashboard.recentActivity || [],
    allMessages: allMessages,
  });
}

async function fetchAllMessages() {
  const agents = ["manchester-gaskell", "manchester-bd", "manchester-marketing", "manchester-pr", "manchester-qa", "manchester-sysadmin", "manchester-webmaster", "system"];
  const seen = new Set<number>();
  const all: unknown[] = [];

  for (const agent of agents) {
    for (const dir of ["from_agent", "to_agent"]) {
      const data = await fetchJSON(`/api/messages?project_id=${PROJECT}&${dir}=${agent}&limit=100`);
      if (data?.messages) {
        for (const m of data.messages) {
          if (!seen.has(m.id)) { seen.add(m.id); all.push(m); }
        }
      }
    }
  }
  return all.sort((a: any, b: any) => a.id - b.id);
}
