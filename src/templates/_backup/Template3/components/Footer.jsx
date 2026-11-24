import React from 'react';
import { brand, contactDetails } from '../../../data/content';
import { openPrivacyModal } from '../../../utils/privacy';

export default function Footer({ isDark }) {
  return (
    <footer
      className={`border-t py-12 px-6 md:px-16 text-xs font-sans tracking-wider transition-colors duration-300 ${
        isDark
          ? 'bg-[#07121A] text-[#FBFAF5]/50 border-[#FBFAF5]/10'
          : 'bg-[#4A121C] text-[#FBFAF5]/70 border-[#C9A45C]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span>
          &copy; {brand.currentYear} {brand.name}. {brand.copyrightNotice}
        </span>
        <div className={`flex flex-wrap items-center justify-center gap-6 ${isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'}`}>
          <a
            href={`mailto:${contactDetails.email}`}
            className="hover:underline"
          >
            {contactDetails.email}
          </a>
          <a
            href={contactDetails.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <span className="opacity-70">{brand.location}</span>
          <button
            type="button"
            onClick={openPrivacyModal}
            className="hover:underline cursor-pointer"
          >
            Privacy &amp; Security Protocol
          </button>
        </div>
      </div>
    </footer>
  );
}
