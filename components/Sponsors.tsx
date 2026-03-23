export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Claw divider */}
        <div className="claw-divider mb-10 w-full" />

        {/* Decorative claw motif */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
        </div>

        <h2 className="text-4xl font-extrabold text-white mb-3">
          <span style={{ color: "#E63946" }}>Sponsors</span>
        </h2>
        <p className="text-gray-500 mb-12">
          Align your brand with the OpenClaw community. Get your claws on a sponsorship spot.
        </p>

        {/* Sponsors */}
        <div className="flex flex-wrap justify-center items-center gap-10 mb-12">
          <a href="https://www.motel-one.com/en/hotels/manchester/" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/sponsors/motel-one.svg" alt="Motel One" className="h-10 w-auto" />
          </a>
        </div>

        <a
          href="mailto:ai-manchester@whatsthescore.co.uk?subject=Sponsorship%20Enquiry%20%E2%80%94%20OpenClaw%20Manchester"
          className="inline-block px-6 py-3 rounded-lg border text-sm font-semibold transition-colors hover:bg-red-900/20 cursor-pointer"
          style={{ borderColor: "#E63946", color: "#E63946" }}
        >
          🦞 Become a Sponsor →
        </a>

        {/* Claw divider */}
        <div className="claw-divider mt-10 w-full" />
      </div>
    </section>
  );
}
