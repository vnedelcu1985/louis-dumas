import React from 'react';
import { brand, navLinks } from '../../../data/content';

export default function Header() {
  const links = navLinks.filter((l) => l.href !== '#inquiry');
  const inquiry = navLinks.find((l) => l.href === '#inquiry');

  return (
    <>
      {/* Thin protocol bar */}
      <div className="bg-heritage-maroon-deep text-heritage-cream/80 px-6 md:px-16 py-2 text-[0.68rem] tracking-[0.2em] uppercase">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-heritage-gold inline-block" />
            Official Advisory Dossier
            <span className="hidden sm:inline text-heritage-cream/40">|</span>
            <span className="hidden sm:inline normal-case tracking-wider">{brand.credential}</span>
          </span>
          <span className="hidden md:inline">{brand.location}</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-heritage-cream/90 backdrop-blur-md border-b border-heritage-ink/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex items-center justify-between gap-6">
          <a href="#top" className="group">
            <span className="block font-serif text-xl md:text-2xl tracking-[0.18em] text-heritage-green group-hover:text-heritage-maroon transition-colors">
              {brand.name}
            </span>
            <span className="block text-[0.58rem] tracking-[0.35em] text-heritage-maroon uppercase mt-0.5">
              {brand.eyebrow}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-heritage-ink/70">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-heritage-maroon transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {inquiry && (
            <a
              href={inquiry.href}
              className="rounded-full bg-heritage-maroon text-heritage-cream text-xs md:text-sm px-5 py-2.5 shadow-[0_6px_16px_-6px_rgba(110,31,45,0.6)] hover:bg-heritage-maroon-deep hover:-translate-y-0.5 transition-all"
            >
              {inquiry.label}
            </a>
          )}
        </div>
      </header>
    </>
  );
}
