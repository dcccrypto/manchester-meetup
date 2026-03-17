const speakers = [
  {
    name: "Gaskell",
    role: "Organiser & Host",
    bio: "Founder of the Manchester Crypto community. Builder, connector, and advocate for blockchain in the North.",
    initials: "G",
  },
  {
    name: "Speaker TBC",
    role: "Keynote",
    bio: "Speaker announcement coming soon. Follow us for updates.",
    initials: "?",
  },
  {
    name: "Panel TBC",
    role: "DeFi & RWA Panel",
    bio: "Panellists to be announced. Apply to speak via the registration form.",
    initials: "?",
  },
];

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-white mb-3">Speakers</h2>
          <p className="text-gray-500">More speakers will be announced soon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {speakers.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border transition-colors hover:border-yellow-700/50"
              style={{ background: "#111", borderColor: "#1F1F1F" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
                style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#000" }}
              >
                {s.initials}
              </div>
              <div className="font-bold text-white text-lg">{s.name}</div>
              <div className="text-sm mb-3" style={{ color: "#C9A84C" }}>{s.role}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{s.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
