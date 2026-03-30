const items = [
  { time: "5:00 PM", title: "Doors Open & Networking", desc: "Arrive, grab a drink, connect with Manchester's AI community.", icon: "🦞" },
  { time: "6:00 PM", title: "Welcome & Opening Remarks", desc: "Gaskell kicks things off — what OpenClaw Manchester is about and what's to come.", icon: "🎙️" },
  { time: "6:10 PM", title: "Food Served", desc: "Fuel up — food and drinks on the house.", icon: "🍕" },
  { time: "7:00 PM", title: "Halima Yasmin — TigerFlow AI (Keynote)", desc: "\"From GoHighLevel to Proprietary AI: Building TigerFlow AI for UK Real Estate\" — A deep dive into building a bespoke AI platform for the UK property market. 20–25 min keynote.", icon: "🐯" },
  { time: "7:30 PM", title: "William Faithfull, PhD — ExaDev (Talk)", desc: "\"Does OpenClaw make AI SaaS redundant?\" — A provocation from the CEO of ExaDev.", icon: "🤔" },
  { time: "~7:50 PM", title: "Andy Gray — Garfield AI (Lightning Demo)", desc: "A 5-minute live show-and-tell: Andy's OpenClaw journey and his personal AI assistant Garfield in action.", icon: "⚡" },
  { time: "~7:55 PM", title: "Toby Remond — OptiBee (Lightning Talk)", desc: "\"From OpenClaw to AI Operating System: How I Built a 10x Productivity Layer for My Business\" — 5 minutes on building an AI-first consultancy in Manchester.", icon: "⚡" },
  { time: "8:00 PM", title: "Open Mic + Raffle", desc: "Got something to share? Grab the mic. Plus a raffle draw — you might win something sharp. 🦞", icon: "🎤" },
  { time: "~8:20 PM", title: "Open Networking", desc: "Connect, collaborate, swap ideas — the best conversations happen off-stage.", icon: "🤝" },
  { time: "9:00 PM", title: "Close", desc: "Until next time — stay sharp, stay clawed. 🦞", icon: "👋" },
];

export default function Agenda() {
  return (
    <section id="agenda" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-4xl mx-auto">
        {/* Claw divider at top */}
        <div className="claw-divider mb-10 w-full" />

        <div className="text-center mb-14">
          {/* Decorative claw motif */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            <span style={{ color: "#E63946" }}>Agenda</span>
          </h2>
          <p className="text-gray-500">Wednesday 1 April 2026 · Manchester · OpenClaw Tech</p>
        </div>

        <div className="space-y-0">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-6 py-6 border-b transition-colors hover:bg-white/[0.02]"
              style={{ borderColor: "#1F1F1F" }}
            >
              <div className="w-24 shrink-0 text-sm font-mono pt-1" style={{ color: "#E63946" }}>
                {item.time}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-lg">{item.title}</div>
                <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom claw divider */}
        <div className="claw-divider mt-10 w-full" />
      </div>
    </section>
  );
}
