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
            <span style={{ color: "#E63946" }}>Grab Your Spot</span>
          </h2>
          <p className="text-gray-500">Free entry. Register now and join us in Manchester. 🦞</p>
        </div>

        <div
          className="rounded-xl border p-8"
          style={{ background: "#110404", borderColor: "#2a0608", boxShadow: "0 0 40px rgba(230,57,70,0.08)" }}
        >
          <div className="luma-checkout" data-slug="fd5atlfl" data-show-description></div>
          <Script src="https://embed.lu.ma/checkout-button.js" strategy="lazyOnload" />
        </div>
      </div>
    </section>
  );
}
