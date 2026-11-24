import React, { useRef, useState } from 'react';
import { institutionalTrust } from '../../../data/content';

const R_BIG = 'clamp(5rem, 16vw, 9.5rem)';
const R_SMALL = 'clamp(1.75rem, 4vw, 2.75rem)';
const FRAME_RADIUS = `${R_BIG} ${R_SMALL} ${R_BIG} ${R_SMALL}`;
const FRAME_TOP = '17%';

export default function PortraitPopout({ isDark }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const reset = () => setTilt({ x: 0, y: 0 });
  const credential = institutionalTrust.milestones[0];

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[460px] aspect-[4/5] [perspective:1200px]"
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg)`,
        }}
      >
        {/* Ground shadow */}
        <div
          className={`absolute -bottom-6 left-[10%] right-[10%] h-10 rounded-[50%] blur-2xl transition-colors ${
            isDark ? 'bg-black/60' : 'bg-[#0C1B26]/20'
          }`}
        />

        {/* Depth plate: Amber-gold in dark mode (from reference image), Burgundy in light mode */}
        <div
          className={`absolute inset-x-0 bottom-0 transition-all duration-500 ease-out ${
            isDark ? 'bg-[#C58A38]' : 'bg-[#9D2933]'
          }`}
          style={{
            top: FRAME_TOP,
            borderRadius: FRAME_RADIUS,
            transform: `translate(${18 - tilt.x * 10}px, ${18 - tilt.y * 10}px)`,
          }}
        />

        {/* Main frame: Deep Sovereign Navy with soft ambient glow */}
        <div
          className={`absolute inset-x-0 bottom-0 overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-colors ${
            isDark ? 'bg-[#09151F] border border-[#C58A38]/35' : 'bg-[#0C1B26] border border-[#9D2933]/25'
          }`}
          style={{ top: FRAME_TOP, borderRadius: FRAME_RADIUS }}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-[radial-gradient(circle_at_50%_25%,rgba(197,138,56,0.22),transparent_65%)]'
                : 'bg-[radial-gradient(circle_at_50%_25%,rgba(157,41,51,0.25),transparent_65%)]'
            }`}
          />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        {/* 3D Cutout: Pops out above frame */}
        <div
          className="absolute inset-x-0 bottom-0 -top-[20%] overflow-hidden"
          style={{
            borderBottomLeftRadius: R_SMALL,
            borderBottomRightRadius: R_BIG,
          }}
        >
          <img
            src={institutionalTrust.portraitCutoutUrl}
            alt={institutionalTrust.portraitAlt}
            className="absolute bottom-0 left-1/2 h-[83.5%] w-auto max-w-none select-none transition-transform duration-500 ease-out [filter:drop-shadow(0_14px_18px_rgba(0,0,0,0.35))]"
            style={{
              transform: `translateX(calc(-50% + ${tilt.x * 14}px)) translateY(${tilt.y * 6}px)`,
            }}
            draggable="false"
          />
        </div>

        {/* Floating credential chip */}
        <div
          className={`absolute -left-4 sm:-left-10 bottom-[12%] backdrop-blur-md rounded-2xl px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)] border transition-all duration-500 ease-out ${
            isDark
              ? 'bg-[#09151F]/95 border-[#C58A38]/35 text-[#FBFAF5]'
              : 'bg-[#FBFAF5]/95 border-[#9D2933]/20 text-[#343434]'
          }`}
          style={{ transform: `translate(${tilt.x * 22}px, ${tilt.y * 22}px)` }}
        >
          <span
            className={`block text-[0.62rem] tracking-[0.25em] uppercase font-sans font-medium ${
              isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
            }`}
          >
            LOUIS DUMAS
          </span>
          <span
            className={`block font-serif text-lg leading-tight transition-colors ${
              isDark ? 'text-[#FBFAF5]' : 'text-[#165E83]'
            }`}
          >
            {credential.title}
          </span>
        </div>
      </div>
    </div>
  );
}
