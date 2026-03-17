"use client";
import { useState } from "react";

const FORMSPREE_ID = "xpwdgqnb"; // free tier endpoint for manchester-meetup

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", speak: false });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          speak: form.speak ? "Yes – interested in speaking/pitching" : "No",
          _subject: "New Registration – OpenClaw Manchester Meetup",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="register" className="py-24 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white mb-3">Register</h2>
          <p className="text-gray-500">Free entry. Spots are limited — secure yours now.</p>
        </div>

        {submitted ? (
          <div className="text-center py-16 rounded-xl border" style={{ background: "#111", borderColor: "#1F1F1F" }}>
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">You're registered!</h3>
            <p className="text-gray-500">We'll send confirmation details to <span className="text-white">{form.email}</span>.</p>
            <p className="text-gray-600 text-sm mt-3">1 April 2026 · Manchester · OpenClaw Meetup</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-xl border p-8"
            style={{ background: "#111", borderColor: "#1F1F1F" }}
          >
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email Address *</label>
              <input
                required
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Company / Organisation</label>
              <input
                type="text"
                placeholder="Where do you work or build?"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none focus:ring-1"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">I am a...</label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 rounded-lg text-white outline-none"
                style={{ background: "#1A1A1A", border: "1px solid #2A2A2A" }}
              >
                <option value="">Select role</option>
                <option>Builder / Developer</option>
                <option>Investor / VC</option>
                <option>Founder / Entrepreneur</option>
                <option>Trader</option>
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
                style={{ accentColor: "#C9A84C" }}
              />
              <label htmlFor="speak" className="text-sm text-gray-400 cursor-pointer">
                I'd like to apply to speak / pitch
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, #C9A84C, #E8C96A)", color: "#000" }}
            >
              {loading ? "Submitting…" : "Secure My Spot →"}
            </button>

            <p className="text-xs text-gray-600 text-center">
              Free entry · 1 April 2026 · Manchester · Organised by Gaskell
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
