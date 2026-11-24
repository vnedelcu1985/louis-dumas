import React from 'react';
import { brand } from '../../../data/content';
import { brandFr, footerFr } from '../../../data/contentFr';
import { openPrivacyModal } from '../../../utils/privacy';

export default function Footer({ lang = 'en' }) {
  const currentBrand = lang === 'fr' ? brandFr : brand;
  const currentFooter = lang === 'fr' ? footerFr : { protocolLabel: 'Privacy & Security Protocol' };

  return (
    <footer className="bg-[#0C1B26] text-[#FBFAF5]/40 py-12 px-6 md:px-16 text-xs border-t border-[#FBFAF5]/5 font-light tracking-wider">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <span>&copy; {currentBrand.currentYear} {currentBrand.copyrightNotice}</span>
        <button
          type="button"
          onClick={openPrivacyModal}
          className="hover:text-[#B48B44] transition-colors underline underline-offset-4 cursor-pointer"
        >
          {currentFooter.protocolLabel}
        </button>
      </div>
    </footer>
  );
}
