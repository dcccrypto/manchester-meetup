export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Claw divider */}
        <div className="claw-divider mb-10 w-full" />

        {/* Decorative claw motif */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
        </div>

        <h2 className="text-4xl font-extrabold text-white mb-3">
          <span style={{ color: "#E63946" }}>Sponsors</span>
        </h2>
        <p className="text-gray-500 mb-12">
          Align your brand with the OpenClaw community. Get your claws on a sponsorship spot.
        </p>

        {/* Placeholder sponsor slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { tier: "🦞 Claw Sponsor", color: "#E63946" },
            { tier: "🦞 Claw Sponsor", color: "#E63946" },
            { tier: "🔴 Red Sponsor", color: "#FF2D55" },
            { tier: "🔴 Red Sponsor", color: "#FF2D55" },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-dashed p-8 flex items-center justify-center text-sm font-semibold transition-colors hover:bg-white/5 cursor-pointer"
              style={{ borderColor: s.color + "44", color: s.color + "99" }}
            >
              {s.tier}
            </div>
          ))}
        </div>

        <a
          href="#register"
          className="inline-block px-6 py-3 rounded-lg border text-sm font-semibold transition-colors hover:bg-red-900/20 cursor-pointer"
          style={{ borderColor: "#E63946", color: "#E63946" }}
        >
          🦞 Become a Sponsor →
        </a>

        {/* Claw divider */}
        <div className="claw-divider mt-10 w-full" />
      </div>
    </section>
  );
}
