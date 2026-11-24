import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Lock, EyeOff, FileText, Check } from 'lucide-react';
import { brand, contactDetails } from '../../data/content';

export default function PrivacyProtocol() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-privacy-modal', handleOpen);
    return () => window.removeEventListener('open-privacy-modal', handleOpen);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>

      {/* Full Privacy & Confidentiality Protocol Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0C1B26] text-[#FBFAF5] border border-[#B48B44]/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#FBFAF5]/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B48B44]/15 border border-[#B48B44]/40 flex items-center justify-center text-[#B48B44]">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-[#B48B44] font-medium">
                    {brand.name}
                  </span>
                  <h2
                    id="privacy-modal-title"
                    className="font-serif text-2xl sm:text-3xl text-[#FBFAF5]"
                  >
                    Privacy &amp; Security Protocol
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-[#FBFAF5]/5 hover:bg-[#FBFAF5]/10 flex items-center justify-center text-[#FBFAF5]/70 hover:text-[#FBFAF5] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocol Content */}
            <div className="py-6 space-y-6 text-sm text-[#FBFAF5]/85 leading-relaxed font-light">
              <div className="rounded-xl bg-[#FBFAF5]/5 border border-[#FBFAF5]/10 p-4">
                <p className="text-xs text-[#B48B44] uppercase tracking-wider font-medium mb-1">
                  Sovereign Discretion Statement
                </p>
                <p>
                  As former Canadian Ambassador and executive advisor, Louis Dumas operates under the highest institutional standards of discretion. All interactions, correspondence, and client data are treated in accordance with diplomatic confidentiality and the Chatham House Rule.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg text-[#FBFAF5] flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-[#B48B44]" />
                  1. Zero Third-Party Tracking
                </h3>
                <p>
                  This website does not employ commercial advertising networks, cross-site trackers, or data-broker pixels. We do not monetize, sell, or disclose visitor metadata under any circumstances.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg text-[#FBFAF5] flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#B48B44]" />
                  2. Transmission &amp; Inquiry Confidentiality
                </h3>
                <p>
                  Information submitted through the confidential inquiry form is encrypted in transit and reviewed strictly by former Ambassador Louis Dumas. Inquiries are stored in access-controlled environments in compliance with Canada&apos;s <em>Personal Information Protection and Electronic Documents Act (PIPEDA)</em>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg text-[#FBFAF5] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B48B44]" />
                  3. Cross-Site Security &amp; Safe Embedding
                </h3>
                <p>
                  This site adheres to modern security standards, including Content Security Policy directives, strict Referrer Policies, and disabled intrusive device permissions (camera, microphone, geolocation), ensuring it can be safely reviewed or embedded across verified platforms without cross-origin risk.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg text-[#FBFAF5] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#B48B44]" />
                  4. Data Rights &amp; Verification
                </h3>
                <p>
                  Leaders may request verification, correction, or permanent deletion of their correspondence at any time by directing an inquiry to{' '}
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="text-[#B48B44] hover:underline"
                  >
                    {contactDetails.email}
                  </a>.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-[#FBFAF5]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-[0.7rem] text-[#FBFAF5]/50">
                Effective: October 2026 · Sovereign Discretion Maintained
              </span>
              <button
                type="button"
                onClick={() => {
                  handleAcknowledge();
                  setIsOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B48B44] hover:bg-[#C9A45C] text-[#0C1B26] font-medium text-xs px-6 py-2.5 transition-all shadow-md"
              >
                <Check className="w-4 h-4" />
                Close &amp; Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
