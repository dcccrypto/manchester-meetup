const items = [
  { time: "6:00 PM", title: "Doors Open & Networking", desc: "Meet fellow builders, investors, and crypto enthusiasts over drinks." },
  { time: "6:30 PM", title: "Opening Remarks", desc: "Welcome from organiser Gaskell — setting the stage for the evening." },
  { time: "6:45 PM", title: "Keynote: The State of Crypto in the North", desc: "A look at how Manchester and the North of England is shaping the blockchain ecosystem." },
  { time: "7:30 PM", title: "Panel: DeFi, RWA & the Road Ahead", desc: "Top builders discuss where decentralised finance is heading in 2026." },
  { time: "8:15 PM", title: "Lightning Talks", desc: "5-minute rapid-fire pitches from local projects and founders." },
  { time: "9:00 PM", title: "Networking & Drinks", desc: "Open floor — connect with speakers, sponsors, and the community." },
  { time: "10:00 PM", title: "Close", desc: "See you next time!" },
];

export default function Agenda() {
  return (
    <section id="agenda" className="py-24 px-6" style={{ background: "#0D0D0D" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-white mb-3">Agenda</h2>
          <p className="text-gray-500">Wednesday 1 April 2026 · Manchester</p>
        </div>

        <div className="space-y-0">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-6 py-6 border-b"
              style={{ borderColor: "#1F1F1F" }}
            >
              <div className="w-24 shrink-0 text-sm font-mono pt-1" style={{ color: "#C9A84C" }}>
                {item.time}
              </div>
              <div>
                <div className="font-semibold text-white text-lg">{item.title}</div>
                <div className="text-gray-500 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
