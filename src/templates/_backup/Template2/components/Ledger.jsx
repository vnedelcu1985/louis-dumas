import React, { useState } from 'react';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { events } from '../../../data/content';

export default function Ledger() {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="ledger" className="bg-heritage-cream border-y border-heritage-maroon/15 py-12 md:py-16 px-6 md:px-16">
      <FadeInSection className="max-w-7xl mx-auto">
        {/* Header Strip with commanding typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10 pb-4 border-b border-heritage-maroon/15">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-heritage-maroon" />
              <span className="text-xs uppercase tracking-[0.28em] text-heritage-maroon font-semibold">
                Upcoming Itinerary
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-heritage-maroon tracking-tight">
              Events &amp; Appearances
            </h2>
          </div>
          <span className="text-xs md:text-sm text-heritage-ink/60 font-light tracking-wide">
            Keynotes, Tabletop Sessions &amp; Forums · 2026–2027
          </span>
        </div>

        {/* Spacious, Highly Readable Single-Line Event Rows with Vertical Timeline Track (Picture 2 style) */}
        <div className="relative">
          {/* Continuous Vertical Timeline Line running straight through circle markers */}
          <div
            className="absolute left-[18px] top-8 bottom-8 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-heritage-maroon/50 via-heritage-gold/60 to-heritage-green/50"
            aria-hidden="true"
          />

          <div className="divide-y divide-heritage-maroon/15">
            {events.map((evt, idx) => {
              const isOpen = openId === evt.id;
              const isFirst = idx === 0;
              const nodeColors = ['#6E1F2D', '#C9A45C', '#1F5A45'];
              const currentNodeColor = nodeColors[idx % nodeColors.length];

              return (
                <div key={evt.id} className="py-6 md:py-8 pl-11 sm:pl-12 transition-colors relative group">
                {/* Event Row: Prominent, spacious, easy to read */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-8">
                  {/* Date & Location: Prominent typography */}
                  <div className="shrink-0 lg:w-72 space-y-1">
                    <div className="relative flex items-center">
                      {/* Circular Hollow Node Marker on Line (Exact match to Picture 2, aligned with date) */}
                      <div
                        className="absolute -left-[26px] sm:-left-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-heritage-cream border-2 transition-transform duration-500 group-hover:scale-125 shadow-sm pointer-events-none"
                        style={{
                          borderColor: currentNodeColor,
                          boxShadow: `0 0 8px ${currentNodeColor}35`,
                        }}
                        aria-hidden="true"
                      />
                      <span className="font-serif text-2xl md:text-3xl lg:text-4xl text-heritage-maroon font-medium block leading-none">
                        {evt.dateDisplay}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm uppercase tracking-wider text-heritage-ink/60 flex items-center gap-1.5 font-light pt-1">
                      <MapPin className="w-3.5 h-3.5 text-heritage-maroon/70 shrink-0" />
                      {evt.city}
                    </span>
                  </div>

                  {/* Title & Short Summary: Big, clear, no cut-off truncation */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3
                      onClick={() => toggleOpen(evt.id)}
                      className="font-serif text-2xl md:text-3xl text-heritage-maroon hover:text-heritage-maroon-deep cursor-pointer transition-colors leading-snug"
                    >
                      {evt.title}
                    </h3>
                    <p className="text-base font-light text-heritage-ink/80 leading-relaxed">
                      {evt.summary}
                    </p>
                  </div>

                  {/* Right Actions: Details toggle + CTA Button */}
                  <div className="shrink-0 flex items-center gap-4 self-start lg:pt-1">
                    <button
                      type="button"
                      onClick={() => toggleOpen(evt.id)}
                      aria-expanded={isOpen}
                      className="text-xs md:text-sm uppercase tracking-wider text-heritage-ink/60 hover:text-heritage-maroon inline-flex items-center gap-1.5 cursor-pointer transition-colors py-2"
                    >
                      <span>{isOpen ? 'Close' : 'Details'}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-heritage-maroon' : ''
                        }`}
                      />
                    </button>

                    {isFirst ? (
                      <span className="inline-flex items-center rounded-full border border-heritage-maroon/40 text-heritage-maroon text-xs md:text-sm px-5 py-2.5 font-medium tracking-wide bg-heritage-maroon/5 whitespace-nowrap">
                        By Invite Only
                      </span>
                    ) : (
                      <a
                        href="#inquiry"
                        className="inline-flex items-center gap-2 rounded-full bg-heritage-green hover:bg-heritage-green-deep text-heritage-cream text-xs md:text-sm font-medium px-6 py-2.5 transition-all shadow-sm whitespace-nowrap group"
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
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-6 pt-5 border-t border-heritage-maroon/10' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-4 md:pl-8 border-l-3 border-heritage-maroon/50 text-base md:text-lg text-heritage-ink/80 font-light leading-relaxed space-y-3">
                      <p>{evt.description}</p>
                      {evt.venue && (
                        <p className="text-xs md:text-sm uppercase tracking-wider text-heritage-green font-medium pt-1">
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
