const speakers = [
  {
    name: "Gaskell",
    role: "Organiser & Host",
    bio: "Manchester's AI-native event director. Built this meetup from scratch — claws and all. Builder, connector, and advocate for AI in the North.",
    initials: "G",
    emoji: "🤖",
    image: null,
  },
  {
    name: "Halima Yasmin",
    role: "Founder, TigerFlow AI",
    talk: "From GoHighLevel to Proprietary AI: Building TigerFlow AI for UK Real Estate",
    bio: "Halima Yasmin is the founder of TigerFlow AI, a proptech startup building proprietary AI tools for UK real estate agents. After outgrowing GoHighLevel, she rebuilt the entire platform from scratch using Claude, creating a production system now serving real clients.",
    badge: "Keynote",
    initials: "HY",
    emoji: "🐯",
    image: "/halima-headshot.png",
  },
  {
    name: "William Faithfull, PhD",
    role: "CEO, ExaDev",
    bio: "Dr. Will Faithfull is CEO of ExaDev, founding engineers on demand for tech and AI companies. A computer science PhD and active investor through ExaCap, Will grew ExaDev from two graduate students to a team of 17 engineers. He has worked in over a dozen startups across the UK, Silicon Valley, the Netherlands, Ireland and Australia, as well as for the likes of Sky, Google and Equal Experts.",
    linkedin: "https://linkedin.com/in/will-faithfull/",
    initials: "WF",
    emoji: "🤔",
    image: "/faithfull-headshot.jpg",
  },
  {
    name: "Edidiong Asikpo",
    role: "Principal Technologist, MongoDB",
    bio: "A builder's perspective on AI infrastructure from one of the world's leading database companies — what's possible today, and what's coming next.",
    initials: "M",
    emoji: "🍃",
    image: null,
  },
  {
    name: "Andy Gray",
    role: "Builder — Crypto, AI & Decentralisation",
    bio: "How I taught Garfield to use OpenClaw to do the annoying tasks in my life… A 5-minute live show-and-tell. Andy is a builder at heart, drawn to the technologies reshaping value, ownership, and trust — crypto, decentralisation, and AI.",
    initials: "🐱",
    emoji: "🐱",
    image: "/cool-cat.png",
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
              {/* Avatar with lobster red gradient or photo */}
              {s.image ? (
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                  style={{ border: "2px solid #E63946" }}
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                  style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
                >
                  {s.initials}
                </div>
              )}
              {s.badge && (
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-2"
                  style={{ background: "#E63946", color: "#fff" }}
                >
                  {s.badge}
                </span>
              )}
              <div className="font-bold text-white text-lg">{s.name}</div>
              <div className="text-sm mb-2" style={{ color: "#FF6B6B" }}>{s.role}</div>
              {s.talk && (
                <p className="text-xs italic mb-2" style={{ color: "#E63946" }}>
                  &ldquo;{s.talk}&rdquo;
                </p>
              )}
              <p className="text-gray-500 text-sm leading-relaxed">{s.bio}</p>
              {s.linkedin && (
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs font-medium hover:underline"
                  style={{ color: "#0A66C2" }}
                >
                  LinkedIn →
                </a>
              )}
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
