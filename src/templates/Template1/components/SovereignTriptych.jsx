import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { triptych } from '../../../data/content';
import { triptychFr } from '../../../data/contentFr';

export default function SovereignTriptych({ lang = 'en' }) {
  const currentTriptych = lang === 'fr' ? triptychFr : triptych;
  const [active, setActive] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const touchStartX = useRef(null);

  const isEffectivelyPaused = isManuallyPaused || isAutoPaused;

  const pillars = currentTriptych.pillars;
  const pillar = pillars[active] || pillars[0];

  // Pillar theme colors: Judgement (Red), Clarity (Yellow/Gold), Courage (Blue)
  const pillarColors = ['#9D2933', '#B48B44', '#165E83'];
  const barColor = pillarColors[active % pillarColors.length];

  const pillarCount = pillars.length;

  // Auto-cycle every 8.0 seconds (8000ms) unless paused on hover/touch or manually paused
  useEffect(() => {
    if (isEffectivelyPaused) return;

    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % pillarCount);
    }, 8000);

    return () => clearTimeout(timer);
  }, [active, isEffectivelyPaused, pillarCount]);

  const handlePrev = () => {
    setActive((prev) => (prev === 0 ? pillars.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev === pillars.length - 1 ? 0 : prev + 1));
  };

  const togglePlayPause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  const handleTouchStart = (e) => {
    setIsAutoPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    setIsAutoPaused(false);
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section className="bg-[#0C1B26] text-[#FBFAF5] pt-16 md:pt-20 pb-28 md:pb-36 px-6 md:px-16 overflow-hidden">
      <style>{`
        @keyframes pillarBarLoading {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
      <FadeInSection className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[0.7rem] md:text-xs tracking-[0.35em] uppercase font-sans font-medium text-[#B48B44] mb-4">
            {lang === 'fr' ? triptychFr.headerKicker : 'resolving complexity under pressure'}
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FBFAF5] max-w-4xl mx-auto leading-tight tracking-tight">
            {currentTriptych.title}
          </h3>
        </div>

        {/* Single Pillar Showcase with Side Navigation Arrows */}
        <div
          className="max-w-4xl mx-auto flex items-center justify-between gap-4 sm:gap-8 md:gap-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsAutoPaused(true)}
          onMouseLeave={() => setIsAutoPaused(false)}
        >
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#FBFAF5]/20 text-[#FBFAF5]/70 hover:text-[#FBFAF5] hover:border-[#B48B44] hover:bg-[#FBFAF5]/10 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
            aria-label="Previous pillar"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Active Pillar Card: Standardized stable min-height prevents section resizing */}
          <div className="flex-1 relative pt-9 min-h-[370px] sm:min-h-[330px] md:min-h-[310px] lg:min-h-[290px] flex flex-col justify-start">
            {/* Animated Loading Bar: Synchronized with the 8.0-second loading cycle */}
            <div className="absolute top-0 left-0 w-full h-[4px] overflow-hidden flex items-center">
              {/* Thin baseline track */}
              <div className="w-full h-[1.5px] bg-[#FBFAF5]/15 transition-colors duration-500" />
              {/* Active loading bar filling over 8.0s */}
              <div
                key={`${active}-${lang}`}
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  backgroundColor: barColor,
                  transformOrigin: 'left',
                  animation: 'pillarBarLoading 8s linear forwards',
                  animationPlayState: isEffectivelyPaused ? 'paused' : 'running',
                }}
              />
            </div>

            {/* Pillar Numeral & Title: Fixed height prevents vertical jump */}
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#FBFAF5] mb-5 tracking-tight shrink-0">
              {pillar.numeral}. {pillar.title}
            </h4>

            {/* Question: Positioned ABOVE the definition, stable min-height prevents layout shifts */}
            <div className="min-h-[110px] sm:min-h-[96px] md:min-h-[105px] lg:min-h-[115px] flex items-start">
              {pillar.question && (
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal text-[#FBFAF5] leading-snug tracking-tight">
                  {pillar.question}
                </p>
              )}
            </div>

            {/* Definition: Positioned below question, stable min-height prevents layout shifts */}
            <div className="mt-4 min-h-[85px] sm:min-h-[72px] md:min-h-[64px] flex items-start">
              <p className="text-base md:text-lg lg:text-xl font-light text-[#FBFAF5]/75 leading-relaxed max-w-2xl">
                {pillar.description}
              </p>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-[#FBFAF5]/20 text-[#FBFAF5]/70 hover:text-[#FBFAF5] hover:border-[#B48B44] hover:bg-[#FBFAF5]/10 flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
            aria-label="Next pillar"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Subtle Minimalist Indicators & Play/Pause Controls */}
        <div className="flex items-center justify-center gap-3.5 mt-8 sm:mt-10">
          <div className="flex items-center gap-2">
            {pillars.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  active === idx
                    ? 'w-7 bg-[#B48B44]'
                    : 'w-2 bg-[#FBFAF5]/20 hover:bg-[#FBFAF5]/40'
                }`}
                aria-label={`${p.numeral}. ${p.title}`}
              />
            ))}
          </div>

          <span className="w-1 h-1 rounded-full bg-[#FBFAF5]/25" aria-hidden="true" />

          <button
            type="button"
            onClick={togglePlayPause}
            className="group flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FBFAF5]/15 hover:border-[#B48B44]/60 text-[#FBFAF5]/45 hover:text-[#B48B44] transition-all duration-300 cursor-pointer"
            aria-label={
              isManuallyPaused
                ? (lang === 'fr' ? 'Activer le défilement automatique' : 'Resume auto-cycle')
                : (lang === 'fr' ? 'Mettre en pause' : 'Pause auto-cycle')
            }
            title={
              isManuallyPaused
                ? (lang === 'fr' ? 'Activer le défilement automatique' : 'Resume auto-cycle')
                : (lang === 'fr' ? 'Mettre en pause' : 'Pause auto-cycle')
            }
          >
            {isManuallyPaused ? (
              <Play className="w-2.5 h-2.5 fill-current translate-x-[0.5px]" />
            ) : (
              <Pause className="w-2.5 h-2.5 fill-current" />
            )}
            <span className="text-[0.65rem] tracking-wider uppercase font-mono">
              {isManuallyPaused
                ? (lang === 'fr' ? 'Lecture' : 'Play')
                : (lang === 'fr' ? 'Pause' : 'Pause')}
            </span>
          </button>
        </div>
      </FadeInSection>
    </section>
  );
}
