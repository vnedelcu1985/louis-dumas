import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ledger from './components/Ledger';
import Foundation from './components/Foundation';
import CredentialsBand from './components/CredentialsBand';
import Services from './components/Services';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';

/**
 * Template 3: Sovereign Diplomatic Editorial
 * Replicates the structure of Template 2 in the iconic Template 1 color palette
 * (Sovereign Navy, Diplomatic Crimson, Luminous Golden Yellow #DFAB35, and Archival Beige #F4EFE6).
 * Features live Light / Dark mode toggling.
 */
export default function Template3() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('t3_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark'; // Default to sovereign dark mode
  });

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('t3_theme', next);
      }
      return next;
    });
  };

  useEffect(() => {
    // Sync if needed
  }, [theme]);

  return (
    <div
      className={`font-sans antialiased min-h-screen transition-colors duration-500 overflow-x-hidden ${
        isDark
          ? 'bg-[#09151F] text-[#FBFAF5] selection:bg-[#C58A38] selection:text-[#09151F]'
          : 'bg-[#FBFAF5] text-[#343434] selection:bg-[#9D2933] selection:text-[#FBFAF5]'
      }`}
    >
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero isDark={isDark} />
        <Ledger isDark={isDark} />
        <Foundation isDark={isDark} />
        <CredentialsBand isDark={isDark} />
        <Services isDark={isDark} />
        <Inquiry isDark={isDark} />
      </main>
      <Footer isDark={isDark} />

      {/* Floating Quick Theme Toggle (accessible anywhere on page) */}
      <div className="fixed bottom-6 left-6 z-50 print:hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-sans font-medium tracking-widest uppercase shadow-2xl transition-all cursor-pointer border backdrop-blur-md ${
            isDark
              ? 'bg-[#07121A]/95 text-[#C58A38] border-[#C58A38]/40 hover:bg-[#0C1B26]'
              : 'bg-[#FBFAF5]/95 text-[#9D2933] border-[#9D2933]/25 hover:bg-[#FBFAF5]'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-[#C58A38]" />
              <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-[#9D2933]" />
              <span>Switch to Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
