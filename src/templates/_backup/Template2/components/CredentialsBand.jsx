import React from 'react';
import FadeInSection from '../../../components/common/FadeInSection';
import { institutionalTrust } from '../../../data/content';

// Solid maroon band in the spirit of the reference "By the Numbers" strip —
// deliberately without the maroon→green gradient or the curved green line.
export default function CredentialsBand() {
  return (
    <section className="relative bg-heritage-maroon text-heritage-cream overflow-hidden">
      {/* Maroon-only depth: soft light + fine grain, no green */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.35),transparent_60%)]" />

      <FadeInSection className="relative max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 text-center">
        <span className="block text-[0.68rem] tracking-[0.35em] uppercase text-heritage-gold/90 mb-4">
          {institutionalTrust.eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
          {institutionalTrust.headline}
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-6">
          {institutionalTrust.milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`px-4 ${idx > 0 ? 'md:border-l md:border-heritage-cream/15' : ''}`}
            >
              <span className="block font-serif text-3xl lg:text-4xl text-heritage-gold leading-tight [text-shadow:0_2px_18px_rgba(201,164,92,0.25)]">
                {m.title}
              </span>
              <span className="block mt-3 text-xs tracking-[0.25em] uppercase text-heritage-cream/70">
                {m.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-4xl mx-auto text-center text-heritage-cream/90 font-light leading-relaxed">
          {institutionalTrust.paragraphs.map((p, idx) => (
            <p key={idx} className="text-xl md:text-2xl font-light leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
