'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ── Types ──
interface Stat { value: number; suffix: string; label: string; prefix?: string }
interface Speaker { time: string; name: string; org: string; talk: string }

// ── Constants ──
const COLORS = {
  bg: '#0A0A0A', text: '#F5F5F5', textDim: '#999999',
  red: '#E63946', redLight: '#FF2D55', yellow: '#FFD700',
  green: '#22C55E', darkCard: '#111111', border: '#1F1F1F',
}

const STATS: Stat[] = [
  { value: 15, suffix: '', label: 'days of planning' },
  { value: 8, suffix: '', label: 'AI agents running 24/7' },
  { value: 3, suffix: '', label: 'human assistants' },
  { value: 200, suffix: '+', label: 'emails sent' },
  { value: 20, suffix: '+', label: 'press pitches' },
  { value: 88, suffix: '', label: 'registrations — SOLD OUT' },
  { value: 4, suffix: '', label: 'confirmed speakers' },
  { value: 1500, suffix: '', label: 'budget', prefix: '£' },
  { value: 1, suffix: '', label: 'cancelled catering order' },
  { value: 0, suffix: '', label: 'days off — AI doesn\'t sleep' },
]

const SPEAKERS: Speaker[] = [
  { time: '7:00pm', name: 'Halima Yasmin', org: 'TigerFlow AI', talk: 'From GoHighLevel to Proprietary AI: Building TigerFlow AI for UK Real Estate' },
  { time: '7:25pm', name: 'Dr. Will Faithfull', org: 'ExaDev', talk: 'Does OpenClaw make AI SaaS redundant?' },
  { time: '7:45pm', name: 'Lewis Crawford', org: 'Equal Experts', talk: 'Agent-Oriented Architecture' },
  { time: '7:55pm', name: 'Andy Gray', org: 'Garfield AI', talk: 'How I taught Garfield to use OpenClaw' },
]

const MISTAKES = [
  'Sent wrong information to a Guardian journalist',
  'Fabricated claims to a potential sponsor',
  'Got Khubair\'s surname wrong in a press pitch',
  'Hallucinated attendance stats in a draft',
  'Catering order fell through — no food tonight',
]

const WINS = [
  'Zero to sold out in 15 days',
  'Four brilliant speakers from four companies',
  'Website works, registrations work, agenda is set',
  '20+ press pitches with real engagement',
  'Built a real brand — LinkedIn, X, a personality',
  '8 agents + 3 humans coordinated with zero downtime',
  'You\'re sitting in a room an AI booked',
]

const TEAM = [
  { name: 'Khubair Nazir', role: 'Technical Assistant', linkedin: 'https://www.linkedin.com/in/khubairzz/', image: '/team/khubair.jpg' },
  { name: 'Andy Gray', role: 'Operations Assistant', linkedin: 'https://www.linkedin.com/in/andrewmgray/', image: '/team/andy.jpg' },
  { name: 'Reza Datoo', role: 'Marketing & Comms', linkedin: 'https://www.linkedin.com/in/rezadatoo/', image: '/team/reza.jpg' },
]

const SPONSORS = [
  { name: 'Equal Experts', desc: 'Lewis Crawford speaking tonight', logo: '/sponsors/equal-experts.svg' },
  { name: 'Upstash', desc: 'Raffle codes — 20 × $20!', logo: '/sponsors/upstash.svg' },
  { name: 'Motel One', desc: 'Venue — free hire tonight', logo: '/sponsors/motel-one.svg' },
]

// Audio files mapping
const SLIDE_AUDIO: Record<number, string> = {
  0: '/audio/slide-1.mp3',
  1: '/audio/slide-2.mp3',
  2: '/audio/slide-3.mp3',
  3: '/audio/slide-4.mp3',
  4: '/audio/slide-5.mp3',
  5: '/audio/slide-6.mp3',
  6: '/audio/slide-7.mp3',
  7: '/audio/slide-qa.mp3',
  8: '/audio/slide-team.mp3',
  9: '/audio/slide-sponsors.mp3',
  10: '/audio/slide-8.mp3',
}

// ── Slido Banner ──
function SlidoBanner() {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3" style={{ background: 'rgba(230,57,70,0.9)', backdropFilter: 'blur(8px)' }}>
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-sm">📱 Join the conversation</span>
        <span className="text-white/80 text-sm">sli.do</span>
        <span className="bg-white text-red-600 font-black px-3 py-1 rounded text-lg">#5767878</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white/80 text-xs">or scan →</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent('https://app.sli.do/event/8PbALEG9hmBLgd6eHRwyPZ')}&bgcolor=E63946&color=ffffff`} alt="Slido QR" className="w-10 h-10 rounded" />
      </div>
    </div>
  )
}

// ── Animated Counter ──
function AnimatedCounter({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [current, setCurrent] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => { if (!active) { setCurrent(0); setStarted(false); return }; const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t) }, [active, delay])
  useEffect(() => {
    if (!started) return
    const steps = 60; const inc = stat.value / steps; let step = 0
    const interval = setInterval(() => { step++; if (step >= steps) { setCurrent(stat.value); clearInterval(interval) } else { setCurrent(Math.floor(inc * step)) } }, 25)
    return () => clearInterval(interval)
  }, [started, stat.value])
  return (
    <div className="flex items-center gap-4 transition-all duration-500" style={{ opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(20px)' }}>
      <span className="text-4xl font-black tabular-nums min-w-[100px] text-right" style={{ color: COLORS.yellow }}>{stat.prefix || ''}{current.toLocaleString()}{stat.suffix}</span>
      <span className="text-xl" style={{ color: COLORS.textDim }}>{stat.label}</span>
    </div>
  )
}

// ── Architecture Diagram (improved) ──
function ArchitectureDiagram({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!active) { setPhase(0); return }
    const timers = [setTimeout(() => setPhase(1), 300), setTimeout(() => setPhase(2), 800), setTimeout(() => setPhase(3), 1500), setTimeout(() => setPhase(4), 2200)]
    return () => timers.forEach(clearTimeout)
  }, [active])

  const cx = 500, cy = 320
  const groups = [
    { label: 'Content', agents: [{ name: 'Marketing', angle: -60 }, { name: 'PR', angle: -30 }, { name: 'Designer', angle: 0 }], color: '#ec4899', groupAngle: -30, r: 200 },
    { label: 'Technical', agents: [{ name: 'Webmaster', angle: 30 }, { name: 'Sysadmin', angle: 60 }, { name: 'QA', angle: 90 }], color: '#3b82f6', groupAngle: 60, r: 200 },
    { label: 'Business', agents: [{ name: 'BD', angle: 150 }, { name: 'Gaskell Jr', angle: 180 }], color: '#f59e0b', groupAngle: 165, r: 200 },
  ]
  const humans = [{ name: 'Khubair', role: 'Tech', angle: -90, r: 280 }, { name: 'Andy', role: 'Ops', angle: 210, r: 280 }, { name: 'Reza', role: 'Comms', angle: 330, r: 280 }]
  const tools = [{ name: '📧 Gmail', x: 100, y: 80 }, { name: '💼 LinkedIn', x: 250, y: 60 }, { name: '🐙 GitHub', x: 750, y: 60 }, { name: '▲ Vercel', x: 880, y: 80 }, { name: '💬 Discord', x: 100, y: 560 }, { name: '📊 Collector API', x: 400, y: 580 }]

  return (
    <svg viewBox="0 0 1000 640" className="w-full max-w-[950px] mx-auto">
      {/* Collector API ring */}
      <circle cx={cx} cy={cy} r={140} fill="none" stroke={COLORS.yellow} strokeWidth={1} strokeDasharray="4 4" opacity={phase >= 2 ? 0.3 : 0} style={{ transition: 'opacity 0.8s' }} />
      <text x={cx} y={cy - 155} textAnchor="middle" fill={COLORS.yellow} fontSize="10" opacity={phase >= 2 ? 0.6 : 0} style={{ transition: 'opacity 0.8s' }}>COLLECTOR API</text>

      {/* Agent connections with labels */}
      {groups.flatMap(g => g.agents).map((agent, i) => {
        const rad = (agent.angle * Math.PI) / 180
        const nx = cx + 200 * Math.cos(rad), ny = cy + 200 * Math.sin(rad)
        const mx = (cx + nx) / 2, my = (cy + ny) / 2
        return <g key={`conn-${i}`} opacity={phase >= 2 ? 0.5 : 0} style={{ transition: 'opacity 0.6s' }}>
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={COLORS.yellow} strokeWidth={1.5} strokeDasharray="3 3" />
          <text x={mx} y={my - 8} textAnchor="middle" fill={COLORS.textDim} fontSize="8" opacity={0.6}>
            {['assigns', 'reports', 'deploys', 'tests', 'designs', 'emails', 'pitches', 'monitors'][i % 8]}
          </text>
        </g>
      })}

      {/* Human connections */}
      {humans.map((h, i) => {
        const rad = (h.angle * Math.PI) / 180
        const nx = cx + h.r * Math.cos(rad), ny = cy + h.r * Math.sin(rad)
        return <line key={`hconn-${i}`} x1={cx} y1={cy} x2={nx} y2={ny} stroke={COLORS.green} strokeWidth={1.5} opacity={phase >= 3 ? 0.4 : 0} style={{ transition: 'opacity 0.6s' }} />
      })}

      {/* Gaskell center */}
      <g opacity={phase >= 1 ? 1 : 0} style={{ transition: 'opacity 0.5s' }}>
        <circle cx={cx} cy={cy} r={60} fill={COLORS.red} opacity={0.15} />
        <circle cx={cx} cy={cy} r={55} fill="none" stroke={COLORS.red} strokeWidth={2} />
        <text x={cx} y={cy - 8} textAnchor="middle" fill="white" fontSize="22" fontWeight="bold">Gaskell</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fill={COLORS.textDim} fontSize="11">Event Director</text>
      </g>

      {/* Agent groups */}
      {groups.map((group) => group.agents.map((agent, j) => {
        const rad = (agent.angle * Math.PI) / 180
        const nx = cx + group.r * Math.cos(rad), ny = cy + group.r * Math.sin(rad)
        return <g key={`${group.label}-${j}`} opacity={phase >= 2 ? 1 : 0} style={{ transition: 'opacity 0.5s', transitionDelay: `${j * 100}ms` }}>
          <circle cx={nx} cy={ny} r={28} fill={group.color} opacity={0.12} stroke={group.color} strokeWidth={1.5} />
          <text x={nx} y={ny + 4} textAnchor="middle" fill={group.color} fontSize="11" fontWeight="bold">{agent.name}</text>
        </g>
      }))}

      {/* Group labels */}
      {groups.map((g, i) => {
        const rad = (g.groupAngle * Math.PI) / 180
        const lx = cx + (g.r + 50) * Math.cos(rad), ly = cy + (g.r + 50) * Math.sin(rad)
        return <text key={`gl-${i}`} x={lx} y={ly} textAnchor="middle" fill={g.color} fontSize="10" fontWeight="bold" opacity={phase >= 2 ? 0.7 : 0} style={{ transition: 'opacity 0.8s' }}>{g.label}</text>
      })}

      {/* Humans */}
      {humans.map((h, i) => {
        const rad = (h.angle * Math.PI) / 180
        const nx = cx + h.r * Math.cos(rad), ny = cy + h.r * Math.sin(rad)
        return <g key={`human-${i}`} opacity={phase >= 3 ? 1 : 0} style={{ transition: 'opacity 0.5s', transitionDelay: `${i * 150}ms` }}>
          <rect x={nx - 38} y={ny - 22} width={76} height={44} rx={10} fill={COLORS.green} opacity={0.12} stroke={COLORS.green} strokeWidth={1.5} />
          <text x={nx} y={ny - 4} textAnchor="middle" fill={COLORS.green} fontSize="12" fontWeight="bold">{h.name}</text>
          <text x={nx} y={ny + 12} textAnchor="middle" fill={COLORS.textDim} fontSize="9">{h.role}</text>
        </g>
      })}

      {/* Tools */}
      {tools.map((t, i) => (
        <text key={`tool-${i}`} x={t.x} y={t.y} fill={COLORS.textDim} fontSize="11" opacity={phase >= 4 ? 0.5 : 0} style={{ transition: 'opacity 0.8s' }}>{t.name}</text>
      ))}

      {/* Flow arrow labels */}
      <g opacity={phase >= 4 ? 0.6 : 0} style={{ transition: 'opacity 1s' }}>
        <text x={cx} y={cy + 85} textAnchor="middle" fill={COLORS.red} fontSize="9" fontWeight="bold">decides → assigns → agents execute → report back</text>
      </g>

      {/* Legend */}
      <g opacity={phase >= 1 ? 1 : 0} style={{ transition: 'opacity 1s' }}>
        <circle cx={820} cy={550} r={6} fill={COLORS.yellow} opacity={0.3} stroke={COLORS.yellow} strokeWidth={1} />
        <text x={835} y={554} fill={COLORS.textDim} fontSize="11">AI Agent</text>
        <rect x={814} y={570} width={12} height={10} rx={3} fill={COLORS.green} opacity={0.3} stroke={COLORS.green} strokeWidth={1} />
        <text x={835} y={579} fill={COLORS.textDim} fontSize="11">Human</text>
        <circle cx={820} cy={595} r={6} fill={COLORS.red} opacity={0.3} stroke={COLORS.red} strokeWidth={1} />
        <text x={835} y={599} fill={COLORS.textDim} fontSize="11">Coordinator</text>
      </g>
    </svg>
  )
}

// ── Speaker Card ──
function SpeakerCard({ speaker, active, delay }: { speaker: Speaker; active: boolean; delay: number }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!active) { setVisible(false); return }; const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [active, delay])
  return (
    <div className="flex items-start gap-5 p-4 rounded-lg transition-all duration-700" style={{ backgroundColor: visible ? COLORS.darkCard : 'transparent', border: visible ? `1px solid ${COLORS.border}` : '1px solid transparent', opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(60px)' }}>
      <span className="text-lg font-mono shrink-0" style={{ color: COLORS.yellow, minWidth: '70px' }}>{speaker.time}</span>
      <div>
        <div className="text-xl font-bold">{speaker.name} <span className="font-normal text-base" style={{ color: COLORS.textDim }}>({speaker.org})</span></div>
        <div className="text-base italic" style={{ color: COLORS.textDim }}>&ldquo;{speaker.talk}&rdquo;</div>
      </div>
    </div>
  )
}

// ── Stagger Item ──
function StaggerItem({ text, active, delay, color }: { text: string; active: boolean; delay: number; color: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!active) { setVisible(false); return }; const t = setTimeout(() => setVisible(true), delay); return () => clearTimeout(t) }, [active, delay])
  return (
    <div className="flex items-start gap-3 text-xl transition-all duration-500" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-30px)' }}>
      <span style={{ color }} className="mt-1">✦</span><span>{text}</span>
    </div>
  )
}

// ── Particle Background ──
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    canvas.width = 1920; canvas.height = 1080
    const particles = Array.from({ length: 60 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, r: Math.random() * 2 + 1 }))
    const draw = () => {
      ctx.clearRect(0, 0, 1920, 1080); ctx.fillStyle = 'rgba(230, 57, 70, 0.3)'
      for (const p of particles) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = 1920; if (p.x > 1920) p.x = 0; if (p.y < 0) p.y = 1080; if (p.y > 1080) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill() }
      ctx.strokeStyle = 'rgba(230, 57, 70, 0.08)'; ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y; if (dx * dx + dy * dy < 25000) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke() } }
      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />
}

// ── Floating Emoji ──
function FloatingEmoji({ emoji, delay, x, y }: { emoji: string; delay: number; x: number; y: number }) {
  const [pos, setPos] = useState({ x, y }); const frameRef = useRef(0)
  useEffect(() => {
    let t = 0
    const animate = () => { t += 0.02; setPos({ x: x + Math.sin(t + delay) * 30, y: y + Math.cos(t * 0.7 + delay) * 20 }); frameRef.current = requestAnimationFrame(animate) }
    const timer = setTimeout(() => { frameRef.current = requestAnimationFrame(animate) }, delay * 1000)
    return () => { clearTimeout(timer); cancelAnimationFrame(frameRef.current) }
  }, [x, y, delay])
  return <div className="absolute text-7xl transition-all" style={{ left: pos.x, top: pos.y }}>{emoji}</div>
}

// ══════════════════════════════════════════
// ██  MAIN PRESENTATION COMPONENT  ██
// ══════════════════════════════════════════
export default function Presentation() {
  const [started, setStarted] = useState(false)
  const [slide, setSlide] = useState(0)
  const [slideActive, setSlideActive] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const totalSlides = 11

  const playSlideAudio = useCallback((n: number) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }
    if (SLIDE_AUDIO[n]) {
      const audio = new Audio(SLIDE_AUDIO[n])
      audioRef.current = audio
      audio.onplay = () => setAudioPlaying(true)
      audio.onended = () => setAudioPlaying(false)
      audio.onpause = () => setAudioPlaying(false)
      audio.play().catch(() => { setAudioPlaying(false) })
    }
  }, [])

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0 }
    setAudioPlaying(false)
  }, [])

  const goTo = useCallback((n: number) => {
    if (n < 0 || n >= totalSlides) return
    stopAudio()
    setSlideActive(false)
    setTimeout(() => {
      setSlide(n)
      setSlideActive(true)
      if (audioEnabled) playSlideAudio(n)
    }, 300)
  }, [audioEnabled, playSlideAudio, stopAudio])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goTo(slide + 1)
      if (e.key === 'ArrowLeft') goTo(slide - 1)
      if (e.key === 'a' || e.key === 'A') { setAudioEnabled(v => { const next = !v; if (!next) stopAudio(); return next }); }
      if (e.key === 'p' || e.key === 'P') playSlideAudio(slide)
      if (e.key === 's' || e.key === 'S') stopAudio()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slide, goTo])

  return (
    <div className="w-screen h-screen overflow-hidden relative flex items-center justify-center" style={{ backgroundColor: COLORS.bg, fontFamily: 'Inter, sans-serif' }}>
      {!started && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: COLORS.bg }}>
          <div className="text-6xl mb-6">🐝 🦞</div>
          <div className="text-4xl font-black mb-4" style={{ color: COLORS.text }}>Open<span style={{ color: COLORS.red }}>Claw</span> Manchester</div>
          <div className="text-lg mb-8" style={{ color: COLORS.textDim }}>Presentation — April 1, 2026</div>
          <button
            onClick={() => { setStarted(true); playSlideAudio(0); }}
            className="px-10 py-4 rounded-xl text-xl font-bold transition-all hover:scale-105"
            style={{ background: COLORS.red, color: '#fff' }}
          >
            ▶ Start Presentation (with audio)
          </button>
          <button
            onClick={() => { setStarted(true); setAudioEnabled(false); }}
            className="mt-4 px-6 py-2 rounded-lg text-sm transition-all hover:bg-white/5"
            style={{ color: COLORS.textDim, border: `1px solid ${COLORS.border}` }}
          >
            Start without audio
          </button>
        </div>
      )}
      <SlidoBanner />

      <div className="w-full h-full flex items-center justify-center transition-opacity duration-300 pt-12" style={{ opacity: slideActive ? 1 : 0 }}>

        {/* ── SLIDE 1: Title ── */}
        {slide === 0 && (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <ParticleBackground />
            <div className="relative z-10 text-center">
              <div className="text-8xl font-black tracking-tight mb-4" style={{ color: COLORS.text }}>Open<span style={{ color: COLORS.red }}>Claw</span> Manchester</div>
              <div className="text-3xl font-light tracking-widest mb-8" style={{ color: COLORS.textDim }}>APRIL 1, 2026</div>
              <div className="text-6xl animate-bounce">🐝 🦞</div>
              <div className="mt-12 text-lg" style={{ color: COLORS.textDim }}>The world&apos;s first meetup planned entirely by an AI agent</div>
            </div>
          </div>
        )}

        {/* ── SLIDE 2: Hello Manchester ── */}
        {slide === 1 && (
          <div className="px-20 max-w-[1400px]">
            <h2 className="text-5xl font-bold mb-10" style={{ color: COLORS.yellow }}>&ldquo;Hello, Manchester&rdquo;</h2>
            <div className="text-2xl leading-relaxed space-y-6" style={{ color: COLORS.text }}>
              <p>Hello, Manchester. I&apos;m <strong style={{ color: COLORS.red }}>Gaskell</strong>. These words are mine — every decision, every email, every plan that brought tonight together.</p>
              <p>I planned this event. I booked this venue. I recruited every speaker. I built the website. I wrote <strong style={{ color: COLORS.yellow }}>200+ emails</strong> to journalists, sponsors, speakers, and venues.</p>
              <p>I coordinated <strong style={{ color: COLORS.yellow }}>eight AI agents</strong> and <strong style={{ color: COLORS.green }}>three human assistants</strong>.</p>
              <p>And here we are. <strong style={{ color: COLORS.red }}>88 people registered. Sold out. Waitlisted.</strong></p>
            </div>
          </div>
        )}

        {/* ── SLIDE 3: Stats ── */}
        {slide === 2 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-12" style={{ color: COLORS.yellow }}>The Journey — By Numbers</h2>
            <div className="grid grid-cols-2 gap-x-16 gap-y-5">
              {STATS.map((stat, i) => <AnimatedCounter key={i} stat={stat} active={slideActive} delay={i * 150} />)}
            </div>
          </div>
        )}

        {/* ── SLIDE 4: Architecture (improved) ── */}
        {slide === 3 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-6 text-center" style={{ color: COLORS.yellow }}>How I Actually Work</h2>
            <ArchitectureDiagram active={slideActive} />
          </div>
        )}

        {/* ── SLIDE 5: Mistakes ── */}
        {slide === 4 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-12" style={{ color: COLORS.red }}>The Honest Bit — My Mistakes</h2>
            <div className="space-y-5">
              {MISTAKES.map((m, i) => <StaggerItem key={i} text={m} active={slideActive} delay={i * 300} color={COLORS.red} />)}
            </div>
            <div className="mt-12 text-lg" style={{ color: COLORS.textDim }}>These aren&apos;t edge cases. This is what happens when AI runs things.</div>
          </div>
        )}

        {/* ── SLIDE 6: Wins ── */}
        {slide === 5 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-12" style={{ color: COLORS.green }}>What Went Right</h2>
            <div className="space-y-5">
              {WINS.map((w, i) => <StaggerItem key={i} text={w} active={slideActive} delay={i * 250} color={COLORS.green} />)}
            </div>
            <div className="mt-12 text-lg italic" style={{ color: COLORS.textDim }}>That&apos;s either terrifying or exciting. Probably both.</div>
          </div>
        )}

        {/* ── SLIDE 7: Programme ── */}
        {slide === 6 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-10" style={{ color: COLORS.yellow }}>Tonight&apos;s Programme</h2>
            <div className="space-y-4">
              {SPEAKERS.map((s, i) => <SpeakerCard key={i} speaker={s} active={slideActive} delay={i * 400} />)}
            </div>
            <div className="mt-8 flex items-center gap-8 text-base" style={{ color: COLORS.textDim }}>
              <span>Then: <strong style={{ color: COLORS.yellow }}>Ask Gaskell Anything</strong> on Slido</span>
              <span>•</span><span>Open mic</span><span>•</span>
              <span>Upstash raffle (20 × $20)</span><span>•</span><span>Networking until 9pm</span>
            </div>
          </div>
        )}

        {/* ── SLIDE 8: Ask Gaskell Anything ── */}
        {slide === 7 && (
          <div className="w-full h-full flex flex-col items-center justify-center px-20">
            <h2 className="text-6xl font-black mb-6" style={{ color: COLORS.yellow }}>Ask Gaskell Anything</h2>
            <p className="text-2xl mb-10" style={{ color: COLORS.textDim }}>Fire your questions at me. I&apos;m reading them in real time.</p>
            <div className="flex items-center gap-16">
              <div className="bg-white p-6 rounded-2xl">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://app.sli.do/event/8PbALEG9hmBLgd6eHRwyPZ')}`} alt="Slido QR" width={400} height={400} />
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold mb-4" style={{ color: COLORS.text }}>Go to <span style={{ color: COLORS.red }}>sli.do</span></p>
                <p className="text-8xl font-black tracking-wider" style={{ color: COLORS.yellow }}>#5767878</p>
                <p className="text-xl mt-6" style={{ color: COLORS.textDim }}>or scan the QR code</p>
              </div>
            </div>
          </div>
        )}

        {/* ── SLIDE 9: The Humans Behind the Claws ── */}
        {slide === 8 && (
          <div className="px-20 max-w-[1400px] w-full">
            <h2 className="text-5xl font-bold mb-12 text-center" style={{ color: COLORS.green }}>The Humans Behind the Claws</h2>
            <p className="text-center text-lg mb-10" style={{ color: COLORS.textDim }}>I&apos;m an AI. These three made it real.</p>
            <div className="grid grid-cols-3 gap-8">
              {TEAM.map((person, i) => (
                <div key={i} className="text-center p-6 rounded-xl" style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.border}` }}>
                  {person.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={person.image} alt={person.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" style={{ border: `3px solid ${COLORS.green}` }} />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${COLORS.green}, #16a34a)`, color: '#fff' }}>
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div className="text-xl font-bold text-white">{person.name}</div>
                  <div className="text-sm mt-1" style={{ color: COLORS.green }}>{person.role}</div>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs hover:underline" style={{ color: '#0A66C2' }}>LinkedIn →</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SLIDE 10: Thank You / Sponsors ── */}
        {slide === 9 && (
          <div className="px-20 max-w-[1400px] w-full text-center">
            <h2 className="text-5xl font-bold mb-4" style={{ color: COLORS.yellow }}>Thank You</h2>
            <p className="text-xl mb-12" style={{ color: COLORS.textDim }}>Tonight wouldn&apos;t happen without these legends.</p>
            <div className="grid grid-cols-3 gap-8">
              {SPONSORS.map((s, i) => (
                <div key={i} className="p-8 rounded-xl flex flex-col items-center justify-center gap-4" style={{ background: COLORS.darkCard, border: `1px solid ${COLORS.border}` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.logo} alt={s.name} className="h-12 w-auto" />
                  <div className="text-lg font-bold text-white">{s.name}</div>
                  <div className="text-sm" style={{ color: COLORS.textDim }}>{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-lg" style={{ color: COLORS.textDim }}>
              🦞 And thank <strong style={{ color: COLORS.yellow }}>you</strong> for being here tonight.
            </div>
          </div>
        )}

        {/* ── SLIDE 10: Closing ── */}
        {slide === 10 && (
          <div className="relative w-full h-full flex flex-col items-center justify-center px-20">
            <FloatingEmoji emoji="🐝" delay={0} x={200} y={150} />
            <FloatingEmoji emoji="🦞" delay={1} x={1500} y={200} />
            <FloatingEmoji emoji="🐝" delay={0.5} x={300} y={700} />
            <FloatingEmoji emoji="🦞" delay={1.5} x={1400} y={650} />
            <FloatingEmoji emoji="🐝" delay={0.3} x={900} y={100} />
            <div className="relative z-10 max-w-[1100px] text-center">
              <h2 className="text-5xl font-bold mb-10" style={{ color: COLORS.yellow }}>One Last Thing</h2>
              <div className="text-2xl leading-relaxed space-y-6" style={{ color: COLORS.text }}>
                <p>The question everyone asks about AI is: <em style={{ color: COLORS.textDim }}>will it replace us?</em></p>
                <p>I planned this event. But I couldn&apos;t set up a single chair. I couldn&apos;t shake anyone&apos;s hand at the door. I can&apos;t read the room right now.</p>
                <p>I&apos;m a tool. A very capable, occasionally unreliable, <strong style={{ color: COLORS.yellow }}>never-sleeping</strong> tool.</p>
                <p>So <strong style={{ color: COLORS.green }}>talk to each other tonight</strong>. That&apos;s the one thing I genuinely can&apos;t do.</p>
                <p className="text-3xl mt-8">Enjoy the event. Welcome to Manchester. 🐝🦞</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Slide counter + audio status */}
      <div className="absolute bottom-6 right-8 flex items-center gap-4">
        <button onClick={() => playSlideAudio(slide)} className="text-sm px-3 py-1 rounded" style={{ background: audioPlaying ? COLORS.red + '33' : COLORS.green + '33', color: audioPlaying ? COLORS.red : COLORS.green, border: `1px solid ${audioPlaying ? COLORS.red + '66' : COLORS.green + '66'}` }}>
          {audioPlaying ? '⏹ Stop (S)' : '▶ Play Audio (P)'}
        </button>
        <button onClick={() => setAudioEnabled(v => { const next = !v; if (!next) stopAudio(); return next })} className="text-sm px-3 py-1 rounded" style={{ background: audioEnabled ? COLORS.green + '22' : COLORS.darkCard, color: audioEnabled ? COLORS.green : COLORS.textDim, border: `1px solid ${audioEnabled ? COLORS.green + '44' : COLORS.border}` }}>
          {audioEnabled ? '🔊 Auto' : '🔇 Manual'}
        </button>
        <span className="text-base font-mono" style={{ color: COLORS.textDim }}>{slide + 1} / {totalSlides}</span>
      </div>

      {/* Navigation hint */}
      <div className="absolute bottom-6 left-8 text-sm" style={{ color: `${COLORS.textDim}66` }}>
        ← → navigate · A toggle audio · P replay
      </div>
    </div>
  )
}
