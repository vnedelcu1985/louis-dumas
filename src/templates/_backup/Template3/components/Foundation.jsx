import React, { useState } from 'react';
import { Eye, Scale, ShieldCheck } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { mandate, triptych } from '../../../data/content';

export default function Foundation({ isDark }) {
  const [active, setActive] = useState(0);
  const pillar = triptych.pillars[active];

  const nodeStyles = [
    {
      icon: Scale,
      circle: isDark
        ? 'bg-[#C58A38] text-[#09151F] shadow-lg font-medium'
        : 'bg-[#9D2933] text-[#FBFAF5]',
      pos: 'left-0 bottom-0',
    },
    {
      icon: Eye,
      circle: isDark
        ? 'bg-[#FBFAF5] text-[#09151F] border border-[#FBFAF5] shadow-lg'
        : 'bg-[#FBFAF5] text-[#9D2933] border border-[#9D2933]/25',
      pos: 'left-1/2 -translate-x-1/2 top-0',
    },
    {
      icon: ShieldCheck,
      circle: 'bg-[#165E83] text-[#FBFAF5]',
      pos: 'right-0 bottom-0',
    },
  ];

  return (
    <section
      id="mandate"
      className={`py-24 md:py-32 px-6 md:px-16 transition-colors duration-300 ${
        isDark ? 'bg-[#09151F]' : 'bg-[#FBFAF5]'
      }`}
    >
      <FadeInSection className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        {/* Left Copy: Stable, anchored to the top without jumping */}
        <div className="lg:col-span-6 space-y-6 pt-2 font-sans">
          <h2
            className={`font-serif text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight transition-colors ${
              isDark ? 'text-[#FBFAF5]' : 'text-[#9D2933]'
            }`}
          >
            {triptych.title}
          </h2>
          <p
            className={`text-xl md:text-2xl font-light leading-relaxed transition-colors ${
              isDark ? 'text-[#FBFAF5]/80' : 'text-[#343434]/80'
            }`}
          >
            {mandate.body}
          </p>
        </div>

        {/* Right Pillar cluster & details */}
        <div className="lg:col-span-6 font-sans">
          <div className="text-center mb-6">
            <span
              className={`block text-xs uppercase tracking-[0.3em] font-medium ${
                isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
              }`}
            >
              resolving complexity under pressure
            </span>
            <span
              className={`block font-serif text-2xl md:text-3xl mt-1 transition-colors ${
                isDark ? 'text-[#FBFAF5]' : 'text-[#165E83]'
              }`}
            >
              Clarity, Judgement, Courage
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] aspect-[10/8]">
            {/* faint connecting ring */}
            <div
              className={`absolute inset-[18%] rounded-full border border-dashed ${
                isDark ? 'border-[#FBFAF5]/15' : 'border-[#343434]/15'
              }`}
            />

            {triptych.pillars.map((p, idx) => {
              const { icon: Icon, circle, pos } = nodeStyles[idx];
              const isActive = active === idx;
              return (
                <button
                  key={p.title}
                  type="button"
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  aria-pressed={isActive}
                  className={`absolute ${pos} w-[42%] aspect-square rounded-full flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-500 ${circle} ${
                    isActive
                      ? `shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] ring-4 ${
                          isDark ? 'ring-[#C58A38]/60' : 'ring-[#9D2933]/40'
                        } z-10 scale-105`
                      : 'shadow-[0_12px_30px_-14px_rgba(0,0,0,0.35)] opacity-90 hover:opacity-100'
                  }`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
                  <span className="font-serif text-lg md:text-xl">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Fixed min-height active pillar box prevents size changes between pillars */}
          <div
            className={`mt-8 rounded-2xl p-6 md:p-7 text-center min-h-[210px] md:min-h-[220px] flex flex-col justify-center border transition-colors ${
              isDark
                ? 'bg-[#07121A] border-[#FBFAF5]/10 text-[#FBFAF5]'
                : 'bg-[#FBFAF5] border-[#9D2933]/15 text-[#343434] shadow-sm'
            }`}
          >
            <h3
              className={`font-serif text-2xl md:text-3xl mb-2 ${
                isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
              }`}
            >
              {pillar.title}
            </h3>
            <div className="min-h-[72px] sm:min-h-[64px] flex items-center justify-center">
              {pillar.question && (
                <p
                  className={`font-serif text-xl md:text-2xl font-normal leading-relaxed max-w-lg mx-auto ${
                    isDark ? 'text-[#FBFAF5]/90' : 'text-[#343434]/90'
                  }`}
                >
                  {pillar.question}
                </p>
              )}
            </div>
            <p
              className={`mt-3 text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto ${
                isDark ? 'text-[#FBFAF5]/80' : 'text-[#343434]/80'
              }`}
            >
              {pillar.description}
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
