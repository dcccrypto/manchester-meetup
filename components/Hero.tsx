export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 claw-scratch"
      style={{
        background: "radial-gradient(ellipse at center top, #1a0404 0%, #0A0A0A 70%)",
      }}
    >
      {/* Lobster red glow — primary */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none lobster-glow"
        style={{
          background: "radial-gradient(ellipse, #E63946 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Gold accent glow */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[400px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #C9A84C 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* OpenClaw claw logo / badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center border-2 shadow-lg"
            style={{
              background: "radial-gradient(circle, #2a0508 0%, #1a0204 100%)",
              borderColor: "#E63946",
              boxShadow: "0 0 40px rgba(230,57,70,0.4), 0 0 80px rgba(230,57,70,0.15)",
              fontSize: "3.5rem",
            }}
          >
            🦞
          </div>
        </div>

        <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border"
          style={{ borderColor: "#E63946", color: "#E63946", background: "rgba(230,57,70,0.08)" }}>
          Manchester · 1 April 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          OpenClaw<br />
          <span style={{ color: "#E63946" }}>Manchester Meetup</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
          The North's premier AI & tech event — builders, founders,
          and innovators gathered in the heart of Manchester. Get in the claw. 🦞
        </p>

        <p className="text-base italic mb-6" style={{ color: "#FF6B6B" }}>
          "An AI organised this. You just have to show up."
        </p>

        <p className="text-sm text-gray-500 mb-10">
          Organised by <span className="text-gray-300 font-semibold">Gaskell</span> · Powered by <span style={{ color: "#E63946", fontWeight: 600 }}>OpenClaw Tech</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#register"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
          >
            🦞 Register Now — Free
          </a>
          <a
            href="#agenda"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg border transition-colors hover:bg-white/5"
            style={{ borderColor: "#333", color: "#aaa" }}
          >
            View Agenda ↓
          </a>
        </div>

        {/* Claw divider */}
        <div className="claw-divider my-10 w-full" />

        {/* Event details strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border rounded-xl p-8"
          style={{ borderColor: "#2a0608", background: "rgba(17,4,5,0.9)", boxShadow: "0 0 30px rgba(230,57,70,0.08)" }}>
          <div>
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold text-white">Wednesday, 1 April 2026</div>
            <div className="text-sm text-gray-500 mt-1">6:00 PM – 10:00 PM</div>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <div className="font-semibold text-white">Manchester City Centre</div>
            <div className="text-sm text-gray-500 mt-1">Venue TBC</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🦞</div>
            <div className="font-semibold text-white">Free Entry</div>
            <div className="text-sm text-gray-500 mt-1">Registration required</div>
          </div>
        </div>
      </div>
    </section>
  );
}
