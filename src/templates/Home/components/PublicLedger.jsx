import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
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

  // Text & UI content always stays consistent with the website's active language (EN or FR)
  const siteBrochureText = lang === 'fr' ? forumBrochureFr : forumBrochure;

  // PDF file & poster images are strictly tied to the cohort:
  // English Cohort -> English PDF on both EN & FR site
  // French Cohort -> French PDF on both EN & FR site
  const getCohortPdfBrochure = (event) => {
    if (!event) return siteBrochureText;
    const isFrenchCohort = event.cohortLang === 'fr' || event.id === 3;
    return isFrenchCohort ? forumBrochureFr : forumBrochure;
  };

  // Modal state for viewing the 3-page poster carousel & readable content
  const [activeModalEventId, setActiveModalEventId] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const touchStartX = useRef(null);

  const activeModalEvent =
    activeModalEventId !== null
      ? currentEvents.find((e) => e.id === activeModalEventId) || null
      : null;

  const modalPdfBrochure = getCohortPdfBrochure(activeModalEvent);
  const modalImageSlides = modalPdfBrochure.slides || [];

  const openPosterModal = (event, initialSlide = 0) => {
    setActiveModalEventId(event.id);
    setActiveSlideIndex(initialSlide);
  };

  const closePosterModal = () => {
    setActiveModalEventId(null);
  };

  const handleRegister = (event) => {
    if (activeModalEventId !== null) {
      setActiveModalEventId(null);
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
        setActiveSlideIndex((prev) => (prev + 1) % modalImageSlides.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => (prev - 1 + modalImageSlides.length) % modalImageSlides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalEvent, modalImageSlides.length]);

  const handleModalTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleModalTouchEnd = (e) => {
    if (touchStartX.current === null || !e.changedTouches || e.changedTouches.length === 0) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      setActiveSlideIndex((prev) => (prev + 1) % modalImageSlides.length);
    } else if (diff < -40) {
      setActiveSlideIndex((prev) => (prev - 1 + modalImageSlides.length) % modalImageSlides.length);
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
                  // Cohort-specific PDF & Poster (English PDF for English Cohort, French PDF for French Cohort)
                  const eventPdfBrochure = getCohortPdfBrochure(event);

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
                        {/* Top Date & Location Row + Website-Consistent Action Buttons */}
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 gap-3">
                          <div className="text-sm tracking-widest text-[#B48B44] uppercase relative flex items-center">
                            {/* Circular Hollow Node Marker on Timeline */}
                            <div
                              className="absolute -left-[26px] sm:-left-[30px] top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0C1B26] border-2 border-[#9D2933] shadow-[0_0_8px_rgba(157,41,51,0.4)] group-hover:border-[#B48B44] group-hover:shadow-[0_0_12px_rgba(180,139,68,0.7)] group-hover:scale-125 transition-all duration-300 pointer-events-none"
                              aria-hidden="true"
                            />
                            <span>
                              {event.dateDisplay ||
                                `${monthNames[event.date.getMonth()].substring(0, 3)} ${event.date.getDate()}`}{' '}
                              — {event.city}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="text-xs uppercase tracking-widest border border-[#FBFAF5]/20 px-3 py-1 group-hover:border-[#B48B44] transition-colors duration-500 inline-block w-max rounded-sm text-[#FBFAF5]/80">
                              {event.type}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRegister(event);
                              }}
                              className="group/btn inline-flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-widest bg-[#B48B44] hover:bg-[#FBFAF5] text-[#0C1B26] font-medium rounded-sm transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
                              aria-label={`${i18n.registerButton || 'Register'} — ${event.title}`}
                            >
                              <span>{i18n.registerButton || (lang === 'fr' ? "S'inscrire" : 'Register')}</span>
                              <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                            </button>
                          </div>
                        </div>

                        {/* Event Body: Cohort Poster Thumbnail + Website Event Text & Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                          {/* Poster Thumbnail Preview (Matches Cohort Language: EN PDF for English Cohort, FR PDF for French Cohort) */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPosterModal(event, 0);
                            }}
                            className="group/thumb relative w-36 sm:w-32 md:w-36 aspect-[1080/1350] rounded-sm overflow-hidden border border-[#B48B44]/35 group-hover:border-[#B48B44] shadow-[0_14px_34px_rgba(0,0,0,0.5)] shrink-0 bg-[#18070B] text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B48B44]"
                            aria-label={`${i18n.viewPoster} — ${event.title}`}
                          >
                            <img
                              src={eventPdfBrochure.thumbnailUrl}
                              alt={`${event.title} — ${i18n.viewPoster}`}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 group-hover/thumb:opacity-75 transition-opacity duration-300" />

                            <span className="absolute bottom-2 left-2 right-2 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#0C1B26]/90 group-hover/thumb:bg-[#B48B44] text-[#FBFAF5] group-hover/thumb:text-[#0C1B26] border border-[#FBFAF5]/25 group-hover/thumb:border-[#B48B44] text-[0.6rem] font-medium tracking-widest uppercase transition-all duration-300 shadow-md">
                              <FileText className="w-3 h-3 shrink-0" />
                              <span>{i18n.viewPoster}</span>
                            </span>
                          </button>

                          {/* Event Copy & Actions (Matches Website Language & Button Styling) */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-2xl md:text-3xl font-serif mb-2 text-[#FBFAF5] group-hover:text-[#B48B44] transition-colors duration-500">
                              {event.title}
                            </h3>
                            <p className="text-base font-light text-[#FBFAF5]/70 leading-relaxed mb-3">
                              {event.summary}
                            </p>
                            <p className="text-sm md:text-base font-light text-[#FBFAF5]/85 leading-relaxed mb-5">
                              {event.description}
                            </p>

                            {/* Action Buttons Consistent with Website Design (rounded-sm, uppercase tracking-widest) */}
                            <div className="pt-4 border-t border-[#FBFAF5]/10 flex flex-wrap items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openPosterModal(event, 0);
                                }}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-widest border border-[#FBFAF5]/25 hover:border-[#B48B44] text-[#FBFAF5]/90 hover:text-[#B48B44] rounded-sm transition-all duration-300 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>{i18n.viewPoster}</span>
                              </button>

                              <a
                                href={eventPdfBrochure.pdfUrl}
                                download={eventPdfBrochure.pdfFileName}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs uppercase tracking-widest border border-[#FBFAF5]/25 hover:border-[#B48B44] text-[#B48B44] hover:text-[#FBFAF5] rounded-sm transition-all duration-300"
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

      {/* Interactive Poster Carousel Modal — Clean Image View + Top Buttons + Side Arrows Only */}
      {activeModalEvent &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-[#060E14]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={closePosterModal}
            role="dialog"
            aria-modal="true"
            aria-label={activeModalEvent.title}
          >
            <div
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#0F2231] to-[#0A1620] border border-[#B48B44]/40 rounded-sm shadow-[0_30px_90px_rgba(0,0,0,0.8)] text-[#FBFAF5] overflow-hidden flex flex-col max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header Bar: Title + Download PDF + Register + Close */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#FBFAF5]/10 bg-[#0A1620]/95 shrink-0">
                <h4 className="text-sm sm:text-base md:text-lg font-serif text-[#FBFAF5] truncate max-w-full sm:max-w-[45%]">
                  {activeModalEvent.title}
                </h4>

                <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
                  {/* Download PDF button (English PDF for English Cohort, French PDF for French Cohort) */}
                  <a
                    href={modalPdfBrochure.pdfUrl}
                    download={modalPdfBrochure.pdfFileName}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#FBFAF5]/25 hover:border-[#B48B44] text-[0.68rem] sm:text-xs uppercase tracking-widest text-[#FBFAF5]/90 hover:text-[#B48B44] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>{i18n.downloadPdf}</span>
                  </a>

                  {/* Register CTA inside Header */}
                  <button
                    type="button"
                    onClick={() => handleRegister(activeModalEvent)}
                    className="group/btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#B48B44] hover:bg-[#FBFAF5] text-[#0C1B26] text-[0.68rem] sm:text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer shadow-sm"
                  >
                    <span>{i18n.registerButton}</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
                  </button>

                  {/* Close Button */}
                  <button
                    type="button"
                    onClick={closePosterModal}
                    className="w-8 h-8 rounded-sm border border-[#FBFAF5]/20 hover:border-[#B48B44] text-[#FBFAF5]/70 hover:text-[#FBFAF5] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    aria-label={i18n.closeModal}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Poster View with Sideways Navigation Buttons Only */}
              <div
                className="relative bg-[#071018] p-3 sm:p-6 flex items-center justify-center select-none flex-1 min-h-0"
                onTouchStart={handleModalTouchStart}
                onTouchEnd={handleModalTouchEnd}
              >
                {/* Left Sideways Button */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIndex(
                      (prev) => (prev - 1 + modalImageSlides.length) % modalImageSlides.length
                    )
                  }
                  className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0C1B26]/90 hover:bg-[#B48B44] text-[#FBFAF5] hover:text-[#0C1B26] border border-[#FBFAF5]/30 hover:border-[#B48B44] flex items-center justify-center transition-all cursor-pointer shadow-xl"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Fixed-Size Poster Image Frame (All 3 pages preloaded & stacked so size never changes) */}
                <div className="relative w-full max-w-[520px] max-h-[78vh] aspect-[1080/1350] rounded-sm overflow-hidden border border-[#B48B44]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-[#2A0B12] mx-auto">
                  {modalImageSlides.map((slide, idx) => (
                    <img
                      key={slide.imageUrl}
                      src={slide.imageUrl}
                      alt={`${activeModalEvent.title} — ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        activeSlideIndex === idx
                          ? 'opacity-100 z-[2]'
                          : 'opacity-0 z-[1] pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

                {/* Right Sideways Button */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIndex((prev) => (prev + 1) % modalImageSlides.length)
                  }
                  className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0C1B26]/90 hover:bg-[#B48B44] text-[#FBFAF5] hover:text-[#0C1B26] border border-[#FBFAF5]/30 hover:border-[#B48B44] flex items-center justify-center transition-all cursor-pointer shadow-xl"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
