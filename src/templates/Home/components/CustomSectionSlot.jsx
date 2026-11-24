import React from 'react';
import FadeInSection from '../../../components/common/FadeInSection';

/**
 * Extension Slot: Ready for future sections (e.g. Media / Publications / Diplomatic Case Studies)
 * You can customize this component or pass children to render any additional section seamlessly.
 */
export default function CustomSectionSlot({ children }) {
  if (!children) return null;

  return (
    <section className="bg-[#FBFAF5] py-24 px-6 md:px-16 border-t border-[#343434]/10">
      <FadeInSection className="max-w-6xl mx-auto">{children}</FadeInSection>
    </section>
  );
}
