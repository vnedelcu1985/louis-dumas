import React from 'react';
import FadeInSection from '../../../components/common/FadeInSection';
import { institutionalTrust } from '../../../data/content';

export default function CredentialsBand({ isDark }) {
  return (
    <section
      className={`relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#07121A] text-[#FBFAF5]' : 'bg-[#6E1F2D] text-[#FBFAF5]'
      }`}
    >
      {/* Sovereign ambient depth */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(197,138,56,0.18),transparent_65%)]'
            : 'bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.12),transparent_65%)]'
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.45),transparent_65%)]" />

      <FadeInSection className="relative max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-28 text-center font-sans">
        <span
          className={`block text-[0.68rem] tracking-[0.35em] uppercase mb-4 font-medium ${
            isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
          }`}
        >
          {institutionalTrust.eyebrow}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
          {institutionalTrust.headline}
        </h2>

        <div className="mt-14 grid md:grid-cols-3 gap-10 md:gap-6">
          {institutionalTrust.milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`px-4 ${idx > 0 ? 'md:border-l md:border-[#FBFAF5]/15' : ''}`}
            >
              <span
                className={`block font-serif text-3xl lg:text-4xl leading-tight ${
                  isDark
                    ? 'text-[#C58A38] [text-shadow:0_2px_18px_rgba(197,138,56,0.35)]'
                    : 'text-[#C9A45C]'
                }`}
              >
                {m.title}
              </span>
              <span className="block mt-3 text-xs tracking-[0.25em] uppercase text-[#FBFAF5]/70 font-sans">
                {m.category}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-4xl mx-auto text-center text-[#FBFAF5]/90 font-light leading-relaxed">
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
