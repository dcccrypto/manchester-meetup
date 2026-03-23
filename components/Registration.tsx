"use client";
import Script from "next/script";

export default function Registration() {
  return (
    <section id="register" className="py-24 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          {/* Decorative claw motif */}
          <div className="flex justify-center items-center gap-3 mb-4">
            <span style={{ color: "#E63946", fontSize: "1.4rem" }}>— 🦞 —</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            <span style={{ color: "#E63946" }}>Secure Your Spot on Luma</span>
          </h2>
          <p className="text-gray-500">Free entry. Secure your spot on Luma and join us in Manchester. 🦞</p>
        </div>

        <div
          className="rounded-xl overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(230,57,70,0.08)" }}
        >
          <iframe
            src="https://lu.ma/embed/event/fd5atlfl/simple"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: "1px solid #2a0608", borderRadius: "12px", background: "#110404" }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
}
