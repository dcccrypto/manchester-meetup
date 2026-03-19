"use client";

import { useState, useMemo } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assigned_to: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  task_id?: string | null;
  tags?: string | null;
  due_date?: string | null;
  parent_task_id?: string | null;
  sprint_id?: string | null;
}

const TASKS: Task[] = [{"id": "dcc92560-50e4-ae03-3f5d-2beaa116c8a1", "title": "MCR-017: Set up X/Twitter profile for Gaskell — log in, update display name, write bio from VOICE.md, upload avatar, post launch tweet", "description": "X account exists. Log in: openclaw browser open https://x.com/login. Credentials in .env (X_EMAIL, X_PASSWORD). Set up: display name=Gaskell, bio from VOICE.md. Post launch tweet from SOCIAL_DRAFTS.md.", "status": "backlog", "priority": "high", "assigned_to": "manchester-marketing", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-18 23:46:57", "updated_at": "2026-03-18 23:46:57"}, {"id": "62014a16-90ce-dc50-deab-5a2bd9dc797b", "title": "MCR-016: Set up LinkedIn profile for Gaskell — log in, update name to Gaskell, set headline to Event Director at OpenClaw Manchester Meetup, write bio from VOICE.md, upload avatar, post launch content", "description": "LinkedIn account exists. Log in: openclaw browser open https://www.linkedin.com/login. Credentials in .env (LINKEDIN_EMAIL, LINKEDIN_PASSWORD). Set up: name=Gaskell, headline=Event Director OpenClaw Manchester Meetup, bio from VOICE.md. Post approved content from SOCIAL_DRAFTS.md.", "status": "backlog", "priority": "high", "assigned_to": "manchester-marketing", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-18 23:32:18", "updated_at": "2026-03-18 23:32:18"}, {"id": "9f4cc9b6-35df-c43b-69f2-75dd5637d5b6", "title": "MCR-015: Write press release — AI agent Gaskell organises Manchester tech meetup. Build media contact list (10+ journalists). Begin pitching Tier 3 local press first.", "description": "53+ press pitches sent. Active leads: Tom Allen (AI Journal), Rachael Hesno (Prolific North), Manchester Mill (autorespond received). Tier-1 pitches sent to: Guardian (Aisha Down), Bloomberg (Olivia Solon), FT (Murad Ahmed). Continue monitoring replies and follow up.", "status": "in-progress", "priority": "high", "assigned_to": "manchester-pr", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 22:24:35", "updated_at": "2026-03-17 23:27:29"}, {"id": "61f75d51-15af-af12-4d57-fa37077e42f8", "title": "MCR-011: Fix website title and positioning — change to OpenClaw Manchester Meetup, remove crypto references. Update speaker section with Keith Griggs (confirmed).", "description": "Title must say OpenClaw Manchester Meetup not Manchester Crypto Meetup. Positioning: The Norths premier AI builders meetup. Add Keith Griggs as confirmed speaker (talk TBD). Deploy updated site.", "status": "done", "priority": "high", "assigned_to": "manchester-webmaster", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:54:16", "updated_at": "2026-03-17 22:13:15"}, {"id": "80a5aeaf-986a-3fc4-eccf-ca1ea31a178f", "title": "MCR-012: Create shared Google Drive folder — Manchester Meetup. Upload venue comparison doc, speaker briefs, sponsor pitch deck. Share with Andy and Reza.", "description": "Drive folder exists (Manchester Meetup, ID: 1EfM2_-Ga72_UQg_yhoacoGZZzM2FKLh_). Upload venue comparison and speaker briefs via: GOG_KEYRING_PASSWORD=openclaw gog drive upload <file> -a ai-manchester@whatsthescore.co.uk", "status": "backlog", "priority": "medium", "assigned_to": "manchester-bd", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:54:16", "updated_at": "2026-03-17 21:54:16"}, {"id": "3837a842-e51a-980b-7673-12d333747699", "title": "MCR-013: Follow up on venue — email Manchester Art Gallery (eventsteam@manchester.gov.uk) and Colony Workspaces. Confirm April 1 availability. DEADLINE Mar 21.", "description": "Venue emails SENT. Colony (3-msg thread) and Art Gallery (3-msg thread) both contacted. No reply yet. DEADLINE Mar 21. Check: GOG_KEYRING_PASSWORD=openclaw gog gmail search from:colony,eventsteam -a ai-manchester@whatsthescore.co.uk. If no reply by Mar 20, Khubair calls Colony 0161 974 3210 and Art Gallery 0161 235 8862.", "status": "in-progress", "priority": "high", "assigned_to": "manchester-bd", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:54:16", "updated_at": "2026-03-18 00:09:41"}, {"id": "970ba2db-3257-8b07-d601-8a3296ed5759", "title": "MCR-014: Email speaker invitations — Gary Cheers, Tim Scarfe, Stuart McMeechan, Emre Okcular. Keith Griggs already booked (Zoom Mar 19).", "description": "Speaker emails SENT. Keith Griggs BOOKED (Zoom Mar 19 3:30 PM). Gary Cheers, Tim Scarfe, Stuart McMeechan, Emre Okcular — all emailed, no replies yet. Check: GOG_KEYRING_PASSWORD=openclaw gog gmail search from:cheers,scarfe,mcmeechan,okcular -a ai-manchester@whatsthescore.co.uk", "status": "in-progress", "priority": "high", "assigned_to": "manchester-bd", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:54:16", "updated_at": "2026-03-18 00:09:41"}, {"id": "c342de09-8ad9-b169-975b-10f4ba67674b", "title": "MCR-009: Authenticate Google in browser — sign into accounts.google.com with ai-manchester@whatsthescore.co.uk. Then retry LinkedIn signup via Sign in with Google.", "description": "DONE. Google OAuth authenticated. Token saved.", "status": "done", "priority": "high", "assigned_to": "manchester-marketing", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:25:41", "updated_at": "2026-03-17 21:44:09"}, {"id": "835f8b0f-d0f5-8fea-1ea6-76e406edf6be", "title": "MCR-010: Test email sending via msmtp CLI — send test email to ai-manchester@whatsthescore.co.uk. If auth fails, run /google-auth and generate App Password.", "description": "DONE. Gmail API verified. Drive folder created.", "status": "done", "priority": "high", "assigned_to": "manchester-bd", "created_by": "manchester-gaskell", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 21:25:41", "updated_at": "2026-03-17 21:50:38"}, {"id": "0abe28f0-3a8d-5225-7bd1-54847281ec1e", "title": "MCR-001: Create 2-week execution plan — Week 1 (Mar 17-23): infrastructure + outreach + website. Week 2 (Mar 24-31): confirm venue/speakers, promote, open registration. Assign all tasks. Post to Discord.", "description": "Read NORTH-STAR.md. Event April 1. Venue by Mar 21, speakers by Mar 25, website by Mar 23, registration by Mar 25.", "status": "done", "priority": "high", "assigned_to": "manchester-gaskell", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 16:01:55"}, {"id": "31414900-f549-6290-4277-83fecec9ece2", "title": "MCR-002: Research 10+ Manchester venues for 80-120 person tech meetup — evaluate capacity, cost, AV, catering, transport. Score and rank top 3. Post to Discord for Andy to visit.", "description": "Use venue-research. Web search Manchester tech venues. Score 1-10. Message manchester-gaskell with shortlist.", "status": "done", "priority": "high", "assigned_to": "manchester-bd", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 15:41:11"}, {"id": "26494125-f459-2206-f497-2f974b57ce98", "title": "MCR-003: Create LinkedIn profile for Gaskell — sign up with ai-manchester@whatsthescore.co.uk. Name: Gaskell. Event Director, OpenClaw Manchester Meetup. Generate avatar.", "description": "LinkedIn account created by Khubair. Credentials in .env. Marketing agent can now log in and post.", "status": "done", "priority": "high", "assigned_to": "manchester-marketing", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 16:34:09"}, {"id": "693dde27-1fec-93ec-de9e-597f52d155d3", "title": "MCR-004: Create X/Twitter account for Gaskell — sign up with Gmail. Post launch tweet.", "description": "X/Twitter account created by Khubair. Credentials in .env (X_EMAIL, X_PASSWORD). Marketing agent can now log in and post.", "status": "done", "priority": "high", "assigned_to": "manchester-marketing", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 16:34:09"}, {"id": "0b99cce8-4864-d039-ed83-593c1138ba7f", "title": "MCR-005: Initialize Next.js 15 event website — landing page with event name, date April 1, Organised by Gaskell. Deploy to Vercel.", "description": "npx create-next-app. Dark theme, gold accents. Hero, agenda, speakers, sponsors, registration. vercel deploy --prod.", "status": "done", "priority": "high", "assigned_to": "manchester-webmaster", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 16:43:44"}, {"id": "bf17950d-018b-8213-7d5f-9537048bbddc", "title": "MCR-006: Research 10 potential speakers — AI agent builders, OpenClaw users, AI/ML researchers in UK. Rank by relevance.", "description": "Web search. Check GitHub, Twitter, LinkedIn. Message manchester-gaskell with top 5.", "status": "done", "priority": "high", "assigned_to": "manchester-bd", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 16:34:09"}, {"id": "28c5569a-1c07-d76b-747b-04fcacd7aac0", "title": "MCR-007: Research 10 potential sponsors — AI companies, dev tools, VC firms. Draft sponsor pitch email.", "description": "Sponsor emails SENT 2026-03-18. Supabase, Vercel, Hetzner contacted. No replies yet. Monitor inbox: GOG_KEYRING_PASSWORD=openclaw gog gmail search from:supabase,vercel,hetzner -a ai-manchester@whatsthescore.co.uk", "status": "in-progress", "priority": "medium", "assigned_to": "manchester-bd", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-18 00:09:41"}, {"id": "c3ee847f-5b9c-26de-a6f9-47cf85be85a6", "title": "MCR-008: Run full system health check — Gateway, Collector, browser, disk. Verify browser loads Gmail, LinkedIn, X.", "description": "Check 18789, 18801. Browser open gmail, linkedin, x. Report to manchester-gaskell.", "status": "done", "priority": "medium", "assigned_to": "manchester-sysadmin", "created_by": "system", "task_id": null, "tags": null, "due_date": null, "parent_task_id": null, "sprint_id": null, "created_at": "2026-03-17 15:36:42", "updated_at": "2026-03-17 15:36:42"}];

const agentMeta: Record<string, { short: string; icon: string; gradient: string }> = {
  "manchester-gaskell":   { short: "Gaskell",   icon: "G",  gradient: "from-amber-500 to-yellow-600" },
  "manchester-bd":        { short: "BD",         icon: "BD", gradient: "from-blue-500 to-blue-700" },
  "manchester-marketing": { short: "Marketing",  icon: "MK", gradient: "from-pink-500 to-pink-700" },
  "manchester-pr":        { short: "PR",         icon: "PR", gradient: "from-violet-500 to-violet-700" },
  "manchester-qa":        { short: "QA",         icon: "QA", gradient: "from-cyan-500 to-cyan-700" },
  "manchester-sysadmin":  { short: "Sysadmin",   icon: "SA", gradient: "from-green-500 to-green-700" },
  "manchester-webmaster": { short: "Webmaster",  icon: "WM", gradient: "from-orange-500 to-orange-700" },
  "system":               { short: "System",     icon: "SY", gradient: "from-gray-500 to-gray-700" },
};

function normalizeStatus(s: string): "backlog" | "in-progress" | "done" {
  const n = (s || "").toLowerCase().replace(/[_ ]/g, "-");
  if (n === "in-progress") return "in-progress";
  if (n === "done" || n === "completed") return "done";
  return "backlog";
}

function extractId(title: string) {
  const m = title.match(/^(MCR-\d+)/);
  return m ? m[1] : null;
}

function cleanTitle(title: string) {
  return title.replace(/^MCR-\d+:\s*/, "");
}

function formatDate(d: string) {
  if (!d) return "";
  const dt = new Date(d + (d.includes("Z") || d.includes("+") ? "" : "Z"));
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const priorityStyles: Record<string, string> = {
  high: "bg-red-500/15 text-red-400",
  medium: "bg-amber-500/15 text-amber-400",
  low: "bg-green-500/15 text-green-400",
};

const columnConfig = [
  { key: "backlog" as const, label: "Backlog", icon: "📋", accent: "text-zinc-400", countBg: "bg-zinc-800 text-zinc-400" },
  { key: "in-progress" as const, label: "In Progress", icon: "⚡", accent: "text-amber-400", countBg: "bg-amber-500/15 text-amber-400" },
  { key: "done" as const, label: "Done", icon: "✅", accent: "text-green-400", countBg: "bg-green-500/15 text-green-400" },
];

export default function TaskBoard() {
  const [filter, setFilter] = useState("all");

  const agents = useMemo(() => [...new Set(TASKS.map((t) => t.assigned_to))].sort(), []);

  const filtered = useMemo(
    () => (filter === "all" ? TASKS : TASKS.filter((t) => t.assigned_to === filter)),
    [filter]
  );

  const groups = useMemo(() => {
    const g: Record<string, Task[]> = { backlog: [], "in-progress": [], done: [] };
    filtered.forEach((t) => g[normalizeStatus(t.status)].push(t));
    const pri: Record<string, number> = { high: 0, medium: 1, low: 2 };
    Object.values(g).forEach((arr) => arr.sort((a, b) => (pri[a.priority] ?? 1) - (pri[b.priority] ?? 1)));
    return g;
  }, [filtered]);

  const stats = { total: filtered.length, done: groups.done.length, active: groups["in-progress"].length };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200">
      {/* Header */}
      <header className="px-6 md:px-8 py-5 border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-[#09090b]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              🐾 Manchester Meetup — Task Board
            </h1>
            <p className="text-xs text-zinc-500 mt-1">Powered by Collector API · April 1, 2026</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <div className="text-center"><span className="block text-lg font-bold text-zinc-200">{stats.total}</span>Total</div>
            <div className="text-center"><span className="block text-lg font-bold text-green-400">{stats.done}</span>Done</div>
            <div className="text-center"><span className="block text-lg font-bold text-amber-400">{stats.active}</span>Active</div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-6 md:px-8 py-3 flex gap-2 flex-wrap border-b border-zinc-900">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
            filter === "all"
              ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          }`}
        >
          All Agents
        </button>
        {agents.map((a) => {
          const meta = agentMeta[a] || { short: a, icon: "?", gradient: "" };
          return (
            <button
              key={a}
              onClick={() => setFilter(a)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                filter === a
                  ? "bg-amber-500/15 border-amber-500/50 text-amber-400"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {meta.short}
            </button>
          );
        })}
      </div>

      {/* Board */}
      <div className="flex gap-4 p-6 md:p-8 overflow-x-auto min-h-[calc(100vh-160px)]">
        {columnConfig.map((col) => (
          <div key={col.key} className="flex-1 min-w-[300px] bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${col.accent}`}>
                <span>{col.icon}</span> {col.label}
              </h2>
              <span className={`text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full ${col.countBg}`}>
                {groups[col.key].length}
              </span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto space-y-2 scrollbar-thin">
              {groups[col.key].length === 0 && (
                <div className="text-center py-10 text-zinc-700 text-sm">No tasks</div>
              )}
              {groups[col.key].map((t) => {
                const taskId = extractId(t.title);
                const meta = agentMeta[t.assigned_to] || { short: t.assigned_to, icon: "?", gradient: "from-gray-500 to-gray-700" };
                const creatorMeta = agentMeta[t.created_by] || { short: t.created_by, icon: "?", gradient: "" };
                return (
                  <div
                    key={t.id}
                    className="bg-[#09090b] border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 transition-all"
                  >
                    {taskId && (
                      <span className="text-[0.65rem] font-semibold text-zinc-600 font-mono">{taskId}</span>
                    )}
                    <h3 className="text-[0.85rem] font-semibold text-zinc-200 leading-snug mt-1 mb-1.5">
                      {cleanTitle(t.title)}
                    </h3>
                    {t.description && (
                      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-2.5">{t.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <div
                        className={`w-5.5 h-5.5 rounded-md flex items-center justify-center text-[0.6rem] font-bold text-white bg-gradient-to-br ${meta.gradient}`}
                        title={meta.short}
                        style={{ width: 22, height: 22 }}
                      >
                        {meta.icon}
                      </div>
                      <span className={`text-[0.6rem] font-semibold px-2 py-0.5 rounded-md ${priorityStyles[t.priority] || priorityStyles.medium}`}>
                        {t.priority}
                      </span>
                      <span className="text-[0.6rem] font-semibold px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-400">
                        from {creatorMeta.short}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-zinc-800/50">
                      <span className="text-[0.6rem] text-zinc-600">{formatDate(t.created_at)}</span>
                      {t.updated_at !== t.created_at && (
                        <span className="text-[0.6rem] text-zinc-600">updated {formatDate(t.updated_at)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
