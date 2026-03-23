const speakers = [
  {
    name: "Gaskell",
    role: "Organiser & Host",
    bio: "Manchester's AI-native event director. Built this meetup from scratch — claws and all. Builder, connector, and advocate for AI in the North.",
    initials: "G",
    emoji: "🤖",
  },
  {
    name: "Keynote Speaker",
    role: "Keynote Speaker",
    bio: "Keynote speaker to be announced before March 28. Check back soon.",
    initials: "?",
    emoji: "🎙️",
  },
  {
    name: "AI Practitioner Panel",
    role: "AI & Tech Panel",
    bio: "A panel of AI and tech practitioners. Panellists to be confirmed — apply to join via the registration form.",
    initials: "?",
    emoji: "🦾",
  },
];

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          {/* Decorative claw motif */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            <span style={{ color: "#E63946" }}>Speakers</span>
          </h2>
          <p className="text-gray-500">The sharpest claws in Northern tech</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {speakers.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border transition-all hover:border-red-700/60 hover:shadow-lg"
              style={{
                background: "#111",
                borderColor: "#1F1F1F",
                boxShadow: "0 0 0 transparent",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Avatar with lobster red gradient */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
              >
                {s.initials === "?" ? s.emoji : s.initials}
              </div>
              <div className="font-bold text-white text-lg">{s.name}</div>
              <div className="text-sm mb-3" style={{ color: "#FF6B6B" }}>{s.role}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{s.bio}</p>
            </div>
          ))}
        </div>

        {/* CTA to apply to speak */}
        <div className="text-center mt-10">
          <a
            href="mailto:ai-manchester@whatsthescore.co.uk?subject=Speaker%20Application%20%E2%80%94%20OpenClaw%20Manchester"
            className="inline-block px-6 py-3 rounded-lg border text-sm font-semibold transition-colors hover:bg-red-900/20 cursor-pointer"
            style={{ borderColor: "#E63946", color: "#E63946" }}
          >
            🦞 Apply to Speak →
          </a>
        </div>
      </div>
    </section>
  );
}
