import React from 'react';
import { ChevronDown } from 'lucide-react';
import { mandate } from '../../../data/content';
import { mandateFr } from '../../../data/contentFr';

/**
 * LeadTitleSection (Section 1):
 * The initial hero peek section positioned directly between the fixed hero and Section 2.
 * Features the subtle gold top border, parallax framing with the bouncing chevron arrow button,
 * and the phrase: "A deeper look at how you decide when the path isn’t clear, the information is incomplete, and more than one way forward seems right."
 * in the signature diplomatic blue sans-serif font matching service descriptions.
 */
export default function LeadTitleSection({
  lang = 'en',
  hasPeeked = false,
  isDismissing = false,
  onArrowClick,
}) {
  const currentMandate = lang === 'fr' ? mandateFr : mandate;

  return (
    <section
      id="peek-section"
      translate="no"
      className={`relative z-20 bg-[#FBFAF5] notranslate transition-all duration-700 ease-in-out ${
        isDismissing
          ? 'opacity-0 max-h-0 min-h-0 !py-0 !pt-0 !pb-0 overflow-hidden pointer-events-none border-t-0'
          : 'border-t border-[#B48B44]/35 px-4 sm:px-6 md:px-16 flex flex-col items-center justify-start pt-1.5 sm:pt-3 pb-8 sm:pb-12 md:pb-16 min-h-[26vh] sm:min-h-[28vh] max-h-[800px] opacity-100'
      }`}
    >
      {/* 
        Parallax Framing with Arrow Button:
        Visible during the hero peek phase.
        When pressed, smoothly scrolls down to Section 2 (The Mandate).
      */}
      <div
        className={`flex justify-center pb-2 sm:pb-3 transition-opacity duration-700 ${
          hasPeeked && !isDismissing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={onArrowClick}
          disabled={isDismissing}
          className="p-1 text-[#9D2933] hover:text-[#165E83] transition-colors focus:outline-none cursor-pointer group disabled:pointer-events-none"
          aria-label={lang === 'fr' ? 'Découvrir la suite' : 'Explore mandate'}
          title={lang === 'fr' ? 'Découvrir la suite' : 'Explore mandate'}
        >
          <ChevronDown
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#9D2933] group-hover:text-[#165E83] group-hover:translate-y-1 transition-all animate-bounce"
            strokeWidth={1.75}
          />
        </button>
      </div>

      {/* Section 1 Sentence in signature crimson serif font matching LEARN MORE color and Section 2 title font/size */}
      <div className="max-w-4xl mx-auto text-center px-2 sm:px-4">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.65rem] font-serif font-light leading-snug sm:leading-tight text-[#9D2933]">
          {currentMandate.peekLead}
        </p>
      </div>
    </section>
  );
}
