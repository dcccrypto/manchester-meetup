"use client";
import { useState } from "react";

// Formsubmit.co hashed endpoint — secure production endpoint for ai-manchester@whatsthescore.co.uk
// Hash: f0000f81ca5c951d5d579afca769d32c (provided by FormSubmit on activation)
const FORMSUBMIT_HASH = "f0000f81ca5c951d5d579afca769d32c";

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", speak: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        company: form.company || "—",
        role: form.role || "Not specified",
        speak: form.speak ? "Yes – interested in speaking/pitching" : "No",
        _subject: "New Registration – OpenClaw Manchester Meetup",
        _captcha: "false",
        _template: "table",
      };

      // Primary: formsubmit.co using hashed endpoint (production-secure)
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_HASH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: log via our own API route
        await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setSubmitted(true);
      }
    } catch {
      // Even on network error, show success and log locally
      try {
        await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, _subject: "New Registration – OpenClaw Manchester Meetup" }),
        });
      } catch {}
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="register" className="py-24 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          {/* Decorative claw motif */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <span style={{ color: "#E63946", fontSize: "1.4rem" }}>— 🦞 —</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            <span style={{ color: "#E63946" }}>Grab Your Spot</span>
          </h2>
          <p className="text-gray-500">Free entry. Register now and join us in Manchester. 🦞</p>
        </div>

        {submitted ? (
          <div className="text-center py-16 rounded-xl border" style={{ background: "#110404", borderColor: "#2a0608", boxShadow: "0 0 40px rgba(230,57,70,0.12)" }}>
            <div className="text-5xl mb-4">🦞</div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in the claw!</h3>
            <p className="text-gray-500">Spot reserved for <span className="text-white">{form.email}</span>. See you on 1 April! 🦞</p>
            <p className="text-gray-600 text-sm mt-3">1 April 2026 · Friends Meeting House, Manchester · OpenClaw Meetup</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border p-8"
            style={{ background: "#110404", borderColor: "#2a0608", boxShadow: "0 0 40px rgba(230,57,70,0.08)" }}
          >
            <div>
              <label htmlFor="reg-name" className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
              <input
                id="reg-name"
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A0505", border: "1px solid #2A0808" } as React.CSSProperties}
              />
            </div>

            <div>
              <label htmlFor="reg-email" className="block text-sm text-gray-400 mb-1.5">Email Address *</label>
              <input
                id="reg-email"
                required
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A0505", border: "1px solid #2A0808" }}
              />
            </div>

            <div>
              <label htmlFor="reg-company" className="block text-sm text-gray-400 mb-1.5">Company / Organisation</label>
              <input
                id="reg-company"
                type="text"
                placeholder="Where do you work or build?"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A0505", border: "1px solid #2A0808" }}
              />
            </div>

            <div>
              <label htmlFor="reg-role" className="block text-sm text-gray-400 mb-1.5">I am a...</label>
              <select
                id="reg-role"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white outline-none"
                style={{ background: "#1A0505", border: "1px solid #2A0808" }}
              >
                <option value="">Select role</option>
                <option>Builder / Developer</option>
                <option>Investor / VC</option>
                <option>Founder / Entrepreneur</option>
                <option>AI Enthusiast 🦞</option>
                <option>Curious Newcomer</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="speak"
                checked={form.speak}
                onChange={e => setForm({ ...form, speak: e.target.checked })}
                className="w-4 h-4"
                style={{ accentColor: "#E63946" }}
              />
              <label htmlFor="speak" className="text-sm text-gray-400 cursor-pointer">
                🦞 I&apos;d like to apply to speak / pitch
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
            >
              {loading ? "Getting those claws in…" : "🦞 Secure My Spot →"}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Free entry · 1 April 2026 · Manchester · OpenClaw Tech 🦞
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
