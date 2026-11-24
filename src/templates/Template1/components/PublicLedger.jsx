import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  X,
} from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { events, forumBrochure } from '../../../data/content';
import { eventsFr, calendarI18nFr, forumBrochureFr } from '../../../data/contentFr';

const defaultMonthNamesEn = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function PublicLedger({ lang = 'en', onRegisterEvent }) {
  const currentEvents = lang === 'fr' ? eventsFr : events;
  const i18n = lang === 'fr'
    ? calendarI18nFr
    : {
        sectionKicker: 'Upcoming Itinerary',
        sectionTitle: 'Upcoming Keynotes, Tabletop Sessions & Forums',
        calendarHeader: 'Executive Calendar',
        yearRange: '2026–2027',
        monthNames: defaultMonthNamesEn,
        weekDays: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
        scheduledForum: 'Scheduled Forum',
        clearDateFilter: 'Clear date filter ×',
        reset: 'Reset',
        noEvents: 'No public engagements are scheduled for this date.',
        locationLabel: 'Location:',
        prevMonth: 'Previous month',
        nextMonth: 'Next month',
        registerButton: 'Register',
        registerForEvent: 'Register for this Event',
        viewPoster: 'View the poster',
        downloadPdf: 'Download the PDF',
        openPdf: 'Open PDF',
        whenLabel: 'When',
        whereLabel: 'Where',
        seatsLabel: 'Seats',
        hostedByLabel: 'Hosted by',
        pageLabel: 'Page',
        closeModal: 'Close preview',
      };

  const currentBrochure = lang === 'fr' ? forumBrochureFr : forumBrochure;

  // Modal state for viewing the 3-page poster carousel & readable content
  const [activeModalEvent, setActiveModalEvent] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [modalLangOverride, setModalLangOverride] = useState(null);
  const touchStartX = useRef(null);

  const modalBrochureLang = modalLangOverride || lang;
  const modalBrochure = modalBrochureLang === 'fr' ? forumBrochureFr : forumBrochure;
  const modalSlides = modalBrochure.slides || [];
  const currentSlide = modalSlides[activeSlideIndex] || modalSlides[0];

  const openPosterModal = (event, initialSlide = 0) => {
    setActiveModalEvent(event);
    setActiveSlideIndex(initialSlide);
    setModalLangOverride(null);
  };

  const closePosterModal = () => {
    setActiveModalEvent(null);
  };

  const handleRegister = (event) => {
    if (activeModalEvent) {
      setActiveModalEvent(null);
    }
    if (typeof onRegisterEvent === 'function') {
      onRegisterEvent(event);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('ld:register-event', {
          detail: { event, lang },
        })
      );
    }
  };

  // Keyboard navigation & body scroll lock when modal is open
  useEffect(() => {
    if (!activeModalEvent) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePosterModal();
      } else if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => (prev + 1) % modalSlides.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => (prev - 1 + modalSlides.length) % modalSlides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalEvent, modalSlides.length]);

  const handleModalTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleModalTouchEnd = (e) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setActiveSlideIndex((prev) => (prev + 1) % modalSlides.length);
    } else if (diff < -40) {
      setActiveSlideIndex((prev) => (prev - 1 + modalSlides.length) % modalSlides.length);
    }
    touchStartX.current = null;
  };

  const monthNames = i18n.monthNames;

  // Only show calendar views for months that have events
  const availableMonths = React.useMemo(() => {
    const monthsMap = new Map();
    currentEvents.forEach((e) => {
      const startKey = `${e.date.getFullYear()}-${e.date.getMonth()}`;
      if (!monthsMap.has(startKey)) {
        monthsMap.set(startKey, new Date(e.date.getFullYear(), e.date.getMonth(), 1));
      }
      if (e.endDate) {
        const endKey = `${e.endDate.getFullYear()}-${e.endDate.getMonth()}`;
        if (!monthsMap.has(endKey)) {
          monthsMap.set(endKey, new Date(e.endDate.getFullYear(), e.endDate.getMonth(), 1));
        }
      }
    });
    const sorted = Array.from(monthsMap.values()).sort((a, b) => a.getTime() - b.getTime());
    return sorted.length > 0 ? sorted : [new Date(2027, 0, 1)];
  }, [currentEvents]);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonthDate = availableMonths[currentMonthIndex] || availableMonths[0];
  const [selectedDate, setSelectedDate] = useState(null);

  const nextMonth = () => {
    if (currentMonthIndex < availableMonths.length - 1) {
      setCurrentMonthIndex((prev) => prev + 1);
      setSelectedDate(null);
    }
  };

  const prevMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
      setSelectedDate(null);
    }
  };

  const daysInMonth = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth(),
    1
  ).getDay();

  const getEventsForDate = (day) => {
    return currentEvents.filter((e) => {
      const currentYear = currentMonthDate.getFullYear();
      const currentMonth = currentMonthDate.getMonth();

      const startYear = e.date.getFullYear();
      const startMonth = e.date.getMonth();
      const startDay = e.date.getDate();

      if (e.endDate) {
        const endYear = e.endDate.getFullYear();
        const endMonth = e.endDate.getMonth();
        const endDay = e.endDate.getDate();

        const check = new Date(currentYear, currentMonth, day).getTime();
        const start = new Date(startYear, startMonth, startDay).getTime();
        const end = new Date(endYear, endMonth, endDay).getTime();
        return check >= start && check <= end;
      }

      return startYear === currentYear && startMonth === currentMonth && startDay === day;
    });
  };

  const handleDateClick = (day) => {
    const dateObj = new Date(
      currentMonthDate.getFullYear(),
      currentMonthDate.getMonth(),
      day
    );

    if (selectedDate && selectedDate.getTime() === dateObj.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(dateObj);
    }
  };

  const filteredEvents = currentEvents
    .filter((e) => {
      if (!selectedDate) return true;
      const targetTime = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      ).getTime();

      const startTime = new Date(
        e.date.getFullYear(),
        e.date.getMonth(),
        e.date.getDate()
      ).getTime();

      const endTime = e.endDate
        ? new Date(
            e.endDate.getFullYear(),
            e.endDate.getMonth(),
            e.endDate.getDate()
          ).getTime()
        : startTime;

      return targetTime >= startTime && targetTime <= endTime;
    })
    .sort((a, b) => a.date - b.date);

  return (
    <section id="events" className="bg-[#0C1B26] py-32 px-6 md:px-16 text-[#FBFAF5]">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-[0.7rem] md:text-xs tracking-[0.35em] uppercase font-sans font-medium text-[#B48B44] mb-3">
                {i18n.sectionKicker}
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#FBFAF5] leading-tight">
                {i18n.sectionTitle}
              </p>
            </div>
            {selectedDate && (
              <button
                onClick={() => setSelectedDate(null)}
                className="text-xs uppercase tracking-widest text-[#B48B44] hover:text-[#FBFAF5] transition-colors cursor-pointer self-start md:self-auto"
              >
                {i18n.clearDateFilter}
              </button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 items-start">
            {/* The Diplomatic Calendar Module */}
            <div className="w-full md:w-8/12 lg:w-4/12 bg-gradient-to-b from-[#0F2231] to-[#0A1620] p-7 md:p-8 border border-[#B48B44]/35 self-start rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.45)] relative overflow-hidden backdrop-blur-sm shrink-0">
              {/* Subtle ambient gold radial glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(180,139,68,0.15),transparent_70%)] pointer-events-none" />

              {/* Diplomatic Ledger Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#FBFAF5]/10 mb-6">
                <span className="text-[0.62rem] tracking-[0.28em] uppercase text-[#B48B44] font-medium flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#B48B44]" />
                  {i18n.calendarHeader}
                </span>
                <span className="text-[0.65rem] text-[#FBFAF5]/40 font-mono tracking-wider">
                  {i18n.yearRange}
                </span>
              </div>

              {/* Month Selector & Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-serif text-[#FBFAF5] tracking-tight">
                  {monthNames[currentMonthDate.getMonth()]}{' '}
                  <span className="font-sans text-lg font-light text-[#B48B44] ml-1">
                    {currentMonthDate.getFullYear()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevMonth}
                    disabled={currentMonthIndex <= 0}
                    className={`w-8 h-8 rounded-full border border-[#FBFAF5]/15 flex items-center justify-center transition-all ${
                      currentMonthIndex <= 0
                        ? 'opacity-20 cursor-not-allowed border-transparent'
                        : 'hover:bg-[#B48B44]/20 hover:border-[#B48B44] text-[#FBFAF5] cursor-pointer'
                    }`}
                    aria-label={i18n.prevMonth}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextMonth}
                    disabled={currentMonthIndex >= availableMonths.length - 1}
                    className={`w-8 h-8 rounded-full border border-[#FBFAF5]/15 flex items-center justify-center transition-all ${
                      currentMonthIndex >= availableMonths.length - 1
                        ? 'opacity-20 cursor-not-allowed border-transparent'
                        : 'hover:bg-[#B48B44]/20 hover:border-[#B48B44] text-[#FBFAF5] cursor-pointer'
                    }`}
                    aria-label={i18n.nextMonth}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weekday Strip */}
              <div className="grid grid-cols-7 gap-1 mb-3 text-[0.65rem] tracking-[0.2em] font-mono font-medium text-[#B48B44]/90 text-center py-1.5 bg-[#FBFAF5]/5 rounded-lg border border-[#FBFAF5]/5">
                {i18n.weekDays.map((dayLabel, idx) => (
                  <div key={idx}>{dayLabel}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
                {Array.from({ length: firstDayIndex }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-2" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDate(day);
                  const hasEvent = dayEvents.length > 0;
                  const isSelected =
                    selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentMonthDate.getMonth() &&
                    selectedDate?.getFullYear() === currentMonthDate.getFullYear();

                  return (
                    <div key={day} className="flex items-center justify-center p-0.5">
                      <button
                        onClick={() => handleDateClick(day)}
                        disabled={!hasEvent}
                        className={`w-8 h-8 rounded-full flex flex-col items-center justify-center transition-all duration-300 font-sans text-xs relative ${
                          hasEvent
                            ? isSelected
                              ? 'bg-[#9D2933] text-[#FBFAF5] font-semibold border-2 border-[#B48B44] shadow-[0_0_12px_rgba(180,139,68,0.5)] scale-110'
                              : 'border-2 border-[#B48B44] text-[#FBFAF5] font-medium bg-[#B48B44]/15 hover:bg-[#B48B44]/30 hover:scale-105 cursor-pointer shadow-sm'
                            : 'opacity-25 cursor-default text-[#FBFAF5]'
                        }`}
                      >
                        <span>{day}</span>
                        {hasEvent && !isSelected && (
                          <span className="w-1 h-1 rounded-full bg-[#B48B44] -mt-0.5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Calendar Footer / Legend */}
              <div className="mt-7 pt-4 border-t border-[#FBFAF5]/10 flex items-center justify-between text-[0.65rem] tracking-wider text-[#FBFAF5]/60 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-[#B48B44] bg-[#B48B44]/30 inline-block" />
                  <span className="text-[#FBFAF5]/80 uppercase">{i18n.scheduledForum}</span>
                </div>
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-[#B48B44] hover:text-[#FBFAF5] uppercase tracking-wider underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {i18n.reset}
                  </button>
                )}
              </div>
            </div>

            {/* The Event List with Vertical Timeline Track */}
            <div
              className={`w-full lg:w-8/12 relative ${
                filteredEvents.length > 3
                  ? 'max-h-[750px] overflow-y-auto pr-2 sm:pr-3 [scrollbar-width:thin] [scrollbar-color:rgba(180,139,68,0.4)_rgba(251,250,245,0.05)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#FBFAF5]/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B48B44]/40 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#B48B44]/70'
                  : ''
              }`}
            >
              {/* Continuous Vertical Timeline Line running straight through circle markers */}
              <div
                className="absolute left-[18px] -translate-x-1/2 top-8 bottom-8 w-[1.5px] bg-[#9D2933]/50 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {filteredEvents.map((event, idx) => {
                  return (
                    <React.Fragment key={event.id}>
                      {/* Divider line begins where the content begins */}
                      {idx > 0 && (
                        <div
                          className="border-t border-[#FBFAF5]/10 ml-11 sm:ml-12"
                          aria-hidden="true"
                        />
                      )}
                      <div
                        onClick={() => openPosterModal(event, 0)}
                        className="group cursor-pointer py-8 pl-11 sm:pl-12 relative transition-colors duration-500"
                      >
                        {/* Circular Hollow Node Marker on Timeline */}
                        <div
                          className="absolute left-[18px] top-11 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0C1B26] border-2 border-[#9D2933] shadow-[0_0_8px_rgba(157,41,51,0.4)] group-hover:border-[#B48B44] group-hover:shadow-[0_0_12px_rgba(180,139,68,0.7)] group-hover:scale-125 transition-all duration-300 pointer-events-none"
                          aria-hidden="true"
                        />

                        {/* Event Layout: Poster Thumbnail + Structured Event Details */}
                        <div className="flex flex-col sm:flex-row gap-6 md:gap-7 items-start">
                          {/* Poster Thumbnail Preview */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPosterModal(event, 0);
                            }}
                            className="group/thumb relative w-40 sm:w-36 md:w-44 aspect-[1080/1350] rounded-lg overflow-hidden border border-[#B48B44]/35 group-hover:border-[#B48B44] shadow-[0_14px_34px_rgba(0,0,0,0.5)] shrink-0 bg-[#18070B] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B48B44]"
                            aria-label={`${i18n.viewPoster} — ${event.title}`}
                          >
                            <img
                              src={currentBrochure.thumbnailUrl}
                              alt={`${event.title} — ${i18n.viewPoster}`}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                              loading="lazy"
                            />
                            {/* Subtle gradient vignette at bottom for badge legibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90 group-hover/thumb:opacity-75 transition-opacity duration-300" />

                            {/* Top-right 3-page PDF indicator */}
                            <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#0C1B26]/85 backdrop-blur-sm border border-[#FBFAF5]/20 text-[0.58rem] font-mono uppercase tracking-wider text-[#FBFAF5]/90">
                              3 {lang === 'fr' ? 'pages' : 'pages'}
                            </span>

                            {/* Bottom-left "View the poster" pill (matches reference screenshot) */}
                            <span className="absolute bottom-2.5 left-2.5 right-2.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C1B26]/90 group-hover/thumb:bg-[#B48B44] text-[#FBFAF5] group-hover/thumb:text-[#0C1B26] border border-[#FBFAF5]/25 group-hover/thumb:border-[#B48B44] text-[0.65rem] font-medium tracking-wider uppercase transition-all duration-300 shadow-md">
                              <FileText className="w-3 h-3 shrink-0" />
                              <span>{i18n.viewPoster}</span>
                            </span>
                          </button>

                          {/* Event Details Column */}
                          <div className="flex-1 min-w-0">
                            {/* Eyebrow Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-2.5">
                              <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#B48B44] font-mono font-medium">
                                {event.type}
                              </span>
                              <span className="text-[#FBFAF5]/25">•</span>
                              <span className="text-[0.65rem] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#9D2933]/35 border border-[#9D2933]/70 text-[#FBFAF5]/90 font-medium">
                                {event.badge}
                              </span>
                            </div>

                            {/* Event Title */}
                            <h3 className="text-2xl md:text-3xl font-serif text-[#FBFAF5] group-hover:text-[#B48B44] transition-colors duration-300 leading-snug mb-1.5">
                              {event.title}
                            </h3>

                            {/* Event Subtitle */}
                            {event.subtitle && (
                              <p className="text-sm md:text-base text-[#FBFAF5]/75 font-light italic mb-4">
                                {event.subtitle}
                              </p>
                            )}

                            {/* Compact 3-Column Metadata Strip: When / Where / Seats */}
                            <div className="grid grid-cols-3 gap-3 sm:gap-5 py-3 px-4 mb-4 rounded-lg bg-[#0F2231]/75 border border-[#FBFAF5]/10">
                              <div>
                                <div className="text-[0.62rem] uppercase tracking-widest text-[#FBFAF5]/45 font-mono mb-0.5">
                                  {i18n.whenLabel}
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-[#FBFAF5]">
                                  {event.dateDisplay}
                                </div>
                              </div>
                              <div>
                                <div className="text-[0.62rem] uppercase tracking-widest text-[#FBFAF5]/45 font-mono mb-0.5">
                                  {i18n.whereLabel}
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-[#FBFAF5]">
                                  {event.venue || currentBrochure.venue}
                                </div>
                              </div>
                              <div>
                                <div className="text-[0.62rem] uppercase tracking-widest text-[#FBFAF5]/45 font-mono mb-0.5">
                                  {i18n.seatsLabel}
                                </div>
                                <div className="text-xs sm:text-sm font-medium text-[#FBFAF5]">
                                  {event.seats || currentBrochure.seats}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-sm md:text-base font-light text-[#FBFAF5]/75 leading-relaxed mb-5">
                              {event.description}
                            </p>

                            {/* Action Row: Register + View the Poster + Download the PDF */}
                            <div className="pt-4 border-t border-[#FBFAF5]/10 flex flex-wrap items-center gap-3 sm:gap-4">
                              {/* Primary Register Button -> scrolls to form & pre-fills */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegister(event);
                                }}
                                className="group/btn inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest bg-[#B48B44] hover:bg-[#FBFAF5] text-[#0C1B26] font-medium rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                                aria-label={`${i18n.registerButton || 'Register'} — ${event.title}`}
                              >
                                <span>{i18n.registerButton || (lang === 'fr' ? "S'inscrire" : 'Register')}</span>
                                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                              </button>

                              {/* Secondary View the Poster Button -> opens carousel modal */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPosterModal(event, 0);
                                }}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-widest rounded-full border border-[#FBFAF5]/25 hover:border-[#B48B44] text-[#FBFAF5]/90 hover:text-[#B48B44] bg-[#FBFAF5]/[0.03] hover:bg-[#B48B44]/10 transition-all duration-300 cursor-pointer"
                              >
                                <span>{i18n.viewPoster}</span>
                              </button>

                              {/* Tertiary Download the PDF Link */}
                              <a
                                href={currentBrochure.pdfUrl}
                                download={currentBrochure.pdfFileName}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B48B44] hover:text-[#FBFAF5] underline underline-offset-4 decoration-[#B48B44]/60 hover:decoration-[#FBFAF5] transition-colors py-1"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>{i18n.downloadPdf}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {filteredEvents.length === 0 && (
                <div className="py-16 text-center text-[#FBFAF5]/40 font-light italic tracking-wide">
                  {i18n.noEvents}
                </div>
              )}
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Interactive Poster & Content Carousel Modal */}
      {activeModalEvent &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-[#060E14]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
            onClick={closePosterModal}
            role="dialog"
            aria-modal="true"
            aria-label={activeModalEvent.title}
          >
            <div
              className="relative w-full max-w-6xl bg-gradient-to-b from-[#0F2231] to-[#0A1620] border border-[#B48B44]/40 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.75)] text-[#FBFAF5] overflow-hidden my-auto lg:h-[720px] max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[#FBFAF5]/10 bg-[#0A1620]/90 shrink-0">
                <div className="min-w-0">
                  <div className="text-[0.62rem] tracking-[0.28em] uppercase text-[#B48B44] font-mono">
                    {modalBrochure.eyebrow} · {modalBrochure.subEyebrow}
                  </div>
                  <h4 className="text-base sm:text-lg font-serif text-[#FBFAF5] truncate">
                    {activeModalEvent.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Brochure Language Toggle (EN / FR) */}
                  <div
                    className="inline-flex items-center rounded-full border border-[#FBFAF5]/15 bg-[#0C1B26] p-0.5 text-[0.65rem] font-mono uppercase"
                    aria-label="Brochure language"
                  >
                    <button
                      type="button"
                      onClick={() => setModalLangOverride('en')}
                      className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        modalBrochureLang === 'en'
                          ? 'bg-[#B48B44] text-[#0C1B26] font-semibold'
                          : 'text-[#FBFAF5]/60 hover:text-[#FBFAF5]'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalLangOverride('fr')}
                      className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                        modalBrochureLang === 'fr'
                          ? 'bg-[#B48B44] text-[#0C1B26] font-semibold'
                          : 'text-[#FBFAF5]/60 hover:text-[#FBFAF5]'
                      }`}
                    >
                      FR
                    </button>
                  </div>

                  {/* Download PDF button */}
                  <a
                    href={modalBrochure.pdfUrl}
                    download={modalBrochure.pdfFileName}
                    className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#FBFAF5]/20 hover:border-[#B48B44] text-[0.68rem] sm:text-xs uppercase tracking-wider text-[#FBFAF5]/90 hover:text-[#B48B44] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{i18n.downloadPdf}</span>
                    <span className="sm:hidden">PDF</span>
                  </a>

                  {/* Register CTA inside Header */}
                  <button
                    type="button"
                    onClick={() => handleRegister(activeModalEvent)}
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#B48B44] hover:bg-[#FBFAF5] text-[#0C1B26] text-[0.68rem] sm:text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shadow-sm"
                  >
                    <span>{i18n.registerButton}</span>
                    <span>→</span>
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closePosterModal}
                    className="w-8 h-8 rounded-full border border-[#FBFAF5]/20 hover:border-[#B48B44] text-[#FBFAF5]/70 hover:text-[#FBFAF5] flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={i18n.closeModal}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Split Left Poster Carousel + Right Readable Content (Fixed uniform dimensions) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
                {/* Left Column: Interactive 3-Slide Poster Visual Carousel */}
                <div
                  className="lg:col-span-6 lg:h-full bg-[#071018] p-4 sm:p-6 flex flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#FBFAF5]/10 select-none lg:overflow-hidden"
                  onTouchStart={handleModalTouchStart}
                  onTouchEnd={handleModalTouchEnd}
                >
                  {/* Main Poster Frame with Prev/Next Controls — locked aspect & height */}
                  <div className="relative w-full lg:flex-1 lg:min-h-0 flex items-center justify-center py-1">
                    {/* Prev Slide Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlideIndex(
                          (prev) => (prev - 1 + modalSlides.length) % modalSlides.length
                        )
                      }
                      className="absolute left-1 sm:left-2 z-10 w-10 h-10 rounded-full bg-[#0C1B26]/85 hover:bg-[#B48B44] text-[#FBFAF5] hover:text-[#0C1B26] border border-[#FBFAF5]/25 hover:border-[#B48B44] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Fixed-size Poster Viewport with stacked preloaded slides so dimensions never shift */}
                    <div className="relative h-[360px] sm:h-[460px] lg:h-[510px] aspect-[1080/1350] rounded-lg overflow-hidden border border-[#B48B44]/35 shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#2A0B12] shrink-0">
                      {modalSlides.map((slide, idx) => (
                        <img
                          key={slide.imageUrl}
                          src={slide.imageUrl}
                          alt={`${modalBrochure.eyebrow} — ${slide.pillar}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                            activeSlideIndex === idx
                              ? 'opacity-100 z-[2]'
                              : 'opacity-0 z-[1] pointer-events-none'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next Slide Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlideIndex((prev) => (prev + 1) % modalSlides.length)
                      }
                      className="absolute right-1 sm:right-2 z-10 w-10 h-10 rounded-full bg-[#0C1B26]/85 hover:bg-[#B48B44] text-[#FBFAF5] hover:text-[#0C1B26] border border-[#FBFAF5]/25 hover:border-[#B48B44] flex items-center justify-center transition-all cursor-pointer shadow-lg"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Poster Carousel Footer: Page Pills + Open Full PDF in New Tab */}
                  <div className="w-full pt-3 mt-2 border-t border-[#FBFAF5]/10 flex flex-wrap items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      {modalSlides.map((slide, idx) => (
                        <button
                          key={slide.page}
                          type="button"
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`px-2.5 sm:px-3 py-1 rounded-full text-[0.62rem] sm:text-[0.65rem] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                            activeSlideIndex === idx
                              ? 'bg-[#B48B44] text-[#0C1B26] font-semibold shadow-sm'
                              : 'bg-[#FBFAF5]/5 text-[#FBFAF5]/65 hover:bg-[#FBFAF5]/15 hover:text-[#FBFAF5]'
                          }`}
                        >
                          {slide.numeral} · {slide.pillar}
                        </button>
                      ))}
                    </div>

                    <a
                      href={modalBrochure.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[0.68rem] font-mono uppercase tracking-wider text-[#B48B44] hover:text-[#FBFAF5] transition-colors"
                    >
                      <span>{i18n.openPdf}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Synchronized Readable Content & Event Registration (Locked height) */}
                <div className="lg:col-span-6 lg:h-full p-5 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-[#0F2231] to-[#0B1822] lg:overflow-hidden">
                  {/* Pinned Top: Slide Selector Tabs */}
                  <div className="flex items-center border-b border-[#FBFAF5]/10 pb-3 mb-4 gap-2 overflow-x-auto shrink-0">
                    {modalSlides.map((slide, idx) => {
                      const isActive = activeSlideIndex === idx;
                      return (
                        <button
                          key={slide.page}
                          type="button"
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs uppercase tracking-widest font-mono transition-all cursor-pointer shrink-0 ${
                            isActive
                              ? 'bg-[#9D2933]/35 border border-[#B48B44] text-[#FBFAF5]'
                              : 'text-[#FBFAF5]/50 hover:text-[#FBFAF5] hover:bg-[#FBFAF5]/5 border border-transparent'
                          }`}
                        >
                          <span className="text-[#B48B44]">{slide.numeral}</span>
                          <span>{slide.pillar}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Fixed-Height Middle Content Region so switching slides never resizes the modal */}
                  <div className="h-[340px] sm:h-[360px] lg:h-auto lg:flex-1 min-h-0 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(180,139,68,0.35)_transparent]">
                    {currentSlide && (
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#B48B44]">
                            <span>
                              {i18n.pageLabel} {currentSlide.numeral} / 03
                            </span>
                            <span>—</span>
                            <span>{currentSlide.pillar}</span>
                          </div>
                          {currentSlide.kicker && (
                            <span className="text-[0.65rem] font-mono uppercase tracking-[0.22em] text-[#FBFAF5]/55">
                              {currentSlide.kicker}
                            </span>
                          )}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-serif text-[#FBFAF5] leading-tight">
                          {currentSlide.headline}
                        </h3>

                        {currentSlide.subhead && (
                          <div className="pl-3.5 border-l-2 border-[#B48B44] text-sm sm:text-base text-[#FBFAF5]/90 font-normal leading-snug">
                            {currentSlide.subhead}
                          </div>
                        )}

                        {currentSlide.quote && (
                          <blockquote className="pl-3.5 border-l-2 border-[#B48B44] text-base sm:text-lg font-serif italic text-[#B48B44] leading-snug">
                            {currentSlide.quote}
                          </blockquote>
                        )}

                        {currentSlide.body && (
                          <p className="text-sm sm:text-base text-[#FBFAF5]/80 font-light leading-relaxed">
                            {currentSlide.body}
                          </p>
                        )}

                        {/* Slide 2 Numbered Steps */}
                        {currentSlide.steps && (
                          <div className="space-y-2.5 pt-1">
                            {currentSlide.steps.map((step) => (
                              <div
                                key={step.number}
                                className="flex items-start gap-3.5 p-3 rounded-lg bg-[#0A1620]/70 border border-[#FBFAF5]/10"
                              >
                                <span className="text-xs font-mono font-semibold text-[#B48B44] mt-0.5">
                                  {step.number}
                                </span>
                                <p className="text-sm text-[#FBFAF5]/90 font-light leading-relaxed">
                                  {step.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Slide 3 Sections (Why Louis / In The Room / Who It's For) */}
                        {currentSlide.sections && (
                          <div className="space-y-2.5 pt-1">
                            {currentSlide.sections.map((sec) => (
                              <div
                                key={sec.label}
                                className="p-2.5 sm:p-3 rounded-lg bg-[#0A1620]/70 border border-[#FBFAF5]/10"
                              >
                                <div className="text-[0.62rem] font-mono uppercase tracking-[0.22em] text-[#B48B44] mb-0.5">
                                  {sec.label}
                                </div>
                                <p className="text-xs sm:text-sm text-[#FBFAF5]/85 font-light leading-relaxed">
                                  {sec.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pinned Bottom: Event Cohort Summary + Register & Download CTAs */}
                  <div className="pt-4 mt-4 border-t border-[#FBFAF5]/10 shrink-0 space-y-4">
                    <div className="p-3.5 rounded-xl bg-[#0A1620]/90 border border-[#B48B44]/25">
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <span className="block text-[0.58rem] font-mono uppercase tracking-widest text-[#FBFAF5]/45">
                            {i18n.whenLabel}
                          </span>
                          <span className="font-medium text-[#FBFAF5]">
                            {activeModalEvent.dateDisplay}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[0.58rem] font-mono uppercase tracking-widest text-[#FBFAF5]/45">
                            {i18n.whereLabel}
                          </span>
                          <span className="font-medium text-[#FBFAF5]">
                            {modalBrochure.venue}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[0.58rem] font-mono uppercase tracking-widest text-[#FBFAF5]/45">
                            {i18n.seatsLabel}
                          </span>
                          <span className="font-medium text-[#FBFAF5]">
                            {modalBrochure.seatsDetail}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleRegister(activeModalEvent)}
                        className="group/btn inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#B48B44] hover:bg-[#FBFAF5] text-[#0C1B26] text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer shadow-lg"
                      >
                        <span>{i18n.registerForEvent}</span>
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                          →
                        </span>
                      </button>

                      <a
                        href={modalBrochure.pdfUrl}
                        download={modalBrochure.pdfFileName}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#FBFAF5]/25 hover:border-[#B48B44] text-xs uppercase tracking-widest text-[#FBFAF5]/90 hover:text-[#B48B44] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{i18n.downloadPdf}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
