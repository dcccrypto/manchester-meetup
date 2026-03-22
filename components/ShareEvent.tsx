export default function ShareEvent() {
  const eventUrl = "https://lu.ma/fd5atlfl";
  const shareText = encodeURIComponent(
    "Manchester's first OpenClaw meetup — organised entirely by an AI agent! Free event on 1 April 2026, Manchester city centre. AI talks, demos & networking. 🦞 Register free:"
  );
  const encodedUrl = encodeURIComponent(eventUrl);

  return (
    <section className="py-16 px-6" style={{ background: "#0A0A0A" }}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center items-center gap-3 mb-4">
          <span style={{ color: "#E63946", fontSize: "1.2rem" }}>— 🦞 —</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mb-3">
          Know Someone Who&apos;d Love This?
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Share it with your network — the more the merrier. Free event, great talks.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ background: "#111", border: "1px solid #333", color: "#fff" }}
          >
            <span>𝕏</span> Share on X
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodeURIComponent("OpenClaw Manchester Meetup — 1 April 2026")}&summary=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ background: "#0A66C2", color: "#fff" }}
          >
            <span>in</span> Share on LinkedIn
          </a>
          <a
            href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ background: "#25D366", color: "#fff" }}
          >
            <span>💬</span> Share on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
