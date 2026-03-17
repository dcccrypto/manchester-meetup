export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "rgba(10,10,10,0.95)", borderColor: "#1F1F1F" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg tracking-tight">
          <span style={{ color: "#C9A84C" }}>MCR</span>
          <span className="text-white">Crypto</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
          <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
          <a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a>
          <a href="#register" className="hover:text-white transition-colors">Register</a>
        </div>
        <a
          href="#register"
          className="btn-gold text-sm px-4 py-2 rounded font-semibold"
          style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#000" }}
        >
          Register Free
        </a>
      </div>
    </nav>
  );
}
