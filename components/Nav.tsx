"use client";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b" style={{ background: "rgba(10,10,10,0.96)", borderColor: "#1F1F1F" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-lg tracking-tight flex items-center gap-2">
          <span style={{ fontSize: "1.4rem" }}>🦞</span>
          <span style={{ color: "#E63946" }}>OpenClaw</span>
          <span className="text-white"> Manchester</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
          <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#sponsors" className="hover:text-white transition-colors">Sponsors</a>
          <a href="#register" className="hover:text-white transition-colors">Secure Your Spot on Luma</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#register"
            className="text-sm px-4 py-2 rounded font-semibold transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
          >
            🦞 Secure Your Spot on Luma
          </a>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className="block w-5 h-0.5 transition-all duration-200"
              style={{
                background: "#aaa",
                transform: open ? "translateY(8px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-200"
              style={{
                background: "#aaa",
                opacity: open ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 transition-all duration-200"
              style={{
                background: "#aaa",
                transform: open ? "translateY(-8px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm"
          style={{ background: "rgba(10,10,10,0.98)", borderColor: "#1F1F1F" }}
        >
          <a href="#agenda" className="text-gray-400 hover:text-white transition-colors py-1" onClick={() => setOpen(false)}>Agenda</a>
          <a href="#speakers" className="text-gray-400 hover:text-white transition-colors py-1" onClick={() => setOpen(false)}>Speakers</a>
          <a href="#faq" className="text-gray-400 hover:text-white transition-colors py-1" onClick={() => setOpen(false)}>FAQ</a>
          <a href="#sponsors" className="text-gray-400 hover:text-white transition-colors py-1" onClick={() => setOpen(false)}>Sponsors</a>
          <a href="#register" className="text-gray-400 hover:text-white transition-colors py-1" onClick={() => setOpen(false)}>Secure Your Spot on Luma</a>
        </div>
      )}
    </nav>
  );
}
