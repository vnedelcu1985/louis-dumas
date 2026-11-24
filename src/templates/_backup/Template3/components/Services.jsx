import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { services } from '../../../data/content';

export default function Services({ isDark }) {
  const [activeService, setActiveService] = useState(0);

  return (
    <section
      id="services"
      className={`py-28 md:py-36 px-6 md:px-16 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#09151F]' : 'bg-[#FBFAF5]'
      }`}
    >
      <FadeInSection className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-14 md:mb-20 pb-6 border-b ${
            isDark ? 'border-[#FBFAF5]/10' : 'border-[#343434]/12'
          }`}
        >
          <h2
            className={`font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight transition-colors ${
              isDark ? 'text-[#FBFAF5]' : 'text-[#9D2933]'
            }`}
          >
            Work With Me
          </h2>
        </div>

        {/* Interactive Layout: Click-only switching, Template 1 typography scaling */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center font-sans">
          {/* Left Interactive Nav with Sliding Indicator Line */}
          <div
            className={`md:col-span-5 flex flex-col justify-center space-y-4 md:space-y-6 border-l pl-8 relative ${
              isDark ? 'border-[#FBFAF5]/15' : 'border-[#343434]/15'
            }`}
          >
            {/* Sliding Active Indicator Line */}
            <div
              className={`absolute left-[-2px] w-[3.5px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-full ${
                isDark ? 'bg-[#C58A38]' : 'bg-[#9D2933]'
              }`}
              style={{
                top: `${activeService * (100 / services.length)}%`,
                height: `${100 / services.length}%`,
              }}
            />

            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(index)}
                  className={`text-left block w-full font-serif text-2xl md:text-3xl transition-all duration-500 py-3 cursor-pointer focus:outline-none ${
                    isActive
                      ? isDark
                        ? 'text-[#C58A38] translate-x-3 font-medium'
                        : 'text-[#9D2933] translate-x-3 font-medium'
                      : isDark
                      ? 'text-[#FBFAF5]/40 hover:text-[#FBFAF5]/80'
                      : 'text-[#343434]/40 hover:text-[#343434]/80'
                  }`}
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="md:col-span-7 relative min-h-[260px] md:min-h-[280px] flex items-center">
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.id}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? 'opacity-100 translate-y-0 relative z-10'
                      : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none z-0'
                  }`}
                >
                  <span
                    className={`block text-[0.7rem] md:text-xs uppercase tracking-[0.3em] font-medium mb-3 ${
                      isDark ? 'text-[#C58A38]' : 'text-[#165E83]'
                    }`}
                  >
                    {service.title}
                  </span>

                  <p
                    className={`text-xl md:text-2xl font-light leading-relaxed mb-8 max-w-2xl transition-colors ${
                      isDark ? 'text-[#FBFAF5]/85' : 'text-[#343434]/85'
                    }`}
                  >
                    {service.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6">
                    <a
                      href={service.href || '#inquiry'}
                      className={`inline-flex items-center gap-2 rounded-full text-xs md:text-sm font-medium px-6 py-2.5 transition-all shadow-sm group ${
                        isDark
                          ? 'bg-gradient-to-r from-[#C88A36] to-[#B37424] text-white shadow-[0_0_16px_rgba(197,138,56,0.35)] hover:brightness-110'
                          : 'bg-[#9D2933] hover:bg-[#165E83] text-[#FBFAF5]'
                      }`}
                      aria-label={service.action}
                    >
                      <span>{service.action}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
