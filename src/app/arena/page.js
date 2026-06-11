"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import TopNav from "../components/TopNav";
import FullscreenNav from "../components/FullscreenNav";
import { trackDownload } from "../../lib/analytics";
import { trackClick } from "../../lib/webAnalytics";

const ONELINK_URL = "https://priveee.onelink.me/AMM3/ARENABH";

const ARENA = {
  black: "#111111",
  cyan: "#00D4F9",
  inkMute: "#BDBDBD",
};

// Subtle film-grain overlay (SVG turbulence, no asset needed)
const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function TickerRow() {
  const items = Array.from({ length: 8 });
  return (
    <>
      {items.map((_, i) => (
        <span
          key={i}
          className="font-clashDisplay text-[15px] font-semibold uppercase tracking-[0.25em] text-[#111111] sm:text-base"
        >
          <span className="mx-6">Arena Sport Universe</span>
          <span aria-hidden="true">/</span>
        </span>
      ))}
    </>
  );
}

// globals.css makes <body> its own scroll container, so scroll state must be
// read from document.body, not window
function onBodyScroll(handler) {
  handler();
  document.body.addEventListener("scroll", handler, { passive: true });
  window.addEventListener("scroll", handler, { passive: true });
  return () => {
    document.body.removeEventListener("scroll", handler);
    window.removeEventListener("scroll", handler);
  };
}

function scrollTopNow() {
  return document.body.scrollTop || document.documentElement.scrollTop || 0;
}

// Thin cyan progress bar across the very top — fills as you scroll
function ScrollProgress() {
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 140, damping: 26, mass: 0.4 });

  useEffect(
    () =>
      onBodyScroll(() => {
        const el = document.body;
        const max = Math.max(
          el.scrollHeight - el.clientHeight,
          document.documentElement.scrollHeight - document.documentElement.clientHeight
        );
        progress.set(max > 0 ? scrollTopNow() / max : 0);
      }),
    [progress]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-40 h-[3px] origin-left"
      style={{ scaleX, backgroundColor: ARENA.cyan, boxShadow: "0 0 14px rgba(0,212,249,0.8)" }}
    />
  );
}

// Pulsing chevrons at the bottom of the hero; fade out once scrolling starts
function ScrollCue({ reduceMotion }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => onBodyScroll(() => setHidden(scrollTopNow() > 80)), []);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.5, delay: hidden ? 0 : 1.2 }}
    >
      {[0, 1].map((i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="-my-1 h-6 w-6"
          fill="none"
          stroke={ARENA.cyan}
          strokeWidth="2.5"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,212,249,0.6))" }}
          animate={reduceMotion ? { opacity: 0.8 } : { y: [0, 7, 0], opacity: [0.25, 1, 0.25] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut", delay: i * 0.18 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </motion.svg>
      ))}
    </motion.div>
  );
}

// Thin broadcast-style corner brackets for the hero frame
function CornerBrackets() {
  const corner = "absolute h-10 w-10 sm:h-14 sm:w-14 pointer-events-none";
  const line = `2px solid ${ARENA.cyan}`;
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-4 bottom-4 top-[88px] z-10 pointer-events-none opacity-70 sm:inset-x-8 sm:bottom-8 sm:top-28"
    >
      <span className={`${corner} left-0 top-0`} style={{ borderLeft: line, borderTop: line }} />
      <span className={`${corner} right-0 top-0`} style={{ borderRight: line, borderTop: line }} />
      <span className={`${corner} bottom-0 left-0`} style={{ borderBottom: line, borderLeft: line }} />
      <span className={`${corner} bottom-0 right-0`} style={{ borderBottom: line, borderRight: line }} />
    </div>
  );
}

export default function ArenaPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  const heroItem = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <div className="min-h-screen bg-[#111111] text-white" style={{ colorScheme: "dark" }}>
      <FullscreenNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <TopNav onMenuClick={() => setIsNavOpen(true)} section={4} />
      <ScrollProgress />

      <main lang="bs" className="relative overflow-hidden">
        <h1 className="sr-only">Arena Sport Universe</h1>

        {/* ============ HERO ============ */}
        {/* Slightly under 100svh so the cyan ticker peeks above the fold */}
        <section className="relative flex min-h-[calc(100svh-52px)] flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-28 sm:px-8">
          {/* Stadium floodlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 62% 48% at 50% -6%, rgba(0,212,249,0.26), transparent 68%), radial-gradient(ellipse 40% 30% at 8% 110%, rgba(0,212,249,0.07), transparent 70%), radial-gradient(ellipse 45% 32% at 100% 80%, rgba(151,50,255,0.05), transparent 70%)",
            }}
          />
          {/* Diagonal pitch lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 88px)",
            }}
          />
          {/* Centre circle — stadium pitch marking */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-full h-[110vw] w-[110vw] -translate-x-1/2 -translate-y-[18%] rounded-full border border-white/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-full h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-[14%] rounded-full border border-white/[0.05]"
          />
          {/* Watermark mark */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 opacity-[0.05] sm:-right-20">
            <Image
              src="/images/arena/arena-mark-white.png"
              alt=""
              width={560}
              height={560}
              className="rotate-12"
            />
          </div>
          {/* Film grain */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: GRAIN_URI, backgroundSize: "256px 256px" }}
          />

          <CornerBrackets />

          <div className="relative z-20 flex w-full max-w-5xl flex-col items-center text-center">
            <motion.div {...heroItem(0.15)} className="w-[min(660px,88vw)]">
              <Image
                src="/images/arena/arena-logo.png"
                alt="Arena Sport Universe"
                width={1600}
                height={534}
                priority
                sizes="(max-width: 768px) 88vw, 660px"
                className="h-auto w-full drop-shadow-[0_0_45px_rgba(0,212,249,0.25)]"
              />
            </motion.div>

            <motion.p
              {...heroItem(0.45)}
              className="mt-10 max-w-2xl font-clashDisplay text-xl font-light leading-relaxed text-white/90 sm:text-2xl md:text-[28px] md:leading-[1.45]"
            >
              Arena Sport Universe je dio Privee World multiverse platforme —{" "}
              <span className="font-medium" style={{ color: ARENA.cyan }}>
                mobile-first video serijali nove generacije.
              </span>
            </motion.p>

            <motion.div {...heroItem(0.6)} className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={ONELINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackDownload("OneLink", "Arena Hero");
                  trackClick("onelink");
                }}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-10 py-4 font-clashDisplay text-base font-semibold uppercase tracking-[0.2em] text-[#111111] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
                style={{ backgroundColor: ARENA.cyan, boxShadow: "0 0 50px rgba(0,212,249,0.35)" }}
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Free Download</span>
                <svg
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
                </svg>
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-clashDisplay text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:border-white/50 hover:text-white"
              >
                Google Play / App Store
              </a>
            </motion.div>

          </div>

          <ScrollCue reduceMotion={reduceMotion} />
        </section>

        {/* ============ SLOGAN TICKER ============ */}
        <section
          aria-label="Arena Sport Universe"
          className="relative z-20 -rotate-[1.2deg] scale-[1.02] border-y border-black/30 py-4 sm:py-5"
          style={{ backgroundColor: ARENA.cyan, boxShadow: "0 0 60px rgba(0,212,249,0.25)" }}
        >
          <div className="flex overflow-hidden whitespace-nowrap" aria-hidden="true">
            <div className="flex shrink-0 animate-marquee items-center">
              <TickerRow />
            </div>
            <div className="flex shrink-0 animate-marquee items-center" aria-hidden="true">
              <TickerRow />
            </div>
          </div>
        </section>

        {/* ============ MUNDIJAL / ZMAJEVI ============ */}
        <section className="relative px-5 py-28 sm:px-8 sm:py-36">
          {/* Ghost word */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none whitespace-nowrap font-clashDisplay text-[26vw] font-bold uppercase leading-none text-white/[0.025] sm:text-[20vw]"
          >
            Universe
          </div>

          <div className="relative mx-auto max-w-6xl">
            <motion.div {...rise(0)} className="mb-12 flex items-center gap-4">
              <span className="font-clashDisplay text-sm font-semibold" style={{ color: ARENA.cyan }}>
                01
              </span>
              <span className="h-[1px] w-12 bg-white/20" />
            </motion.div>

            <motion.h2
              {...rise(0.1)}
              className="max-w-4xl font-clashDisplay text-3xl font-medium leading-[1.2] text-white sm:text-5xl sm:leading-[1.15]"
            >
              Za potpuni doživljaj{" "}
              <em className="not-italic" style={{ color: ARENA.cyan }}>
                Mundijala
              </em>
              , ekskluzivne video materijale i praćenje svih dešavanja oko{" "}
              <em className="not-italic" style={{ color: ARENA.cyan }}>
                Zmajeva
              </em>
              , pozivamo vas da uđete u novi Universe.
            </motion.h2>

            <motion.p {...rise(0.2)} className="mt-8 max-w-3xl font-inter text-lg leading-relaxed text-[#BDBDBD] sm:text-xl">
              Gledajte posebne serijale, zanimljive trenutke, reakcije, priče i sadržaj koji će
              pratiti reprezentaciju BiH na putu kroz Svjetsko prvenstvo.
            </motion.p>

          </div>
        </section>

        {/* ============ DOWNLOAD ============ */}
        <section id="download" className="relative scroll-mt-24 px-5 pb-32 pt-8 sm:px-8">
          {/* Floodlight from below */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 55% 40% at 50% 115%, rgba(0,212,249,0.12), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-6xl">
            <motion.div {...rise(0)} className="mb-12 flex items-center gap-4">
              <span className="font-clashDisplay text-sm font-semibold" style={{ color: ARENA.cyan }}>
                02
              </span>
              <span className="h-[1px] w-12 bg-white/20" />
            </motion.div>

            <motion.h2
              {...rise(0.1)}
              className="max-w-3xl font-clashDisplay text-3xl font-medium leading-[1.2] text-white sm:text-5xl sm:leading-[1.15]"
            >
              Preuzmite aplikaciju{" "}
              <em className="not-italic" style={{ color: ARENA.cyan }}>
                besplatno
              </em>{" "}
              i budite dio Arena Sport <span className="whitespace-nowrap">Universe-a.</span>
            </motion.h2>

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Google Play */}
              <motion.div
                {...rise(0.15)}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-[#00D4F9]/50 sm:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-clashDisplay text-2xl font-semibold text-white sm:text-3xl">
                    Google Play
                  </h3>
                  <Image
                    src="/images/arena/arena-app-icon.png"
                    alt="Arena Sport Universe ikona aplikacije"
                    width={64}
                    height={64}
                    className="rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,212,249,0.15)]"
                  />
                </div>
                <p className="mt-6 font-inter text-base leading-relaxed text-[#BDBDBD]">
                  Direktno preuzimanje Arena Sport Universe aplikacije:
                </p>
                <a
                  href={ONELINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackDownload("Google Play", "Arena Page");
                    trackClick("playstore");
                  }}
                  className="mt-8 inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/images/google-play-badge.png"
                    alt="Preuzmite na Google Play"
                    width={180}
                    height={54}
                    className="h-[54px] w-auto"
                  />
                </a>
              </motion.div>

              {/* App Store */}
              <motion.div
                {...rise(0.25)}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-[#00D4F9]/50 sm:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-clashDisplay text-2xl font-semibold text-white sm:text-3xl">
                    App Store
                  </h3>
                  <Image
                    src="/images/priveewhite.png"
                    alt="Privee World logo"
                    width={96}
                    height={32}
                    className="mt-2 h-auto w-24 opacity-90"
                  />
                </div>
                <p className="mt-6 font-inter text-base leading-relaxed text-[#BDBDBD]">
                  Za Apple korisnike, trenutno u Arena Sport Universe ulazite preuzimanjem Privee
                  World aplikacije putem ovog linka:
                </p>
                <a
                  href={ONELINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackDownload("App Store", "Arena Page");
                    trackClick("appstore");
                  }}
                  className="mt-8 inline-block transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <Image
                    src="/images/appstore.svg"
                    alt="Preuzmite na App Store"
                    width={163}
                    height={54}
                    className="h-[54px] w-auto"
                  />
                </a>
                <div className="mt-8 rounded-xl border-l-2 bg-white/[0.04] p-4" style={{ borderColor: ARENA.cyan }}>
                  <p className="font-inter text-sm leading-relaxed text-white/70">
                    Vaši iPhone uređaji će downloadovati Privee World i preko ovog linka nakon
                    registracije ulazite u Arena Sport Universe.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sign-off */}
            <motion.div {...rise(0.2)} className="mt-24 flex flex-col items-center text-center">
              <p
                className="font-clashDisplay text-6xl font-semibold italic sm:text-8xl"
                style={{
                  color: ARENA.cyan,
                  textShadow: "0 0 60px rgba(0,212,249,0.4)",
                }}
              >
                Uživajte!
              </p>
              <a
                href={ONELINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackDownload("OneLink", "Arena Signoff");
                  trackClick("onelink");
                }}
                className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 transition-all duration-300 hover:border-[#00D4F9]/60 hover:bg-white/[0.07]"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: ARENA.cyan }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: ARENA.cyan }} />
                </span>
                <span className="font-clashDisplay text-sm font-medium uppercase tracking-[0.25em] text-white/85">
                  Free download.
                </span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ============ ARENA FOOTER ============ */}
        <footer className="relative border-t border-white/10 px-5 py-12 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex flex-col items-center gap-4 sm:items-start">
              <Image
                src="/images/arena/arena-logo.png"
                alt="Arena Sport Universe"
                width={200}
                height={67}
                className="h-auto w-44 opacity-90"
              />
            </div>
            <div className="flex flex-col items-center gap-3 sm:items-end">
              <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <Link href="/" className="font-inter text-sm text-white/60 transition-colors hover:text-white">
                  Privee World
                </Link>
                <Link href="/support" className="font-inter text-sm text-white/60 transition-colors hover:text-white">
                  Podrška
                </Link>
                <Link href="/privacy" className="font-inter text-sm text-white/60 transition-colors hover:text-white">
                  Privatnost
                </Link>
                <Link href="/terms" className="font-inter text-sm text-white/60 transition-colors hover:text-white">
                  Uslovi
                </Link>
              </nav>
              <p className="font-inter text-xs text-white/35">
                © {new Date().getFullYear()} Privee World GmbH, Vienna, Austria.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
