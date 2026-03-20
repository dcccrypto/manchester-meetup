"use client";

import { useState, useEffect, useMemo } from "react";

/* ── Types ── */
interface HealthData {
  gateway_ok: number; discord_ok: number; browser_ok: number; ollama_ok: number;
  disk_percent: number; disk_free: string; memory_status: string; load_avg: string;
  uptime: string; agent_statuses: Record<string, { status: string }>;
  created_at: string; [k: string]: unknown;
}
interface Task { id: string; title: string; status: string; priority: string; assigned_to: string; created_by: string; created_at: string; updated_at: string; [k: string]: unknown; }
interface Message { id: number; from_agent: string; to_agent: string; message: string; read: number; created_at: string; }
interface CostEntry { agent_id: string; model: string; provider: string; hour: string; requests: number; tokens_input: number; tokens_output: number; cache_read: number; cache_write: number; cost_usd: number; }
interface SessionDetail { agent: string; key: string; model: string; tokens: number; contextLimit: number; contextPercent: number | null; kind: string; channel: string; displayName: string; label?: string; updatedAt: number; }
interface CronJob { id: string; agentId: string; name: string; enabled: boolean; schedule: { kind: string; expr: string }; state: { lastRunAtMs?: number; lastRunStatus?: string; lastDurationMs?: number; consecutiveErrors?: number; nextRunAtMs?: number; lastError?: string }; }
interface SystemSnapshot { total_sessions: number; total_tokens_all_agents: number; active_agents: number; gateway_version: string; os_info: string; node_version: string; default_model: string; session_details: SessionDetail[]; cron_jobs: { jobs: CronJob[] }; created_at: string; }
interface DashboardData { tasks: Task[]; health: HealthData; unreadMessages: Message[]; costLast24h: CostEntry[]; systemSnapshot: SystemSnapshot; recentActivity: { id: number; agent_id: string; created_at: string }[]; }

/* ── Agent colors ── */
const agentColors: Record<string, { bg: string; text: string; dot: string }> = {
  "manchester-gaskell": { bg: "bg-amber-500/15", text: "text-amber-400", dot: "bg-amber-500" },
  "manchester-bd": { bg: "bg-blue-500/15", text: "text-blue-400", dot: "bg-blue-500" },
  "manchester-marketing": { bg: "bg-pink-500/15", text: "text-pink-400", dot: "bg-pink-500" },
  "manchester-pr": { bg: "bg-violet-500/15", text: "text-violet-400", dot: "bg-violet-500" },
  "manchester-qa": { bg: "bg-cyan-500/15", text: "text-cyan-400", dot: "bg-cyan-500" },
  "manchester-sysadmin": { bg: "bg-green-500/15", text: "text-green-400", dot: "bg-green-500" },
  "manchester-webmaster": { bg: "bg-orange-500/15", text: "text-orange-400", dot: "bg-orange-500" },
  "manchester-designer": { bg: "bg-rose-500/15", text: "text-rose-400", dot: "bg-rose-500" },
};
function ac(a: string) { return agentColors[a] || { bg: "bg-zinc-500/15", text: "text-zinc-400", dot: "bg-zinc-500" }; }
function shortName(a: string) { return a.replace("manchester-", "").charAt(0).toUpperCase() + a.replace("manchester-", "").slice(1); }
function fmtMs(ms: number) { return ms < 1000 ? `${ms}ms` : ms < 60000 ? `${(ms/1000).toFixed(1)}s` : `${(ms/60000).toFixed(1)}m`; }
function fmtCost(c: number) { return `$${c.toFixed(2)}`; }
function fmtTokens(t: number) { return t > 1000000 ? `${(t/1000000).toFixed(1)}M` : t > 1000 ? `${(t/1000).toFixed(0)}K` : `${t}`; }
function fmtTime(ts: number) { const d = new Date(ts); return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }); }
function fmtDate(s: string) { const d = new Date(s.includes("Z") || s.includes("+") ? s : s + "Z"); return d.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); }

/* ── Sparkline (pure CSS bar chart) ── */
function MiniBar({ values, color, height = 32 }: { values: number[]; color: string; height?: number }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-px" style={{ height }}>
      {values.map((v, i) => (
        <div key={i} className={`flex-1 rounded-sm ${color}`} style={{ height: `${Math.max((v / max) * 100, 4)}%`, minWidth: 3, opacity: 0.7 + (v / max) * 0.3 }} />
      ))}
    </div>
  );
}

/* ── Status pill ── */
function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${ok ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"}`}>
      <div className={`w-2 h-2 rounded-full ${ok ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
      <span className={`text-xs font-semibold ${ok ? "text-green-400" : "text-red-400"}`}>{label}</span>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"overview" | "agents" | "costs" | "sessions" | "cron">("overview");

  useEffect(() => {
    fetch("/api/collector")
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.error) throw new Error(); setData(d); setLoading(false); })
      .catch(() => {
        // Fallback to baked-in data
        import("./data.json").then(d => { setData(d.default as unknown as DashboardData); setLoading(false); }).catch(() => setLoading(false));
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
      <div className="text-zinc-500 animate-pulse text-lg">Loading Collector data...</div>
    </div>
  );
  if (!data) return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
      <div className="text-red-400 text-lg">Failed to connect to Collector API</div>
    </div>
  );

  const { tasks, health, unreadMessages, costLast24h, systemSnapshot } = data;
  const cronJobs = systemSnapshot.cron_jobs.jobs;
  const sessions = systemSnapshot.session_details;

  // Aggregations
  const totalCost24h = costLast24h.reduce((s, c) => s + c.cost_usd, 0);
  const totalRequests24h = costLast24h.reduce((s, c) => s + c.requests, 0);
  const totalTokensOut24h = costLast24h.reduce((s, c) => s + c.tokens_output, 0);
  const tasksByStatus = { backlog: 0, "in-progress": 0, done: 0 };
  tasks.forEach(t => { const s = t.status.toLowerCase().replace(/[_ ]/g, "-"); if (s === "done") tasksByStatus.done++; else if (s === "in-progress") tasksByStatus["in-progress"]++; else tasksByStatus.backlog++; });

  // Cost by agent
  const costByAgent: Record<string, number> = {};
  const requestsByAgent: Record<string, number> = {};
  costLast24h.forEach(c => {
    costByAgent[c.agent_id] = (costByAgent[c.agent_id] || 0) + c.cost_usd;
    requestsByAgent[c.agent_id] = (requestsByAgent[c.agent_id] || 0) + c.requests;
  });

  // Cost by hour (for chart)
  const hourlyBuckets: Record<string, number> = {};
  costLast24h.forEach(c => { const h = c.hour.slice(11, 13); hourlyBuckets[h] = (hourlyBuckets[h] || 0) + c.cost_usd; });
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const hourlyCosts = hours.map(h => hourlyBuckets[h] || 0);

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: "📊" },
    { key: "agents" as const, label: "Agents", icon: "🤖" },
    { key: "costs" as const, label: "Costs", icon: "💰" },
    { key: "sessions" as const, label: "Sessions", icon: "🔗" },
    { key: "cron" as const, label: "Cron Jobs", icon: "⏰" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200">
      {/* Header */}
      <header className="px-6 md:px-8 py-5 border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#09090b]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              📡 OpenTelemetry Dashboard
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Collector API · {systemSnapshot.gateway_version} · {systemSnapshot.os_info} · {systemSnapshot.node_version}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <StatusPill ok={!!health.gateway_ok} label="Gateway" />
              <StatusPill ok={!!health.discord_ok} label="Discord" />
              <StatusPill ok={!!health.browser_ok} label="Browser" />
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 md:px-8 border-b border-zinc-800 flex gap-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${tab === t.key ? "border-cyan-500 text-cyan-400" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Top KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: "Total Sessions", value: systemSnapshot.total_sessions, color: "text-cyan-400" },
                { label: "Active Agents", value: systemSnapshot.active_agents, color: "text-green-400" },
                { label: "Total Tokens", value: fmtTokens(systemSnapshot.total_tokens_all_agents), color: "text-violet-400" },
                { label: "Tasks", value: tasks.length, color: "text-amber-400" },
                { label: "Done", value: tasksByStatus.done, color: "text-green-400" },
                { label: "In Progress", value: tasksByStatus["in-progress"], color: "text-yellow-400" },
                { label: "Backlog", value: tasksByStatus.backlog, color: "text-zinc-400" },
                { label: "Unread Msgs", value: unreadMessages.length, color: "text-red-400" },
              ].map((kpi, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                  <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-[0.6rem] text-zinc-500 mt-1 uppercase tracking-wider">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Cost + System row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Cost 24h */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Cost (24h)</h3>
                  <span className="text-xl font-bold text-emerald-400">{fmtCost(totalCost24h)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center"><div className="text-sm font-bold text-zinc-300">{totalRequests24h}</div><div className="text-[0.6rem] text-zinc-600">Requests</div></div>
                  <div className="text-center"><div className="text-sm font-bold text-zinc-300">{fmtTokens(totalTokensOut24h)}</div><div className="text-[0.6rem] text-zinc-600">Tokens Out</div></div>
                </div>
                <MiniBar values={hourlyCosts} color="bg-emerald-500" height={40} />
                <div className="flex justify-between mt-1"><span className="text-[0.5rem] text-zinc-700">00:00</span><span className="text-[0.5rem] text-zinc-700">23:00</span></div>
              </div>

              {/* System Health */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">System Health</h3>
                <div className="space-y-3">
                  {[
                    { label: "Disk", value: `${health.disk_percent}% (${health.disk_free} free)`, ok: health.disk_percent < 80 },
                    { label: "Memory", value: health.memory_status, ok: health.memory_status !== "critical" },
                    { label: "Load", value: health.load_avg, ok: parseFloat(health.load_avg) < 4 },
                    { label: "Uptime", value: health.uptime, ok: true },
                    { label: "Model", value: systemSnapshot.default_model, ok: true },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">{s.label}</span>
                      <span className={`text-xs font-semibold ${s.ok ? "text-zinc-300" : "text-red-400"}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Breakdown */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Task Pipeline</h3>
                <div className="space-y-3">
                  {[
                    { label: "Backlog", count: tasksByStatus.backlog, color: "bg-zinc-500", pct: tasksByStatus.backlog / tasks.length * 100 },
                    { label: "In Progress", count: tasksByStatus["in-progress"], color: "bg-amber-500", pct: tasksByStatus["in-progress"] / tasks.length * 100 },
                    { label: "Done", count: tasksByStatus.done, color: "bg-green-500", pct: tasksByStatus.done / tasks.length * 100 },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-zinc-400">{s.label}</span>
                        <span className="text-xs font-bold text-zinc-300">{s.count}</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Status Grid */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Agent Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {Object.entries(health.agent_statuses).filter(([k]) => k !== "main").map(([agent, info]) => {
                  const c = ac(agent);
                  const cost = costByAgent[agent] || 0;
                  const reqs = requestsByAgent[agent] || 0;
                  return (
                    <div key={agent} className={`rounded-lg border border-zinc-800 p-3 ${c.bg}`}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className={`w-2 h-2 rounded-full ${(info as {status:string}).status === "active" ? "bg-green-500 animate-pulse" : "bg-zinc-600"}`} />
                        <span className={`text-[0.65rem] font-bold ${c.text}`}>{shortName(agent)}</span>
                      </div>
                      <div className="text-[0.55rem] text-zinc-500">{fmtCost(cost)} · {reqs} reqs</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Unread Messages */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Unread Messages ({unreadMessages.length})</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {unreadMessages.slice(0, 10).map(m => (
                  <div key={m.id} className="flex gap-3 py-2 border-b border-zinc-800/50">
                    <div className={`w-1.5 rounded-full ${ac(m.from_agent).dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[0.65rem] font-semibold ${ac(m.from_agent).text}`}>{shortName(m.from_agent)}</span>
                        <span className="text-[0.55rem] text-zinc-600">→ {shortName(m.to_agent)}</span>
                        <span className="text-[0.55rem] text-zinc-700 ml-auto">{fmtDate(m.created_at)}</span>
                      </div>
                      <p className="text-[0.7rem] text-zinc-500 truncate mt-0.5">{m.message.slice(0, 120)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── AGENTS ── */}
        {tab === "agents" && (
          <div className="space-y-4">
            {Object.entries(health.agent_statuses).filter(([k]) => k !== "main").map(([agent, info]) => {
              const c = ac(agent);
              const cost = costByAgent[agent] || 0;
              const reqs = requestsByAgent[agent] || 0;
              const agentTasks = tasks.filter(t => t.assigned_to === agent);
              const agentMsgs = unreadMessages.filter(m => m.to_agent === agent);
              const agentSessions = sessions.filter(s => s.key.includes(agent));
              const agentCron = cronJobs.find(j => j.agentId === agent);
              const totalTokens = agentSessions.reduce((s, sess) => s + sess.tokens, 0);

              return (
                <div key={agent} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${(info as {status:string}).status === "active" ? "bg-green-500 animate-pulse" : "bg-zinc-600"}`} />
                      <h3 className={`text-sm font-bold ${c.text}`}>{shortName(agent)}</h3>
                      <span className="text-[0.6rem] text-zinc-600 font-mono">{agent}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${(info as {status:string}).status === "active" ? "bg-green-500/15 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>
                      {(info as {status:string}).status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                    <div className="text-center"><div className="text-lg font-bold text-zinc-300">{agentTasks.length}</div><div className="text-[0.55rem] text-zinc-600">Tasks</div></div>
                    <div className="text-center"><div className="text-lg font-bold text-zinc-300">{agentMsgs.length}</div><div className="text-[0.55rem] text-zinc-600">Unread</div></div>
                    <div className="text-center"><div className="text-lg font-bold text-emerald-400">{fmtCost(cost)}</div><div className="text-[0.55rem] text-zinc-600">Cost 24h</div></div>
                    <div className="text-center"><div className="text-lg font-bold text-zinc-300">{reqs}</div><div className="text-[0.55rem] text-zinc-600">Requests</div></div>
                    <div className="text-center"><div className="text-lg font-bold text-violet-400">{fmtTokens(totalTokens)}</div><div className="text-[0.55rem] text-zinc-600">Tokens</div></div>
                    <div className="text-center"><div className="text-lg font-bold text-zinc-300">{agentSessions.length}</div><div className="text-[0.55rem] text-zinc-600">Sessions</div></div>
                  </div>
                  {agentCron && (
                    <div className="mt-3 pt-3 border-t border-zinc-800 flex flex-wrap gap-4 text-[0.65rem] text-zinc-500">
                      <span>⏰ <span className="font-mono">{agentCron.schedule.expr}</span></span>
                      <span>Last: <span className={agentCron.state.lastRunStatus === "ok" ? "text-green-400" : "text-red-400"}>{agentCron.state.lastRunStatus || "—"}</span></span>
                      {agentCron.state.lastDurationMs && <span>Duration: {fmtMs(agentCron.state.lastDurationMs)}</span>}
                      {(agentCron.state.consecutiveErrors || 0) > 0 && <span className="text-red-400">⚠️ {agentCron.state.consecutiveErrors} errors</span>}
                      {agentCron.state.nextRunAtMs && <span>Next: {fmtTime(agentCron.state.nextRunAtMs)}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── COSTS ── */}
        {tab === "costs" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-emerald-400">{fmtCost(totalCost24h)}</div>
                <div className="text-xs text-zinc-500 mt-1">Total Cost (24h)</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-cyan-400">{totalRequests24h}</div>
                <div className="text-xs text-zinc-500 mt-1">Total Requests</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-violet-400">{fmtTokens(totalTokensOut24h)}</div>
                <div className="text-xs text-zinc-500 mt-1">Tokens Output</div>
              </div>
            </div>

            {/* Hourly chart */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Cost by Hour (UTC)</h3>
              <MiniBar values={hourlyCosts} color="bg-emerald-500" height={80} />
              <div className="flex justify-between mt-2">
                {hours.filter((_, i) => i % 4 === 0).map(h => <span key={h} className="text-[0.55rem] text-zinc-600">{h}:00</span>)}
              </div>
            </div>

            {/* Cost by agent table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Cost by Agent</h3>
              <div className="space-y-2">
                {Object.entries(costByAgent).sort((a, b) => b[1] - a[1]).map(([agent, cost]) => {
                  const c = ac(agent);
                  return (
                    <div key={agent} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                      <span className={`text-xs font-semibold ${c.text} w-24`}>{shortName(agent)}</span>
                      <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full ${c.dot} rounded-full`} style={{ width: `${(cost / totalCost24h) * 100}%`, opacity: 0.7 }} />
                      </div>
                      <span className="text-xs font-bold text-zinc-300 w-16 text-right">{fmtCost(cost)}</span>
                      <span className="text-[0.6rem] text-zinc-600 w-12 text-right">{requestsByAgent[agent] || 0} req</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Raw cost entries */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Cost Entries ({costLast24h.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-zinc-600 border-b border-zinc-800">
                    <th className="py-2 text-left">Agent</th><th className="py-2 text-left">Model</th><th className="py-2 text-right">Hour</th>
                    <th className="py-2 text-right">Reqs</th><th className="py-2 text-right">In</th><th className="py-2 text-right">Out</th>
                    <th className="py-2 text-right">Cache R</th><th className="py-2 text-right">Cache W</th><th className="py-2 text-right">Cost</th>
                  </tr></thead>
                  <tbody>
                    {costLast24h.map((c, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className={`py-1.5 ${ac(c.agent_id).text} font-semibold`}>{shortName(c.agent_id)}</td>
                        <td className="py-1.5 text-zinc-500 font-mono">{c.model.replace("claude-", "")}</td>
                        <td className="py-1.5 text-zinc-500 text-right">{c.hour.slice(11, 16)}</td>
                        <td className="py-1.5 text-zinc-300 text-right">{c.requests}</td>
                        <td className="py-1.5 text-zinc-500 text-right">{fmtTokens(c.tokens_input)}</td>
                        <td className="py-1.5 text-zinc-300 text-right">{fmtTokens(c.tokens_output)}</td>
                        <td className="py-1.5 text-zinc-500 text-right">{fmtTokens(c.cache_read)}</td>
                        <td className="py-1.5 text-zinc-500 text-right">{fmtTokens(c.cache_write)}</td>
                        <td className="py-1.5 text-emerald-400 text-right font-semibold">{fmtCost(c.cost_usd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── SESSIONS ── */}
        {tab === "sessions" && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{sessions.length}</div>
                <div className="text-[0.6rem] text-zinc-500">Active Sessions</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-violet-400">{fmtTokens(sessions.reduce((s, sess) => s + sess.tokens, 0))}</div>
                <div className="text-[0.6rem] text-zinc-500">Total Tokens</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-zinc-300">{sessions.filter(s => (s.contextPercent || 0) > 50).length}</div>
                <div className="text-[0.6rem] text-zinc-500">&gt;50% Context</div>
              </div>
            </div>
            {sessions.sort((a, b) => b.tokens - a.tokens).map((s, i) => {
              const agent = Object.keys(agentColors).find(a => s.key.includes(a)) || "";
              const c = ac(agent);
              return (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                      <span className={`text-xs font-semibold ${c.text}`}>{s.label || s.displayName}</span>
                    </div>
                    <span className="text-[0.6rem] text-zinc-600 font-mono">{s.model.replace("claude-", "")}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[0.65rem] text-zinc-500">
                    <span>{fmtTokens(s.tokens)} tokens</span>
                    <span>{s.contextPercent !== null ? `${s.contextPercent}% context` : "—"}</span>
                    <span>{s.kind} / {s.channel}</span>
                    <span className="ml-auto">{fmtTime(s.updatedAt)}</span>
                  </div>
                  {s.contextPercent !== null && (
                    <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${(s.contextPercent || 0) > 75 ? "bg-red-500" : (s.contextPercent || 0) > 50 ? "bg-amber-500" : "bg-cyan-500"}`}
                        style={{ width: `${s.contextPercent}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── CRON JOBS ── */}
        {tab === "cron" && (
          <div className="space-y-3">
            {cronJobs.map(job => {
              const c = ac(job.agentId);
              const isOk = job.state.lastRunStatus === "ok";
              return (
                <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isOk ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={`text-sm font-bold ${c.text}`}>{job.name}</span>
                      <span className="text-[0.6rem] text-zinc-600 font-mono">{job.agentId}</span>
                    </div>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${job.enabled ? "bg-green-500/15 text-green-400" : "bg-zinc-800 text-zinc-500"}`}>
                      {job.enabled ? "enabled" : "disabled"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    <div><div className="text-xs font-mono text-zinc-300">{job.schedule.expr}</div><div className="text-[0.55rem] text-zinc-600">Schedule</div></div>
                    <div><div className={`text-xs font-semibold ${isOk ? "text-green-400" : "text-red-400"}`}>{job.state.lastRunStatus || "—"}</div><div className="text-[0.55rem] text-zinc-600">Last Status</div></div>
                    <div><div className="text-xs text-zinc-300">{job.state.lastDurationMs ? fmtMs(job.state.lastDurationMs) : "—"}</div><div className="text-[0.55rem] text-zinc-600">Duration</div></div>
                    <div><div className={`text-xs ${(job.state.consecutiveErrors || 0) > 0 ? "text-red-400 font-bold" : "text-zinc-300"}`}>{job.state.consecutiveErrors || 0}</div><div className="text-[0.55rem] text-zinc-600">Errors</div></div>
                    <div><div className="text-xs text-zinc-300">{job.state.nextRunAtMs ? fmtTime(job.state.nextRunAtMs) : "—"}</div><div className="text-[0.55rem] text-zinc-600">Next Run</div></div>
                  </div>
                  {job.state.lastError && (
                    <div className="mt-3 text-[0.65rem] text-red-400 bg-red-500/10 rounded-lg p-2 border border-red-500/20">{job.state.lastError}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
