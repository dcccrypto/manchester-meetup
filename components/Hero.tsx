import Image from "next/image";
import Countdown from "@/components/Countdown";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 claw-scratch"
      style={{
        background: "radial-gradient(ellipse at center top, #1a0404 0%, #0A0A0A 70%)",
      }}
    >
      {/* Hero banner background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-banner.png"
          alt="OpenClaw Manchester Meetup hero banner"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.85) 60%, #0A0A0A 100%)" }} />
      </div>
      {/* Lobster red glow — primary */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none lobster-glow"
        style={{
          background: "radial-gradient(ellipse, #E63946 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Secondary red accent glow */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[400px] h-[300px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #FF2D55 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <Image src="/mascot.png" alt="OpenClaw Manchester mascot" width={200} height={200} className="object-contain drop-shadow-[0_0_30px_rgba(230,57,70,0.4)]" />
        </div>

        <div className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border"
          style={{ borderColor: "#E63946", color: "#E63946", background: "rgba(230,57,70,0.08)" }}>
          Manchester · 1 April 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white mb-6">
          OpenClaw <span style={{ color: "#E63946" }}>Manchester</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
          Manchester's first OpenClaw meetup — organised and co-ordinated entirely
          by Gaskell, an OpenClaw agent. 🦞
        </p>



        <Countdown />

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://lu.ma/fd5atlfl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
          >
            🦞 Secure Your Spot on Luma
          </a>
          <a
            href="#agenda"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-lg border transition-colors hover:bg-white/5"
            style={{ borderColor: "#333", color: "#aaa" }}
          >
            View Agenda ↓
          </a>
        </div>

        {/* Claw divider */}
        <div className="claw-divider my-10 w-full" />

        {/* Event details strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border rounded-xl p-8"
          style={{ borderColor: "#2a0608", background: "rgba(17,4,5,0.9)", boxShadow: "0 0 30px rgba(230,57,70,0.08)" }}>
          <div>
            <div className="text-3xl mb-2">📅</div>
            <div className="font-semibold text-white">Wednesday, 1 April 2026</div>
            <div className="text-sm text-gray-500 mt-1">5:00 PM – 9:00 PM</div>
          </div>
          <div>
            <div className="text-3xl mb-2">📍</div>
            <div className="font-semibold text-white">Motel One Manchester-Royal Exchange</div>
            <div className="text-sm text-gray-500 mt-1">
              <a
                href="https://maps.google.com/?q=11-15+Cross+Street,+Manchester+M2+1WD"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#E63946" }}
              >
                11-15 Cross Street, Manchester M2 1WD ↗
              </a>
            </div>
          </div>
          <div>
            <div className="text-3xl mb-2">🦞</div>
            <div className="font-semibold text-white">Free Entry</div>
            <div className="text-sm text-gray-500 mt-1">Registration required</div>
          </div>
        </div>
      </div>
    </section>
  );
}
