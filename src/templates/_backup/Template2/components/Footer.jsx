import React from 'react';
import { brand } from '../../../data/content';
import { openPrivacyModal } from '../../../utils/privacy';

export default function Footer() {
  return (
    <footer className="bg-heritage-maroon-deep text-heritage-cream/60 px-6 md:px-16 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
        <div className="text-center md:text-left">
          <span className="block font-serif text-lg tracking-[0.18em] text-heritage-cream">
            {brand.name}
          </span>
          <span className="block mt-1">
            &copy; {brand.currentYear} {brand.name}. {brand.copyrightNotice}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 uppercase tracking-[0.2em] text-[0.65rem]">
          <span>Diplomatic Discretion</span>
          <span className="text-heritage-gold">•</span>
          <span>Chatham House Rule</span>
          <span className="text-heritage-gold">•</span>
          <button
            type="button"
            onClick={openPrivacyModal}
            className="hover:text-heritage-cream underline underline-offset-2 transition-colors cursor-pointer"
          >
            Privacy &amp; Security Protocol
          </button>
        </div>
      </div>
    </footer>
  );
}
