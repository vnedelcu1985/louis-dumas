import React, { useState } from 'react';
import { Eye, Scale, ShieldCheck } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { mandate, triptych } from '../../../data/content';

// Solid fills only — no maroon→green gradients.
const NODE_STYLES = [
  { icon: Scale, circle: 'bg-heritage-maroon text-heritage-cream', pos: 'left-0 bottom-0' },
  {
    icon: Eye,
    circle: 'bg-heritage-paper text-heritage-maroon border border-heritage-maroon/15',
    pos: 'left-1/2 -translate-x-1/2 top-0',
  },
  { icon: ShieldCheck, circle: 'bg-heritage-green text-heritage-cream', pos: 'right-0 bottom-0' },
];

export default function Foundation() {
  const [active, setActive] = useState(0);
  const pillar = triptych.pillars[active];

  return (
    <section id="mandate" className="bg-heritage-cream py-24 md:py-32 px-6 md:px-16">
      {/* items-start prevents left column from shifting/dropping when pillar details toggle */}
      <FadeInSection className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-start">
        {/* Left Copy: Stable, anchored to the top without jumping */}
        <div className="lg:col-span-6 space-y-6 pt-2">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-heritage-maroon leading-tight tracking-tight">
            {triptych.title}
          </h2>
          <p className="text-xl md:text-2xl text-heritage-ink/80 font-light leading-relaxed">
            {mandate.body}
          </p>
        </div>

        {/* Right Pillar cluster & details */}
        <div className="lg:col-span-6">
          <div className="text-center mb-6">
            <span className="block text-xs uppercase tracking-[0.3em] font-medium text-heritage-gold">
              resolving complexity under pressure
            </span>
            <span className="block font-serif text-2xl md:text-3xl text-heritage-maroon mt-1">
              Clarity, Judgement, Courage
            </span>
          </div>

          <div className="relative mx-auto w-full max-w-[400px] aspect-[10/8]">
            {/* faint connecting ring */}
            <div className="absolute inset-[18%] rounded-full border border-dashed border-heritage-maroon/15" />

            {triptych.pillars.map((p, idx) => {
              const { icon: Icon, circle, pos } = NODE_STYLES[idx];
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
                      ? 'shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)] ring-4 ring-heritage-gold/40 z-10 scale-105'
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
          <div className="mt-8 rounded-2xl bg-heritage-cream border border-heritage-maroon/15 p-6 md:p-7 text-center min-h-[210px] md:min-h-[220px] flex flex-col justify-center">
            <h3 className="font-serif text-2xl md:text-3xl text-heritage-maroon mb-2">
              {pillar.title}
            </h3>
            <div className="min-h-[72px] sm:min-h-[64px] flex items-center justify-center">
              {pillar.question && (
                <p className="font-serif text-xl md:text-2xl text-heritage-ink/90 font-normal leading-relaxed max-w-lg mx-auto">
                  {pillar.question}
                </p>
              )}
            </div>
            <p className="mt-3 text-base md:text-lg text-heritage-ink/75 font-light leading-relaxed max-w-lg mx-auto">
              {pillar.description}
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
