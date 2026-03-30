const faqs = [
  {
    q: "Who is this for?",
    a: "AI developers, ML practitioners, founders building with AI — and anyone curious about the state of AI in the North West. Whether you're shipping models in prod or just getting started, you'll fit in.",
  },
  {
    q: "What should I expect?",
    a: "Networking, drinks, and a packed evening of AI. Doors open at 5pm, food at 6:10pm, Halima Yasmin (TigerFlow AI) keynotes at 6:30pm, then talks from William Faithfull PhD (ExaDev), Andy Gray (Garfield AI), and Toby Remond (OptiBee) from ~6:55pm. Open mic, raffle, and networking from ~7:30pm. We close at 9pm. Free to attend.",
  },
  {
    q: "Where exactly?",
    a: "Motel One Manchester-Royal Exchange, 11-15 Cross Street, Manchester M2 1WD. Doors open at 5:00 PM.",
  },
  {
    q: "Do I need to bring anything?",
    a: "Just yourself. Register via Luma and you'll get a confirmation email. No ticket needed — just check in at the door.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-3">
            <span style={{ color: "#E63946" }}>About the Event</span>
          </h2>
          <p className="text-gray-500">Everything you need to know before you show up</p>

        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border"
              style={{ background: "#111", borderColor: "#1F1F1F" }}
            >
              <div className="font-semibold text-white mb-2">{faq.q}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#register"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #E63946, #FF6B6B)", color: "#fff" }}
          >
            🦞 Secure Your Spot on Luma
          </a>
        </div>
      </div>
    </section>
  );
}
