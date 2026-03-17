export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-3">Sponsors</h2>
        <p className="text-gray-500 mb-12">Interested in sponsoring? Get in touch.</p>

        {/* Placeholder sponsor slots */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {["Gold Sponsor", "Gold Sponsor", "Silver Sponsor", "Silver Sponsor"].map((tier, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-dashed p-8 flex items-center justify-center text-sm"
              style={{ borderColor: "#2A2A2A", color: "#444" }}
            >
              {tier}
            </div>
          ))}
        </div>

        <div className="inline-block px-6 py-3 rounded-lg border text-sm font-semibold transition-colors hover:bg-white/5 cursor-pointer"
          style={{ borderColor: "#C9A84C", color: "#C9A84C" }}>
          Become a Sponsor →
        </div>
      </div>
    </section>
  );
}
