import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Check, CheckCircle2, ChevronDown, Mail } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { contactDetails, events } from '../../../data/content';
import { inquiryFr, eventsFr } from '../../../data/contentFr';

const DEFAULT_OPTIONS_EN = [
  'Executive Coaching',
  'Leadership Workshops',
  'Keynotes & Forums',
  'Other',
];

const EMPTY = {
  name: '',
  organization: '',
  email: '',
  phone: '',
  requestType: '',
  mandateText: '',
};

export default function ConfidentialInquiry({ lang = 'en', prefill = null }) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const formLoadTime = useRef(0);
  const hasInteracted = useRef(false);

  useEffect(() => {
    formLoadTime.current = Date.now();
  }, []);

  const markInteraction = () => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
    }
  };

  // Render-phase synchronization for prefill (recommended React pattern)
  const [prevPrefill, setPrevPrefill] = useState(prefill);
  if (prefill !== prevPrefill) {
    setPrevPrefill(prefill);
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        requestType: prefill.requestType || prev.requestType,
        mandateText: prefill.mandateText !== undefined ? prefill.mandateText : prev.mandateText,
      }));
      setSubmitted(false);
    }
  }

  useEffect(() => {
    if (prefill) {
      hasInteracted.current = true;
    }
  }, [prefill]);

  // Render-phase synchronization for language toggles
  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) {
    setPrevLang(lang);
    if (prefill?.eventId) {
      const isFr = lang === 'fr';
      const evList = isFr ? eventsFr : events;
      const ev = evList.find((e) => e.id === prefill.eventId);
      if (ev) {
        const newReqType = isFr ? 'Conférences et forums' : 'Keynotes & Forums';
        const newMsg = isFr
          ? (ev.title.toLowerCase().startsWith('forum')
              ? `Je souhaite m'inscrire au ${ev.title}.`
              : `Je souhaite m'inscrire à l'événement : ${ev.title}.`)
          : `I would like to register for ${ev.title}.`;

        const enTitle = events.find((e) => e.id === prefill.eventId)?.title || '';
        const frTitle = eventsFr.find((e) => e.id === prefill.eventId)?.title || '';
        const enMsg = `I would like to register for ${enTitle}.`;
        const frMsg = frTitle.toLowerCase().startsWith('forum')
          ? `Je souhaite m'inscrire au ${frTitle}.`
          : `Je souhaite m'inscrire à l'événement : ${frTitle}.`;

        setFormData((prev) => {
          const isUntouched =
            !prev.mandateText || prev.mandateText === enMsg || prev.mandateText === frMsg;
          return {
            ...prev,
            requestType: newReqType,
            mandateText: isUntouched ? newMsg : prev.mandateText,
          };
        });
      }
    } else {
      setFormData((prev) => {
        if (!prev.requestType) return prev;
        const isFr = lang === 'fr';
        if (isFr) {
          if (prev.requestType === 'Keynotes & Forums') return { ...prev, requestType: 'Conférences et forums' };
          if (prev.requestType === 'Leadership Workshops') return { ...prev, requestType: 'Ateliers de leadership' };
          if (prev.requestType === 'Executive Coaching') return { ...prev, requestType: 'Coaching exécutif' };
          if (prev.requestType === 'Other') return { ...prev, requestType: 'Autre' };
        } else {
          if (prev.requestType === 'Conférences et forums') return { ...prev, requestType: 'Keynotes & Forums' };
          if (prev.requestType === 'Ateliers de leadership') return { ...prev, requestType: 'Leadership Workshops' };
          if (prev.requestType === 'Coaching exécutif') return { ...prev, requestType: 'Executive Coaching' };
          if (prev.requestType === 'Autre') return { ...prev, requestType: 'Other' };
        }
        return prev;
      });
    }
  }

  const i18n = lang === 'fr'
    ? inquiryFr
    : {
        titleLine1: 'Direct',
        titleLine2: 'Correspondence',
        description:
          'Inquiries regarding executive advisory, crisis counsel, or organisational facilitation. All communications are reviewed directly by former Ambassador Louis Dumas.',
        linkedinLabel: 'LinkedIn Profile',
        requestOptions: DEFAULT_OPTIONS_EN,
        labels: {
          fullName: 'Full Name *',
          organization: 'Organisation / Title',
          email: 'Email Address *',
          phone: 'Phone Number (Optional)',
          requestType: 'Type of Request *',
          selectRequestType: 'Select Type of Request *',
          details: 'Brief Details or Context *',
          submitButton: 'Submit',
          receivedTitle: 'Sent',
          receivedMessage: (name) => `Thank you, ${name}.`,
          sendAnother: 'Send another message →',
        },
      };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    markInteraction();
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.requestType || !formData.mandateText?.trim()) return;
    setIsSubmitting(true);
    try {
      await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          company_website: honeypot,
          elapsed_ms: formLoadTime.current ? Date.now() - formLoadTime.current : 0,
          has_interaction: hasInteracted.current,
        }),
      });
    } catch (err) {
      console.warn('Form submission note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section
      id="inquiry"
      className="bg-[#FBFAF5] text-[#343434] py-32 px-6 md:px-16 border-t border-[#343434]/10"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Left Column: Direct Correspondence & Text Links */}
          <FadeInSection className="md:w-1/3 space-y-6">
            <h2 className="text-3xl font-serif leading-snug text-[#165E83]">
              {i18n.titleLine1}
              <br />
              {i18n.titleLine2}
            </h2>
            <p className="text-sm font-light text-[#343434]/70 leading-relaxed font-sans">
              {i18n.description}
            </p>

            {/* Direct Contact Links */}
            <div className="pt-6 border-t border-[#343434]/10 space-y-3 font-sans">
              {/* Email Text Link */}
              <a
                href={`mailto:${contactDetails.email}`}
                className="group flex items-center gap-2.5 text-sm text-[#165E83] hover:text-[#9D2933] transition-colors duration-300 w-max"
              >
                <Mail className="w-4 h-4 text-[#B48B44] group-hover:scale-110 transition-transform" />
                <span className="group-hover:translate-x-1 transition-transform">
                  {contactDetails.email}
                </span>
              </a>

              {/* LinkedIn Text Link */}
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-[#165E83] hover:text-[#9D2933] transition-colors duration-300 w-max"
              >
                <svg
                  className="w-4 h-4 fill-current text-[#B48B44] group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform">
                  {i18n.linkedinLabel}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </FadeInSection>

          {/* Right Column: Inquiry Form */}
          <FadeInSection delay="delay-200" className="md:w-2/3">
            {submitted ? (
              <div className="bg-[#165E83]/5 border border-[#165E83]/20 p-8 rounded-sm text-left space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 text-[#165E83]">
                  <CheckCircle2 className="w-6 h-6 text-[#B48B44]" />
                  <h3 className="font-serif text-2xl">{i18n.labels.receivedTitle}</h3>
                </div>
                <p className="text-sm text-[#343434]/80 leading-relaxed font-sans">
                  {i18n.labels.receivedMessage(formData.name)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(EMPTY);
                    setHoneypot('');
                    formLoadTime.current = Date.now();
                    hasInteracted.current = false;
                  }}
                  className="mt-4 text-xs font-sans uppercase tracking-widest text-[#9D2933] hover:text-[#165E83] transition-colors cursor-pointer"
                >
                  {i18n.labels.sendAnother}
                </button>
              </div>
            ) : (
              <form
                action={`mailto:${contactDetails.email}`}
                method="POST"
                encType="text/plain"
                onSubmit={handleSubmit}
                onMouseMove={markInteraction}
                onKeyDown={markInteraction}
                onTouchStart={markInteraction}
                onFocus={markInteraction}
                className="space-y-8 font-sans"
              >
                {/* Invisible honeypot field for machine detection */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    width: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <label htmlFor="t1-company_website">Website</label>
                  <input
                    type="text"
                    id="t1-company_website"
                    name="company_website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      id="t1-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#343434]/20 py-3 text-[#343434] placeholder-transparent peer focus:outline-none focus:border-[#9D2933] transition-colors font-sans"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="t1-name"
                      className="absolute left-0 -top-3.5 text-xs text-[#165E83] tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#343434]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9D2933] font-sans"
                    >
                      {i18n.labels.fullName}
                    </label>
                  </div>
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      id="t1-organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#343434]/20 py-3 text-[#343434] placeholder-transparent peer focus:outline-none focus:border-[#9D2933] transition-colors font-sans"
                      placeholder="Organisation"
                    />
                    <label
                      htmlFor="t1-organization"
                      className="absolute left-0 -top-3.5 text-xs text-[#165E83] tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#343434]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9D2933] font-sans"
                    >
                      {i18n.labels.organization}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  <div className="relative flex-grow">
                    <input
                      type="email"
                      id="t1-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-[#343434]/20 py-3 text-[#343434] placeholder-transparent peer focus:outline-none focus:border-[#9D2933] transition-colors font-sans"
                      placeholder="Email"
                    />
                    <label
                      htmlFor="t1-email"
                      className="absolute left-0 -top-3.5 text-xs text-[#165E83] tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#343434]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9D2933] font-sans"
                    >
                      {i18n.labels.email}
                    </label>
                  </div>
                  <div className="relative flex-grow">
                    <input
                      type="tel"
                      id="t1-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#343434]/20 py-3 text-[#343434] placeholder-transparent peer focus:outline-none focus:border-[#9D2933] transition-colors font-sans"
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="t1-phone"
                      className="absolute left-0 -top-3.5 text-xs text-[#165E83] tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#343434]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9D2933] font-sans"
                    >
                      {i18n.labels.phone}
                    </label>
                  </div>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label
                    htmlFor="t1-requestType"
                    className="block text-xs text-[#343434]/50 tracking-widest uppercase mb-1 font-sans"
                  >
                    {i18n.labels.requestType}
                  </label>
                  <button
                    id="t1-requestType"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full bg-transparent border-b border-[#343434]/20 py-2.5 flex items-center justify-between text-left focus:outline-none focus:border-[#9D2933] transition-colors cursor-pointer font-sans text-base"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className={formData.requestType ? 'text-[#343434]' : 'text-[#343434]/40'}>
                      {formData.requestType || i18n.labels.selectRequestType}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#343434]/40 transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180 text-[#9D2933]' : ''
                      }`}
                    />
                  </button>
                  <input type="hidden" name="requestType" value={formData.requestType} required />

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-[#FBFAF5] border border-[#343434]/15 shadow-xl z-50 py-1 font-sans">
                      {i18n.requestOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, requestType: opt }));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm font-sans transition-colors cursor-pointer flex items-center justify-between ${
                            formData.requestType === opt
                              ? 'bg-[#165E83]/10 text-[#165E83] font-medium'
                              : 'text-[#343434] hover:bg-[#343434]/5'
                          }`}
                        >
                          <span>{opt}</span>
                          {formData.requestType === opt && <Check className="w-4 h-4 text-[#165E83]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative mt-6">
                  <textarea
                    id="t1-mandate_text"
                    name="mandateText"
                    rows="3"
                    value={formData.mandateText}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[#343434]/20 py-3 text-[#343434] placeholder-transparent peer focus:outline-none focus:border-[#9D2933] transition-colors resize-none font-sans"
                    placeholder="Brief Details or Context"
                  />
                  <label
                    htmlFor="t1-mandate_text"
                    className="absolute left-0 -top-3.5 text-xs text-[#165E83] tracking-widest uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#343434]/40 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-[#9D2933] font-sans"
                  >
                    {i18n.labels.details}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center justify-center gap-4 border border-[#165E83] text-[#165E83] bg-transparent hover:bg-[#165E83] hover:text-[#FBFAF5] px-8 py-4 text-xs font-sans tracking-widest uppercase transition-all duration-500 w-full md:w-auto rounded-none cursor-pointer font-medium disabled:opacity-50"
                >
                  {isSubmitting
                    ? (lang === 'fr' ? 'Transmission en cours...' : 'Sending...')
                    : i18n.labels.submitButton}
                </button>
              </form>
            )}
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
