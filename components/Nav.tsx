export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "rgba(10,10,10,0.96)", borderColor: "#1F1F1F" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg tracking-tight flex items-center gap-2">
          <span style={{ fontSize: "1.4rem" }}>🦞</span>
          <span style={{ color: "#E63946" }}>OpenClaw</span>
          <span className="text-white"> Manchester</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
          <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
          <a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a>
          <a href="#register" className="hover:text-white transition-colors">Register</a>
        </div>
        <a
          href="#register"
          className="text-sm px-4 py-2 rounded font-semibold transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
        >
          🦞 Register Free
        </a>
      </div>
    </nav>
  );
}
