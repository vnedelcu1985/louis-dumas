import React, { useEffect, useState } from 'react';

export default function Hero({ lang = 'en' }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stage 2: Hero text fades out from 1 down to 0.1 between scroll 0 and 400px (faint watermark)
  // Matching Image 2, then disappears completely beyond 550px
  const heroOpacity =
    scrollY <= 400
      ? Math.max(1 - (scrollY / 400) * 0.9, 0.1)
      : Math.max(0.1 - ((scrollY - 400) / 150) * 0.1, 0);

  const heroTranslate = scrollY * 0.22;

  const isFr = lang === 'fr';

  return (
    <section
      id="top"
      translate="no"
      className="fixed inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center z-0 pointer-events-none notranslate"
      style={{
        opacity: heroOpacity,
        transform: `translateY(-${heroTranslate}px)`,
      }}
      aria-label="Hero Introduction"
    >
      <style>{`
        @keyframes spokenWordEntrance {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>

      {/* Stage 1: Entrance on Mount — Precise Spoken Cadence */}
      <h1
        key={lang}
        translate="no"
        className="text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[9rem] font-serif tracking-tight leading-[0.95] text-[#165E83] select-none max-w-6xl mx-auto notranslate"
      >
        {/* Line 1: "What's" (0.50s–0.80s, duration 0.30s), then "important" (0.80s–1.30s, duration 0.50s) */}
        <span className="block">
          <span
            className="inline-block mr-3 sm:mr-5 lg:mr-7"
            style={{
              animation: 'spokenWordEntrance 0.30s cubic-bezier(0.16, 1, 0.3, 1) 0.50s both',
            }}
          >
            {isFr ? "Qu'est-ce qui" : "What's"}
          </span>
          <span
            className="inline-block"
            style={{
              animation: 'spokenWordEntrance 0.50s cubic-bezier(0.16, 1, 0.3, 1) 0.80s both',
            }}
          >
            {isFr ? 'compte' : 'important'}
          </span>
        </span>

        {/* Dramatic pause: 1.30s to 2.10s (0.80s) */}

        {/* Line 2: "to" (2.10s–2.35s, duration 0.25s), then "you?" (2.35s–2.75s, duration 0.40s) */}
        <span className="block mt-2 sm:mt-4 lg:mt-6">
          <span
            className="inline-block mr-3 sm:mr-5 lg:mr-7"
            style={{
              animation: 'spokenWordEntrance 0.25s cubic-bezier(0.16, 1, 0.3, 1) 2.10s both',
            }}
          >
            {isFr ? 'pour' : 'to'}
          </span>
          <span
            className="inline-block"
            style={{
              animation: 'spokenWordEntrance 0.40s cubic-bezier(0.16, 1, 0.3, 1) 2.35s both',
            }}
          >
            {isFr ? 'vous ?' : 'you?'}
          </span>
        </span>
      </h1>
    </section>
  );
}
