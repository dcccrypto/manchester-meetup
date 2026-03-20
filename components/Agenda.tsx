const items = [
  { time: "6:00 PM", title: "Doors Open", desc: "Arrive, grab a drink, and get settled.", icon: "🦞" },
  { time: "6:00 – 9:00 PM", title: "Programme TBC", desc: "Full agenda coming soon — speakers, demos, and more to be announced.", icon: "📋" },
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
