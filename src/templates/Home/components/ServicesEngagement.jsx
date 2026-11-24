import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { services } from '../../../data/content';
import { servicesFr } from '../../../data/contentFr';

export default function ServicesEngagement({ lang = 'en' }) {
  const [activeService, setActiveService] = useState(0);
  const currentServices = lang === 'fr' ? servicesFr : services;

  return (
    <section id="services" className="bg-[#FBFAF5] py-32 px-6 md:px-16 overflow-hidden">
      <FadeInSection className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-16">
          {/* Left Nav Menu */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-8 border-l border-[#343434]/10 pl-8 relative">
            {/* Active Indicator Line */}
            <div
              className="absolute left-[-1px] w-[2px] bg-[#9D2933] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{
                top: `${activeService * (100 / currentServices.length)}%`,
                height: `${100 / currentServices.length}%`,
              }}
            />

            {currentServices.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveService(index)}
                className={`text-left text-2xl md:text-3xl font-serif transition-all duration-500 py-4 cursor-pointer focus:outline-none ${
                  activeService === index
                    ? 'text-[#165E83] translate-x-4'
                    : 'text-[#343434]/40 hover:text-[#343434]/80'
                }`}
              >
                {service.subtitle}
              </button>
            ))}
          </div>

          {/* Right Content Overlay */}
          <div className="md:col-span-7 relative min-h-[300px] flex items-center">
            {currentServices.map((service, index) => (
              <div
                key={service.id}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  activeService === index
                    ? 'opacity-100 translate-y-0 z-10'
                    : activeService > index
                    ? 'opacity-0 -translate-y-12 z-0 pointer-events-none'
                    : 'opacity-0 translate-y-12 z-0 pointer-events-none'
                }`}
              >
                <h3 className="text-[0.7rem] md:text-xs tracking-[0.35em] uppercase font-sans font-medium text-[#B48B44] mb-4">
                  {service.title}
                </h3>
                <p className="text-base md:text-lg font-sans font-light text-[#343434] leading-relaxed mb-10">
                  {service.description}
                </p>
                <a
                  href={service.href || '#inquiry'}
                  className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-[#9D2933] hover:text-[#165E83] transition-colors duration-500 w-max"
                >
                  {service.action}
                  <ChevronDown className="w-4 h-4 text-[#9D2933] group-hover:translate-y-1 transition-transform duration-300" strokeWidth={1.75} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
