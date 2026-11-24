import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Check, CheckCircle2, ChevronDown, Mail } from 'lucide-react';
import FadeInSection from '../../../components/common/FadeInSection';
import { contactDetails } from '../../../data/content';

const REQUEST_OPTIONS = [
  'Executive Coaching',
  'Leadership Workshops',
  'Keynotes & Forums',
  'Other',
];

const EMPTY = {
  name: '',
  organization: '',
  email: '',
  requestType: '',
  message: '',
};

export default function Inquiry({ isDark }) {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.requestType) return;
    setSubmitted(true);
  };

  const inputClass = `w-full rounded-xl px-4 py-3 text-sm text-[#FBFAF5] placeholder-[#FBFAF5]/35 focus:outline-none transition font-sans ${
    isDark
      ? 'bg-black/35 border border-[#C58A38]/35 focus:border-[#C58A38] focus:ring-2 focus:ring-[#C58A38]/25'
      : 'bg-black/25 border border-[#C9A45C]/40 focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/25'
  }`;

  const labelClass = `block text-[0.68rem] tracking-[0.18em] uppercase mb-2 font-sans font-medium ${
    isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
  }`;

  return (
    <section
      id="inquiry"
      className={`relative py-24 md:py-32 px-6 md:px-16 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-[#07121A] text-[#FBFAF5]' : 'bg-[#FBFAF5] text-[#343434]'
      }`}
    >
      {/* Subtle depth lighting (dark theme) */}
      {isDark && (
        <>
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_20%,rgba(197,138,56,0.14),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(0,0,0,0.35),transparent_60%)] pointer-events-none" />
        </>
      )}

      <FadeInSection
        className={`relative max-w-6xl mx-auto rounded-[2.5rem] p-8 md:p-14 transition-colors ${
          isDark
            ? 'bg-[#09151F] text-[#FBFAF5] border border-[#C58A38]/30 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]'
            : 'bg-[#6E1F2D] text-[#FBFAF5] border border-[#C9A45C]/30 shadow-[0_30px_70px_-30px_rgba(74,18,28,0.6)]'
        }`}
      >
        <div className="grid lg:grid-cols-12 gap-12 items-start font-sans">
          {/* Left Column: Direct Correspondence Brief */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif uppercase text-4xl md:text-5xl text-[#FBFAF5] leading-[1.02]">
              Direct
              <br />
              Correspondence
            </h2>

            <p className="text-[#FBFAF5]/80 font-light leading-relaxed">
              Direct liaison for board members, heads of mission, and enterprise chief executives. All
              communications are reviewed directly by former Ambassador Louis Dumas.
            </p>

            {/* Direct Contact Links as pure text with hover animation (replacing Ottawa & Geneva) */}
            <div
              className={`pt-6 border-t space-y-3 font-sans ${
                isDark ? 'border-[#C58A38]/25' : 'border-[#C9A45C]/25'
              }`}
            >
              {/* Email Text Link */}
              <a
                href={`mailto:${contactDetails.email}`}
                className={`group flex items-center gap-2.5 text-sm transition-colors duration-300 w-max ${
                  isDark
                    ? 'text-[#FBFAF5]/90 hover:text-[#C58A38]'
                    : 'text-[#FBFAF5]/90 hover:text-[#C9A45C]'
                }`}
              >
                <Mail
                  className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                    isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
                  }`}
                />
                <span className="group-hover:translate-x-1 transition-transform">
                  {contactDetails.email}
                </span>
              </a>

              {/* LinkedIn Text Link */}
              <a
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-2.5 text-sm transition-colors duration-300 w-max ${
                  isDark
                    ? 'text-[#FBFAF5]/90 hover:text-[#C58A38]'
                    : 'text-[#FBFAF5]/90 hover:text-[#C9A45C]'
                }`}
              >
                <svg
                  className={`w-4 h-4 fill-current group-hover:scale-110 transition-transform ${
                    isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform">
                  LinkedIn Profile
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div
                className={`h-full rounded-3xl p-8 flex flex-col justify-center space-y-4 border ${
                  isDark
                    ? 'bg-black/40 border-[#C58A38]/30'
                    : 'bg-black/30 border-[#C9A45C]/30'
                }`}
              >
                <div className={`flex items-center gap-3 ${isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'}`}>
                  <CheckCircle2 className="w-6 h-6" />
                  <h3 className="font-serif text-2xl text-[#FBFAF5]">Transmission Recorded</h3>
                </div>
                <p className="text-sm text-[#FBFAF5]/80 font-light leading-relaxed">
                  Your mandate advisory request has been dispatched. Former Ambassador Louis Dumas
                  will review your inquiry in accordance with diplomatic protocol.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm(EMPTY);
                  }}
                  className={`self-start text-xs uppercase tracking-widest hover:underline cursor-pointer pt-2 font-medium ${
                    isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
                  }`}
                >
                  Transmit new inquiry →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="t3-name" className={labelClass}>Full Name *</label>
                    <input
                      id="t3-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      className={inputClass}
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="t3-org" className={labelClass}>Organisation / Title *</label>
                    <input
                      id="t3-org"
                      type="text"
                      required
                      value={form.organization}
                      onChange={update('organization')}
                      className={inputClass}
                      placeholder="Company / Institution"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="t3-email" className={labelClass}>Email Address *</label>
                  <input
                    id="t3-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={inputClass}
                    placeholder="principal@organisation.com"
                  />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label htmlFor="t3-type" className={labelClass}>Type of Request *</label>
                  <button
                    id="t3-type"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`${inputClass} cursor-pointer font-sans flex items-center justify-between text-left`}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span className={form.requestType ? 'text-[#FBFAF5]' : 'text-[#FBFAF5]/40'}>
                      {form.requestType || 'Select Type of Request...'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'
                      } ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <input type="hidden" name="requestType" value={form.requestType} required />

                  {isDropdownOpen && (
                    <div
                      className={`absolute top-full left-0 right-0 mt-2 border shadow-2xl rounded-xl z-50 py-1.5 font-sans overflow-hidden backdrop-blur-md ${
                        isDark ? 'bg-[#09151F] border-[#C58A38]/30' : 'bg-[#4A121C] border-[#C9A45C]/35'
                      }`}
                    >
                      {REQUEST_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({ ...prev, requestType: opt }));
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-sans transition-colors cursor-pointer flex items-center justify-between ${
                            form.requestType === opt
                              ? isDark
                                ? 'bg-[#C58A38]/20 text-[#C58A38] font-medium'
                                : 'bg-[#C9A45C]/20 text-[#C9A45C] font-medium'
                              : isDark
                              ? 'text-[#FBFAF5] hover:bg-[#FBFAF5]/10'
                              : 'text-[#FBFAF5] hover:bg-black/30'
                          }`}
                        >
                          <span>{opt}</span>
                          {form.requestType === opt && (
                            <Check className={`w-3.5 h-3.5 ${isDark ? 'text-[#C58A38]' : 'text-[#C9A45C]'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="t3-message" className={labelClass}>Brief Details or Context</label>
                  <textarea
                    id="t3-message"
                    rows={3}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputClass} resize-none`}
                    placeholder="Brief summary of your requirements, timing, or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-full py-4 text-xs md:text-sm font-sans font-medium uppercase tracking-widest transition-all cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-r from-[#C88A36] to-[#B37424] text-white shadow-[0_0_24px_rgba(197,138,56,0.45)] hover:brightness-110 hover:-translate-y-0.5'
                      : 'bg-[#C9A45C] text-[#4A121C] shadow-[0_12px_28px_-12px_rgba(201,164,92,0.8)] hover:bg-[#D9B56E] hover:-translate-y-0.5'
                  }`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
