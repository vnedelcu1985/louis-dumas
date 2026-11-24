import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Ledger from './components/Ledger';
import Foundation from './components/Foundation';
import CredentialsBand from './components/CredentialsBand';
import Services from './components/Services';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';

/**
 * Template 2: Heritage Editorial
 * Cream canvas, deep burgundy headings, forest green actions,
 * events row directly under hero, animated services, and
 * inverted burgundy inquiry form with golden accents.
 */
export default function Template2() {
  return (
    <div className="font-sans antialiased bg-heritage-cream text-heritage-ink min-h-screen selection:bg-heritage-maroon selection:text-heritage-cream overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Ledger />
        <Foundation />
        <CredentialsBand />
        <Services />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
