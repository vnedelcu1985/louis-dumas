import React from 'react';
import FadeInSection from '../../../components/common/FadeInSection';
import { institutionalTrust } from '../../../data/content';
import { institutionalTrustFr } from '../../../data/contentFr';

export default function InstitutionalTrustSection({ lang = 'en' }) {
  const currentContent = lang === 'fr' ? institutionalTrustFr : institutionalTrust;

  return (
    <section
      id="institutional-trust"
      style={{ scrollMarginTop: '27.2vh' }}
      className="relative bg-[#0C1B26] text-[#FBFAF5] pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-16 border-t border-[#FBFAF5]/10 min-h-[73vh] scroll-mt-[27.2vh]"
    >
      {/* 
        Overlapping Portrait Circle:
        Straddles the seam between MandateSection above and this dark section below,
        exactly as rendered in the reference design.
      */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative group">
          {/* Subtle Outer Glow & Halo */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-[#B48B44]/40 to-[#9D2933]/30 blur-md opacity-75 group-hover:opacity-100 transition duration-700" />

          {/* Portrait Container */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-[#0C1B26] ring-1 ring-[#B48B44]/70 shadow-[0_25px_60px_rgba(0,0,0,0.55)] bg-[#0C1B26]">
            <img
              src={currentContent.portraitUrl}
              alt={currentContent.portraitAlt}
              className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          {/* Decorative Diplomatic Seal Badge */}
          <div className="absolute bottom-1 right-2 sm:right-4 bg-[#0C1B26] border border-[#B48B44]/80 text-[#B48B44] text-[0.62rem] font-mono tracking-widest px-2.5 py-1 rounded-full shadow-lg uppercase font-medium">
            Louis Dumas
          </div>
        </div>
      </div>

      <FadeInSection className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Eyebrow, Main Header & Narrative */}
          <div className="md:col-span-7 space-y-8">
            <div>
              <span className="text-[0.7rem] md:text-xs tracking-[0.35em] uppercase text-[#B48B44] font-medium block mb-4">
                {currentContent.eyebrow}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#FBFAF5] leading-[1.08] tracking-tight">
                {currentContent.headline}
              </h2>
            </div>

            <div className="space-y-6 pt-4 text-[#FBFAF5]/80 text-base md:text-lg font-light leading-relaxed">
              {currentContent.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline / Milestone Track */}
          <div className="md:col-span-5 md:pt-4">
            <div className="relative">
              {currentContent.milestones.map((item, idx) => {
                const isLast = idx === currentContent.milestones.length - 1;
                return (
                  <div
                    key={item.id}
                    className={`relative group pl-9 ${isLast ? 'pb-0' : 'pb-12 md:pb-16'}`}
                  >
                    {/* Continuous Vertical Timeline Line Segment to next node */}
                    {!isLast && (
                      <div
                        className="absolute left-[8px] -translate-x-1/2 w-[1.5px] pointer-events-none"
                        style={{
                          top: '13px',
                          bottom: '-13px',
                          backgroundImage:
                            idx === 0
                              ? 'linear-gradient(to bottom, #B48B44, #9D2933)'
                              : 'linear-gradient(to bottom, #9D2933, #B48B44)',
                          opacity: 0.85,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Circular Node Marker on Line - 100% aligned with line */}
                    <div
                      className="absolute left-[8px] top-1.5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0C1B26] transition-transform duration-500 group-hover:scale-125 z-10"
                      style={{
                        border: `2px solid ${item.color}`,
                        boxShadow: `0 0 10px ${item.color}40`,
                      }}
                      aria-hidden="true"
                    />

                    {/* Milestone Content */}
                    <div>
                      <span
                        className="text-xs tracking-[0.25em] uppercase font-sans font-medium block"
                        style={{ color: item.color }}
                      >
                        {item.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif text-[#FBFAF5] font-normal mt-2 leading-snug group-hover:text-[#B48B44] transition-colors duration-500">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subtle centered divider line */}
        <div className="pt-20 md:pt-24 flex justify-center" aria-hidden="true">
          <div className="w-28 sm:w-36 h-[1px] bg-[#FBFAF5]/25 rounded-full" />
        </div>
      </FadeInSection>
    </section>
  );
}
