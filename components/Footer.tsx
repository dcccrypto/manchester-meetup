export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t text-center" style={{ borderColor: "#1F1F1F", background: "#0A0A0A" }}>
      <div className="max-w-4xl mx-auto">
        <div className="font-bold text-lg mb-2">
          <span style={{ color: "#C9A84C" }}>MCR</span>
          <span className="text-white">Crypto</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Manchester Crypto Meetup · 1 April 2026 · Organised by Gaskell
        </p>
        <p className="text-gray-700 text-xs">
          © 2026 Manchester Crypto Meetup. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
