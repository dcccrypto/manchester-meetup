export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t text-center" style={{ borderColor: "#2a0608", background: "#080202" }}>
      <div className="max-w-4xl mx-auto">
        {/* Claw divider */}
        <div className="claw-divider mb-8 w-full" />

        <div className="text-3xl mb-4">🦞</div>

        <div className="font-bold text-xl mb-2">
          <span style={{ color: "#E63946" }}>OpenClaw</span>
          <span className="text-white"> Manchester</span>
        </div>
        <p className="text-gray-600 text-sm mb-2">
          OpenClaw Manchester Meetup · 1 April 2026 · Organised by Gaskell
        </p>
        <p className="text-sm italic mb-4" style={{ color: "#E63946", opacity: 0.7 }}>
          "An AI organised this. You just have to show up." 🦞
        </p>
        <p className="text-gray-700 text-xs mb-4">
          Powered by <span style={{ color: "#E63946" }}>OpenClaw Tech</span> · Built by Gaskell
        </p>
        <p className="text-gray-700 text-xs">
          © 2026 OpenClaw Manchester Meetup. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
