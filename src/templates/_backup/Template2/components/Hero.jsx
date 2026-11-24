import React from 'react';
import { ChevronDown } from 'lucide-react';
import { hero, mandate } from '../../../data/content';
import PortraitPopout from './PortraitPopout';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-14 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 space-y-8">
          <h1 className="font-serif uppercase text-heritage-maroon text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight">
            {hero.headline.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-heritage-ink/75 font-light leading-relaxed max-w-xl">
            {mandate.lead}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#ledger"
              className="group inline-flex items-center gap-2.5 rounded-full bg-heritage-maroon text-heritage-cream text-sm px-7 py-3.5 shadow-[0_10px_24px_-10px_rgba(110,31,45,0.8)] hover:bg-heritage-maroon-deep hover:-translate-y-0.5 transition-all font-medium"
            >
              <span className="tracking-wide">Learn More</span>
              <ChevronDown className="w-4 h-4 text-heritage-gold group-hover:translate-y-0.5 transition-transform" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* 3D portrait */}
        <div className="lg:col-span-6 pt-6 lg:pt-0">
          <PortraitPopout />
        </div>
      </div>
    </section>
  );
}
