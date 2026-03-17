export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
      style={{
        background: "radial-gradient(ellipse at center top, #1a1200 0%, #0A0A0A 70%)",
      }}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #C9A84C 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border"
          style={{ borderColor: "#C9A84C", color: "#C9A84C", background: "rgba(201,168,76,0.1)" }}>
          Manchester · 1 April 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          OpenClaw<br />
          <span style={{ color: "#C9A84C" }}>Manchester Meetup</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
          The North's premier blockchain & AI event — builders, founders,
          and investors gathered in the heart of Manchester.
        </p>

        <p className="text-base italic mb-6" style={{ color: "#C9A84C" }}>
          "An AI organised this. You just have to show up."
        </p>

        <p className="text-sm text-gray-500 mb-10">
          Organised by <span className="text-gray-300 font-semibold">Gaskell</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#register"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#000" }}
          >
            Register Now — Free
          </a>
          <a
            href="#agenda"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg border transition-colors hover:bg-white/5"
            style={{ borderColor: "#333", color: "#aaa" }}
          >
            View Agenda ↓
          </a>
        </div>

        {/* Event details strip */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border rounded-xl p-8"
          style={{ borderColor: "#1F1F1F", background: "#111" }}>
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
            <div className="text-3xl mb-2">🎟️</div>
            <div className="font-semibold text-white">Free Entry</div>
            <div className="text-sm text-gray-500 mt-1">Registration required</div>
          </div>
        </div>
      </div>
    </section>
  );
}
