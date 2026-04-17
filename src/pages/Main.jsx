import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import BottomNav from '../components/BottomNav'

export default function Main() {
  const navigate    = useNavigate()
  const headerRef   = useRef(null)
  const cardsRef    = useRef([])
  const navRef      = useRef(null)

  // ── Page-load animation ──────────────────────────────────────────────────
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(headerRef.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
    .fromTo(cards,
      { opacity: 0, y: 38 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 },
      '-=0.15'
    )
    .fromTo(navRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35 },
      '-=0.2'
    )
  }, [])

  // ── Card interactions ────────────────────────────────────────────────────
  const onEnter = (e) => gsap.to(e.currentTarget, {
    scale: 1.03,
    boxShadow: '0 12px 32px rgba(0,0,0,0.16)',
    duration: 0.2,
    ease: 'power2.out',
  })

  const onLeave = (e) => gsap.to(e.currentTarget, {
    scale: 1,
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    duration: 0.2,
    ease: 'power2.out',
  })

  // Press-down animation then navigate
  const goTo = (path) => (e) => {
    const el = e.currentTarget
    gsap.timeline()
      .to(el, { scale: 0.97, duration: 0.08, ease: 'power2.in' })
      .to(el, { scale: 1,    duration: 0.18, ease: 'back.out(3)',
          onComplete: () => navigate(path) })
  }

  // Ref + event-handler spread helper
  const card = (i, path) => ({
    ref: (el) => { cardsRef.current[i] = el },
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onClick:      goTo(path),
    style:        { boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' },
  })

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="flex items-center justify-between px-5 py-4 flex-shrink-0"
      >
        {/* Left: avatar + user info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/profil')}
            className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 select-none flex-shrink-0 hover:bg-gray-300 transition-colors"
          >
            PFP
          </button>
          <div className="leading-tight">
            <p className="font-bold text-sm text-black">Benutzername</p>
            <p className="text-xs text-gray-500">A1 (Anfänger)</p>
          </div>
        </div>

        {/* Right: bell + chat in grey circles */}
        <div className="flex items-center gap-2">
          {/* Bell with red notification dot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => navigate('/benachrichtigungen')}
              className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <Bell className="w-[17px] h-[17px] text-black" strokeWidth={2} />
            </button>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#DD0000] rounded-full border-2 border-white pointer-events-none" />
          </div>

          {/* Chat */}
          <button
            type="button"
            onClick={() => navigate('/chat')}
            className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <MessageCircle className="w-[17px] h-[17px] text-black" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 px-5 pt-2 pb-24 overflow-y-auto">

        {/* ── Desktop layout ─────────────────────────────────────────────── */}
        <div className="hidden md:flex gap-4" style={{ height: '290px' }}>

          {/* Gold card — Meine Lektion */}
          <div
            {...card(0, '/lektion/1')}
            className="w-[37%] flex-shrink-0 bg-[#FFCE00] rounded-2xl p-6 relative overflow-hidden"
          >
            {/* Red badge */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-[#DD0000] rounded-full flex items-center justify-center text-white text-xs font-black z-10">
              1
            </div>

            <h2 className="text-2xl font-black text-black leading-tight">Meine Lektion</h2>
            <p className="text-sm font-semibold text-black/60 mt-1">Lektion 1A</p>

            {/* Bottom: progress % + eagle */}
            <div className="absolute bottom-5 left-6 right-5 flex items-end justify-between">
              <p className="text-5xl font-black text-black leading-none">67%</p>
              <img
                src="/eagle.png"
                alt="Bundesadler"
                className="h-28 w-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Right 2 × 2 grid */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">

            {/* Bücher — blue border (selected state) */}
            <div
              {...card(1, '/bucher')}
              className="bg-[#F0F0F0] rounded-2xl p-5 border-2 border-blue-400"
            >
              <h3 className="font-black text-[15px] text-black">Bücher</h3>
              <p className="text-xs text-gray-400 mt-1">Hier Bücher lesen</p>
            </div>

            {/* Podcast */}
            <div {...card(2, '/podcast')} className="bg-[#F0F0F0] rounded-2xl p-5">
              <h3 className="font-black text-[15px] text-black">Podcast</h3>
              <p className="text-xs text-gray-400 mt-1">Hier können Sie Podcasts anhören</p>
            </div>

            {/* Wortschatz */}
            <div {...card(3, '/wortschatz')} className="bg-[#F0F0F0] rounded-2xl p-5">
              <h3 className="font-black text-[15px] text-black">Wortschatz</h3>
              <p className="text-xs text-gray-400 mt-1">Hier Wörter lernen</p>
            </div>

            {/* Videos */}
            <div {...card(4, '/videos')} className="bg-[#F0F0F0] rounded-2xl p-5">
              <h3 className="font-black text-[15px] text-black">Videos</h3>
              <p className="text-xs text-gray-400 mt-1">Hier Videos ansehen</p>
            </div>
          </div>
        </div>

        {/* ── Mobile layout ──────────────────────────────────────────────── */}
        <div className="md:hidden flex gap-3" style={{ minHeight: '224px' }}>

          {/* Gold card — compact */}
          <div
            ref={(el) => { cardsRef.current[5] = el }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={goTo('/lektion/1')}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}
            className="w-[45%] flex-shrink-0 bg-[#FFCE00] rounded-2xl p-4 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 w-5 h-5 bg-[#DD0000] rounded-full flex items-center justify-center text-white text-[10px] font-black">
              1
            </div>
            <h2 className="text-[15px] font-black text-black leading-tight">Meine Lektion</h2>
            <p className="text-[11px] font-semibold text-black/60 mt-0.5">Lektion 1A</p>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <p className="text-3xl font-black text-black leading-none">67%</p>
              <img
                src="/eagle.png"
                alt="Bundesadler"
                className="h-16 w-auto object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* 4 stacked section buttons */}
          <div className="flex-1 flex flex-col gap-2">
            {[
              { title: 'Bücher',     path: '/bucher',     i: 6 },
              { title: 'Videos',     path: '/videos',     i: 7 },
              { title: 'Podcasts',   path: '/podcast',    i: 8 },
              { title: 'Wortschatz', path: '/wortschatz', i: 9 },
            ].map(({ title, path, i }) => (
              <div
                key={title}
                ref={(el) => { cardsRef.current[i] = el }}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                onClick={goTo(path)}
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer' }}
                className="bg-[#F0F0F0] rounded-xl px-4 py-3 flex-1 flex flex-col justify-center min-h-0"
              >
                <p className="font-black text-sm text-black">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Bottom navbar ────────────────────────────────────────────────── */}
      <BottomNav ref={navRef} />
    </div>
  )
}
