import React, { useEffect, useState } from 'react';
import { brand, navLinks } from '../../../data/content';
import { brandFr, navLinksFr } from '../../../data/contentFr';

export default function Navigation({ lang = 'en', onSetLang }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navOpacity = Math.min(scrollY / 300, 1);
  const navTranslateY = Math.max(20 - scrollY / 15, 0);
  const isScrolledPast = scrollY > 400;

  const currentBrand = lang === 'fr' ? brandFr : brand;
  const currentNavLinks = lang === 'fr' ? navLinksFr : navLinks;

  return (
    <header
      className="w-full py-5 sm:py-7 px-6 md:px-16 flex justify-between items-center fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: isScrolledPast ? 'rgba(251, 250, 245, 0.96)' : 'transparent',
        backdropFilter: isScrolledPast ? 'blur(10px)' : 'none',
        borderBottom: isScrolledPast ? '1px solid rgba(52, 52, 52, 0.08)' : 'transparent',
      }}
      aria-label="Primary Navigation"
    >
      {/* Brand Monogram & Eyebrow: Fades in gracefully as visitor scrolls */}
      <a
        href="#top"
        className="group text-left cursor-pointer transition-all duration-500"
        style={{
          opacity: navOpacity,
          transform: `translateY(${navTranslateY}px)`,
          pointerEvents: scrollY > 80 ? 'auto' : 'none',
        }}
      >
        <div className="text-xl md:text-2xl font-serif tracking-widest text-[#165E83] group-hover:text-[#9D2933] transition-colors duration-500">
          {currentBrand.name}
        </div>
        <div className="text-[0.6rem] tracking-[0.3em] text-[#9D2933] mt-1 font-sans uppercase">
          {currentBrand.eyebrow}
        </div>
      </a>

      {/* Right Controls: Desktop Nav Links + Sovereign Canadian EN / FR Toggle */}
      <div className="flex items-center gap-6 sm:gap-8">
        <nav
          className="hidden md:flex gap-8 text-sm tracking-wide text-[#343434] transition-all duration-500"
          style={{
            opacity: navOpacity,
            transform: `translateY(${navTranslateY}px)`,
            pointerEvents: scrollY > 80 ? 'auto' : 'none',
          }}
        >
          {currentNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#9D2933] transition-colors duration-500 font-light"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* 
          Official Bilingual Toggle: 
          Always visible on desktop and mobile at the top header,
          allowing instant seamless switching between Canadian English and Canadian French.
        */}
        <div
          translate="no"
          className="notranslate pointer-events-auto inline-flex items-center rounded-full border border-[#B48B44]/45 bg-[#FBFAF5]/95 backdrop-blur-md p-0.5 shadow-xs"
        >
          <button
            type="button"
            translate="no"
            onClick={() => onSetLang && onSetLang('en')}
            className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-full tracking-wider transition-all duration-300 cursor-pointer notranslate ${
              lang === 'en'
                ? 'bg-[#165E83] text-[#FBFAF5] shadow-xs'
                : 'text-[#343434]/60 hover:text-[#9D2933]'
            }`}
            aria-label="Switch to English"
            title="English version"
          >
            EN
          </button>
          <button
            type="button"
            translate="no"
            onClick={() => onSetLang && onSetLang('fr')}
            className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded-full tracking-wider transition-all duration-300 cursor-pointer notranslate ${
              lang === 'fr'
                ? 'bg-[#9D2933] text-[#FBFAF5] shadow-xs'
                : 'text-[#343434]/70 hover:text-[#9D2933]'
            }`}
            aria-label="Passer au français canadien"
            title="Version française"
          >
            FR
          </button>
        </div>
      </div>
    </header>
  );
}
