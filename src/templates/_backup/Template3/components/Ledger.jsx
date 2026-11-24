import React, { useState } from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { events } from '../../../data/content';

export default function Ledger({ isDark }) {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="ledger"
      className={`border-y py-12 md:py-16 px-6 md:px-16 transition-colors duration-300 ${
        isDark
          ? 'bg-[#09151F] border-[#FBFAF5]/10'
          : 'bg-[#FBFAF5] border-[#0C1B26]/12'
      }`}
    >
      <FadeInSection className="max-w-7xl mx-auto">
        {/* Header Strip with commanding typography */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10 pb-4 border-b ${
            isDark ? 'border-[#FBFAF5]/10' : 'border-[#0C1B26]/12'
          }`}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-2 font-sans">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isDark
                    ? 'bg-[#C58A38] shadow-[0_0_8px_rgba(197,138,56,0.6)]'
                    : 'bg-[#9D2933]'
                }`}
              />
              <span
                className={`text-xs uppercase tracking-[0.28em] font-semibold ${
                  isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
                }`}
              >
                Upcoming Itinerary
              </span>
            </div>
            <h2
              className={`font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight transition-colors ${
                isDark ? 'text-[#FBFAF5]' : 'text-[#9D2933]'
              }`}
            >
              Events &amp; Appearances
            </h2>
          </div>
          <span
            className={`text-xs md:text-sm font-sans font-light tracking-wide ${
              isDark ? 'text-[#FBFAF5]/60' : 'text-[#343434]/65'
            }`}
          >
            Keynotes, Tabletop Sessions &amp; Forums · 2026–2027
          </span>
        </div>

        {/* Spacious, Highly Readable Single-Line Event Rows with Vertical Timeline Track (Picture 2 style) */}
        <div className="relative">
          {/* Continuous Vertical Timeline Line running straight through circle markers */}
          <div
            className={`absolute left-[18px] top-8 bottom-8 -translate-x-1/2 w-[1.5px] ${
              isDark
                ? 'bg-gradient-to-b from-[#C58A38]/60 via-[#9D2933]/60 to-[#C58A38]/50'
                : 'bg-gradient-to-b from-[#9D2933]/50 via-[#C9A45C]/60 to-[#165E83]/50'
            }`}
            aria-hidden="true"
          />

          <div className={`divide-y font-sans ${isDark ? 'divide-[#FBFAF5]/10' : 'divide-[#343434]/10'}`}>
            {events.map((evt, idx) => {
              const isOpen = openId === evt.id;
              const isFirst = idx === 0;
              const darkNodeColors = ['#C58A38', '#9D2933', '#C58A38'];
              const lightNodeColors = ['#9D2933', '#C9A45C', '#165E83'];
              const currentNodeColor = isDark
                ? darkNodeColors[idx % darkNodeColors.length]
                : lightNodeColors[idx % lightNodeColors.length];

              return (
                <div key={evt.id} className="py-6 md:py-8 pl-11 sm:pl-12 transition-colors relative group">
                {/* Event Row */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8">
                  {/* Date & Location */}
                  <div className="shrink-0 lg:w-72 space-y-1">
                    <div className="relative flex items-center">
                      {/* Circular Hollow Node Marker on Line (Exact match to Picture 2, aligned with date) */}
                      <div
                        className={`absolute -left-[26px] sm:-left-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-transform duration-500 group-hover:scale-125 shadow-sm pointer-events-none ${
                          isDark ? 'bg-[#09151F]' : 'bg-[#FBFAF5]'
                        }`}
                        style={{
                          borderColor: currentNodeColor,
                          boxShadow: `0 0 8px ${currentNodeColor}40`,
                        }}
                        aria-hidden="true"
                      />
                      <span
                        className={`font-serif text-2xl md:text-3xl lg:text-4xl font-medium block leading-none transition-colors ${
                          isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
                        }`}
                      >
                        {evt.dateDisplay}
                      </span>
                    </div>
                    <span
                      className={`text-xs md:text-sm uppercase tracking-wider flex items-center gap-1.5 font-light pt-1 ${
                        isDark ? 'text-[#FBFAF5]/60' : 'text-[#343434]/65'
                      }`}
                    >
                      <MapPin
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
                        }`}
                      />
                      {evt.city}
                    </span>
                  </div>

                  {/* Title & Short Summary */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3
                      onClick={() => toggleOpen(evt.id)}
                      className={`font-serif text-2xl md:text-3xl cursor-pointer transition-colors leading-snug ${
                        isDark
                          ? 'text-[#FBFAF5] hover:text-[#C58A38]'
                          : 'text-[#165E83] hover:text-[#9D2933]'
                      }`}
                    >
                      {evt.title}
                    </h3>
                    <p
                      className={`text-base font-light leading-relaxed ${
                        isDark ? 'text-[#FBFAF5]/75' : 'text-[#343434]/80'
                      }`}
                    >
                      {evt.summary}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div className="shrink-0 flex items-center gap-4 self-start lg:pt-1">
                    <button
                      type="button"
                      onClick={() => toggleOpen(evt.id)}
                      aria-expanded={isOpen}
                      className={`text-xs md:text-sm uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-colors py-2 font-medium ${
                        isDark
                          ? 'text-[#FBFAF5]/70 hover:text-[#C58A38]'
                          : 'text-[#343434]/70 hover:text-[#9D2933]'
                      }`}
                    >
                      <span>{isOpen ? 'Close' : 'Details'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        } ${isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'}`}
                      />
                    </button>

                    {isFirst ? (
                      <span
                        className={`inline-flex items-center rounded-full text-xs md:text-sm px-5 py-2.5 font-medium tracking-wide whitespace-nowrap border ${
                          isDark
                            ? 'border-[#C58A38]/40 text-[#C58A38] bg-[#C58A38]/10'
                            : 'border-[#9D2933]/30 text-[#9D2933] bg-[#9D2933]/5'
                        }`}
                      >
                        By Invite Only
                      </span>
                    ) : (
                      <a
                        href="#inquiry"
                        className={`inline-flex items-center gap-2 rounded-full text-xs md:text-sm font-medium px-6 py-2.5 transition-all shadow-sm whitespace-nowrap group ${
                          isDark
                            ? 'bg-gradient-to-r from-[#C88A36] to-[#B37424] text-white shadow-[0_0_16px_rgba(197,138,56,0.35)] hover:brightness-110'
                            : 'bg-[#9D2933] hover:bg-[#7D1F27] text-[#FBFAF5]'
                        }`}
                      >
                        <span>Reserve Seat</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Expandable Details Drawer */}
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? `grid-rows-[1fr] opacity-100 mt-6 pt-5 border-t ${
                          isDark ? 'border-[#FBFAF5]/10' : 'border-[#343434]/10'
                        }`
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`pl-4 md:pl-8 border-l-3 text-base md:text-lg font-light leading-relaxed space-y-3 ${
                        isDark
                          ? 'border-[#C58A38] text-[#FBFAF5]/85 bg-[#07121A]/60 p-5 rounded-r-xl'
                          : 'border-[#9D2933] text-[#343434]/85 bg-[#9D2933]/5 p-5 rounded-r-xl'
                      }`}
                    >
                      <p>{evt.description}</p>
                      {evt.venue && (
                        <p
                          className={`text-xs md:text-sm uppercase tracking-wider font-medium pt-1 ${
                            isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
                          }`}
                        >
                          Accredited Venue: {evt.venue}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
