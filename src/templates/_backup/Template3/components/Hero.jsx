import React from 'react';
import { ChevronDown } from 'lucide-react';
import { hero, mandate } from '../../../data/content';
import PortraitPopout from './PortraitPopout';

export default function Hero({ isDark }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-14 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 space-y-8">
          <h1
            className={`font-serif uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight transition-colors duration-300 ${
              isDark ? 'text-[#FBFAF5]' : 'text-[#9D2933]'
            }`}
          >
            {hero.headline.split('\n').map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>

          <p
            className={`text-lg md:text-xl font-sans font-light leading-relaxed max-w-xl transition-colors duration-300 ${
              isDark ? 'text-[#FBFAF5]/80' : 'text-[#343434]/80'
            }`}
          >
            {mandate.lead}
          </p>

          <div className="flex flex-wrap gap-3 pt-2 font-sans">
            <a
              href="#ledger"
              className={`group inline-flex items-center gap-2.5 rounded-full text-sm font-medium px-7 py-3.5 transition-all shadow-md hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#07121A] border border-[#C58A38]/60 text-[#FBFAF5] hover:border-[#C58A38] hover:bg-[#C58A38]/10 shadow-[0_0_20px_rgba(197,138,56,0.2)]'
                  : 'bg-[#9D2933] text-[#FBFAF5] shadow-[0_10px_24px_-10px_rgba(157,41,51,0.8)] hover:bg-[#7D1F27]'
              }`}
            >
              <span className="tracking-wide">Learn More</span>
              <ChevronDown
                className={`w-4 h-4 group-hover:translate-y-0.5 transition-transform ${
                  isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
                }`}
                strokeWidth={2}
              />
            </a>
          </div>
        </div>

        {/* 3D portrait */}
        <div className="lg:col-span-6 pt-6 lg:pt-0">
          <PortraitPopout isDark={isDark} />
        </div>
      </div>
    </section>
  );
}
