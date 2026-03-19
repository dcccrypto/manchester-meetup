"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-04-01T18:00:00+01:00");

function getTimeLeft() {
  const now = new Date();
  const diff = EVENT_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  // Initialise with actual time left so SSR/hydration shows the correct countdown
  // (not the "event is NOW" fallback which only applies post-event)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(getTimeLeft);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center text-sm font-semibold" style={{ color: "#E63946" }}>
        🦞 The event is happening NOW! Get in the claw.
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 my-6">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-xl px-4 py-3 min-w-[64px]"
          style={{
            background: "rgba(230,57,70,0.08)",
            border: "1px solid rgba(230,57,70,0.25)",
          }}
        >
          <span
            className="text-3xl font-extrabold tabular-nums"
            style={{ color: "#E63946", lineHeight: 1 }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
}
