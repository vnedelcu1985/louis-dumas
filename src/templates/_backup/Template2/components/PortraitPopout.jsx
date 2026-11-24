import React, { useRef, useState } from 'react';
import { institutionalTrust } from '../../../data/content';

// Organic "leaf" frame. Bottom radii are shared with the clipping wrapper so
// the portrait is cut off exactly along the frame's bottom edge, while the
// head is free to rise above the frame's top edge (the 3D pop-out).
const R_BIG = 'clamp(5rem, 16vw, 9.5rem)';
const R_SMALL = 'clamp(1.75rem, 4vw, 2.75rem)';
const FRAME_RADIUS = `${R_BIG} ${R_SMALL} ${R_BIG} ${R_SMALL}`;
const FRAME_TOP = '17%';

export default function PortraitPopout() {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 … 0.5
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
        <div className="absolute -bottom-6 left-[10%] right-[10%] h-10 rounded-[50%] bg-heritage-ink/25 blur-2xl" />

        {/* Depth plate (offset maroon layer) */}
        <div
          className="absolute inset-x-0 bottom-0 bg-heritage-maroon transition-transform duration-500 ease-out"
          style={{
            top: FRAME_TOP,
            borderRadius: FRAME_RADIUS,
            transform: `translate(${18 - tilt.x * 10}px, ${18 - tilt.y * 10}px)`,
          }}
        />

        {/* Main frame — solid forest green with a soft green-only light */}
        <div
          className="absolute inset-x-0 bottom-0 bg-heritage-green overflow-hidden shadow-[0_30px_60px_-20px_rgba(23,63,50,0.6)]"
          style={{ top: FRAME_TOP, borderRadius: FRAME_RADIUS }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.14),transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:14px_14px]" />
        </div>

        {/* Cutout — clipped only along the bottom curve so the head pops out.
            The wrapper extends above the frame so the head's shadow isn't cut off. */}
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
            className="absolute bottom-0 left-1/2 h-[83.5%] w-auto max-w-none select-none transition-transform duration-500 ease-out [filter:drop-shadow(0_14px_18px_rgba(0,0,0,0.28))]"
            style={{
              transform: `translateX(calc(-50% + ${tilt.x * 14}px)) translateY(${tilt.y * 6}px)`,
            }}
            draggable="false"
          />
        </div>

        {/* Floating credential chip (sits in front of everything) */}
        <div
          className="absolute -left-4 sm:-left-10 bottom-[12%] bg-heritage-paper/95 backdrop-blur rounded-2xl px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] border border-heritage-ink/5 transition-transform duration-500 ease-out"
          style={{ transform: `translate(${tilt.x * 22}px, ${tilt.y * 22}px)` }}
        >
          <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-heritage-gold font-medium">
            LOUIS DUMAS
          </span>
          <span className="block font-serif text-lg text-heritage-maroon leading-tight">
            {credential.title}
          </span>
        </div>
      </div>
    </div>
  );
}
