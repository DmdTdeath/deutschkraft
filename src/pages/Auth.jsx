import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import AuthForm from '../components/AuthForm'

export default function Auth() {
  const blackRef = useRef(null)
  const redRef = useRef(null)
  const goldRef = useRef(null)
  const formRef = useRef(null)
  const mobileBannerRef = useRef(null)

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768

    if (isDesktop) {
      // Bands slide in from the left, form slides in from the right
      gsap.set([blackRef.current, redRef.current, goldRef.current], { x: '-100%' })
      gsap.set(formRef.current, { x: 80, opacity: 0 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(blackRef.current, { x: 0, duration: 0.85 }, 0)
        .to(redRef.current, { x: 0, duration: 0.85 }, 0.12)
        .to(goldRef.current, { x: 0, duration: 0.85 }, 0.24)
        .to(formRef.current, { x: 0, opacity: 1, duration: 0.8 }, 0.35)
    } else {
      // Mobile: banner slides down, form fades up
      gsap.set(mobileBannerRef.current, { y: -60, opacity: 0 })
      gsap.set(formRef.current, { y: 40, opacity: 0 })

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(mobileBannerRef.current, { y: 0, opacity: 1, duration: 0.6 })
        .to(formRef.current, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden bg-gray-50">

      {/* ── Mobile: flag banner ── */}
      <div ref={mobileBannerRef} className="md:hidden">
        <div className="bg-black py-5 flex items-center justify-center">
          <h1
            className="text-[#FFCE00] font-black text-4xl tracking-[0.12em]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            DEUTSCHKRAFT
          </h1>
        </div>
        <div className="bg-[#DD0000] py-2.5 flex items-center justify-center px-6">
          <p className="text-white text-sm font-semibold tracking-wide text-center">
            Discipline Your German. Master Your Speech.
          </p>
        </div>
        <div className="bg-[#FFCE00] h-3" />
      </div>

      {/* ── Desktop: full-height flag panel ── */}
      <div className="hidden md:flex md:w-1/2 flex-col overflow-hidden">
        {/* Black band — DEUTSCHKRAFT */}
        <div
          ref={blackRef}
          className="flex-1 bg-black flex items-center justify-center"
        >
          <h1
            className="text-[#FFCE00] font-black text-6xl xl:text-7xl tracking-[0.08em] text-center px-8 leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            DEUTSCHKRAFT
          </h1>
        </div>

        {/* Red band — tagline */}
        <div
          ref={redRef}
          className="flex-1 bg-[#DD0000] flex items-center justify-center px-10"
        >
          <p className="text-white font-bold text-2xl xl:text-3xl text-center leading-snug">
            Discipline Your German.<br />Master Your Speech.
          </p>
        </div>

        {/* Gold band */}
        <div ref={goldRef} className="flex-1 bg-[#FFCE00]" />
      </div>

      {/* ── Right: form panel ── */}
      <div className="flex-1 flex items-center justify-center p-6 py-10 md:p-10">
        <div ref={formRef} className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
