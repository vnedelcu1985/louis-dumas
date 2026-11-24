import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { brand, navLinks } from '../../../data/content';

export default function Header({ isDark, toggleTheme }) {
  const links = navLinks.filter((l) => l.href !== '#inquiry');
  const inquiry = navLinks.find((l) => l.href === '#inquiry');

  return (
    <>
      {/* Protocol Bar */}
      <div
        className={`px-6 md:px-16 py-2 text-[0.68rem] tracking-[0.2em] uppercase font-sans transition-colors duration-300 ${
          isDark
            ? 'bg-[#07121A] text-[#FBFAF5]/80 border-b border-[#FBFAF5]/5'
            : 'bg-[#FBFAF5] text-[#343434]/80 border-b border-[#343434]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                isDark ? 'bg-[#C58A38] shadow-[0_0_8px_rgba(197,138,56,0.6)]' : 'bg-[#9D2933]'
              }`}
            />
            Official Advisory Dossier
            <span className="hidden sm:inline opacity-40">|</span>
            <span className="hidden sm:inline normal-case tracking-wider">{brand.credential}</span>
          </span>
          <span className="hidden md:inline opacity-80">{brand.location}</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 border-b ${
          isDark
            ? 'bg-[#09151F]/90 border-[#FBFAF5]/10 text-[#FBFAF5]'
            : 'bg-[#FBFAF5]/90 border-[#343434]/10 text-[#343434]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex items-center justify-between gap-6">
          <a href="#top" className="group">
            <span
              className={`block font-serif text-xl md:text-2xl tracking-[0.18em] transition-colors ${
                isDark
                  ? 'text-[#FBFAF5] group-hover:text-[#C58A38]'
                  : 'text-[#165E83] group-hover:text-[#9D2933]'
              }`}
            >
              {brand.name}
            </span>
            <span
              className={`block text-[0.58rem] tracking-[0.35em] uppercase mt-0.5 font-sans font-medium ${
                isDark ? 'text-[#C58A38]' : 'text-[#9D2933]'
              }`}
            >
              {brand.eyebrow}
            </span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-sans transition-colors ${
              isDark ? 'text-[#FBFAF5]/80' : 'text-[#343434]/80'
            }`}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors font-light ${
                  isDark ? 'hover:text-[#C58A38]' : 'hover:text-[#9D2933]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-sans font-medium tracking-wider uppercase transition-all cursor-pointer border ${
                isDark
                  ? 'bg-[#FBFAF5]/5 border-[#C58A38]/40 text-[#C58A38] hover:bg-[#FBFAF5]/10'
                  : 'bg-[#9D2933]/5 border-[#9D2933]/25 text-[#9D2933] hover:bg-[#9D2933]/10'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-[#C58A38]" /> : <Moon className="w-3.5 h-3.5 text-[#9D2933]" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {inquiry && (
              <a
                href={inquiry.href}
                className={`rounded-full text-xs md:text-sm px-5 py-2.5 font-sans font-medium tracking-wide transition-all ${
                  isDark
                    ? 'bg-gradient-to-r from-[#C88A36] to-[#B37424] text-white shadow-[0_0_20px_rgba(197,138,56,0.45)] hover:brightness-110 hover:-translate-y-0.5'
                    : 'bg-[#9D2933] text-[#FBFAF5] shadow-[0_6px_16px_-6px_rgba(157,41,51,0.7)] hover:bg-[#7D1F27] hover:-translate-y-0.5'
                }`}
              >
                {inquiry.label}
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
