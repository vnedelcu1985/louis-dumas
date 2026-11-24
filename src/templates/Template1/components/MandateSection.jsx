import React from 'react';
import { ChevronDown } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { mandate } from '../../../data/content';
import { mandateFr } from '../../../data/contentFr';

/**
 * MandateSection (Section 2):
 * Positioned directly underneath Section 1 without any separation line,
 * sharing the identical #FBFAF5 parchment background.
 * Features:
 * 1. Title: "Helping leaders face complex decisions under pressure with clarity and integrity."
 * 2. Mandate narrative paragraph: "Leaders and organisations in Canada and overseas turn to Louis Dumas..."
 * 3. 'Learn More' navigation prompt linking down to the Institutional Trust section.
 */
export default function MandateSection({
  lang = 'en',
  onLearnMore,
}) {
  const currentMandate = lang === 'fr' ? mandateFr : mandate;

  const handleLearnMoreClick = (e) => {
    e.preventDefault();
    if (onLearnMore) {
      onLearnMore();
    } else {
      const target = document.getElementById('institutional-trust');
      if (target) {
        const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
        const targetY = Math.max(0, absoluteTop - Math.round(window.innerHeight * 0.272));
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="mandate"
      translate="no"
      className="bg-[#FBFAF5] notranslate scroll-mt-24 px-6 md:px-16 flex flex-col justify-between items-center pt-8 sm:pt-10 md:pt-12 pb-28 sm:pb-32 md:pb-36 min-h-[36vh] sm:min-h-[40vh] md:min-h-[calc(100vh-14.25rem)]"
    >
      <FadeInSection className="max-w-4xl text-center space-y-6 sm:space-y-8 md:space-y-0 flex-1 flex flex-col items-center justify-start md:justify-between w-full">
        {/* Section 2 Title */}
        <div className="pt-2 sm:pt-4 md:pt-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-serif font-light leading-snug sm:leading-tight text-[#165E83]">
            {currentMandate.lead}
          </h2>
        </div>

        {/* Proportional upper spacer (desktop only: separates paragraph lower from title) */}
        <div className="hidden md:block md:flex-[2] md:min-h-[3.5rem]" />

        {/* Narrative Paragraph */}
        <div className="max-w-3xl px-2 sm:px-4">
          <p className="text-base sm:text-lg md:text-lg lg:text-xl font-light leading-relaxed text-[#343434]">
            {currentMandate.body}
          </p>
        </div>

        {/* Proportional lower spacer (desktop only: moderates whitespace above Learn More) */}
        <div className="hidden md:block md:flex-[3] md:min-h-[5rem]" />

        {/* Learn More link positioned gracefully above portrait seam */}
        <div className="flex items-center justify-center pb-2">
          <a
            href="#institutional-trust"
            onClick={handleLearnMoreClick}
            className="group inline-flex items-center gap-2.5 text-xs sm:text-sm tracking-widest uppercase text-[#9D2933] hover:text-[#165E83] transition-colors duration-500 font-medium cursor-pointer"
          >
            <span>{lang === 'fr' ? currentMandate.learnMore : 'Learn More'}</span>
            <ChevronDown
              className="w-4 h-4 text-[#9D2933] group-hover:translate-y-1 transition-transform duration-300"
              strokeWidth={1.75}
            />
          </a>
        </div>
      </FadeInSection>
    </section>
  );
}
