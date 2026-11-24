import React, { useEffect, useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LeadTitleSection from './components/LeadTitleSection';
import MandateSection from './components/MandateSection';
import InstitutionalTrustSection from './components/InstitutionalTrustSection';
import SovereignTriptych from './components/SovereignTriptych';
import ServicesEngagement from './components/ServicesEngagement';
import PublicLedger from './components/PublicLedger';
import ConfidentialInquiry from './components/ConfidentialInquiry';
import Footer from './components/Footer';

/**
 * Smooth programmatic scrolling helper with customizable duration and cubic easing.
 * Temporarily bypasses CSS smooth-scroll to guarantee precise, silky, frame-by-frame JS interpolation.
 */
function smoothScrollTo(targetY, duration = 1800) {
  if (typeof window === 'undefined') return;
  const htmlEl = document.documentElement;
  const originalScrollBehavior = htmlEl.style.scrollBehavior;
  htmlEl.style.scrollBehavior = 'auto';

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    htmlEl.style.scrollBehavior = originalScrollBehavior;
    return;
  }

  const startTime = performance.now();

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      htmlEl.style.scrollBehavior = originalScrollBehavior;
    }
  };

  requestAnimationFrame(step);
}

/**
 * Template 1: Sovereign Diplomatic
 * Features high-contrast deep navy & ivory parchment tones,
 * scroll-fade isolated hero typography with silent spoken cadence,
 * split lead-title section with slow parallax transition scroll,
 * unified full-page expansion, and bilingual Canadian English & French support.
 */
export default function Home() {
  const [hasPeeked, setHasPeeked] = useState(false);
  const [peekAnimationDone, setPeekAnimationDone] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissingPeek, setIsDismissingPeek] = useState(false);
  const [isPeekDismissed, setIsPeekDismissed] = useState(false);
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ld_lang') || 'en';
    }
    return 'en';
  });

  const handleSetLang = (newLang) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ld_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Expand full page if visitor manually scrolls down past hero threshold
  useEffect(() => {
    const handleScroll = () => {
      if (!isExpanded && window.scrollY > window.innerHeight * 0.7) {
        setIsExpanded(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Active section scroll-spy: updates window.history hash as visitor scrolls through sections (#events, #services, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sectionIds = ['mandate', 'institutional-trust', 'services', 'events', 'inquiry'];
    let currentHash = window.location.hash;

    const handleScrollSpy = () => {
      // If at top of the page (hero), clear section hash if set
      if (window.scrollY < window.innerHeight * 0.4) {
        if (currentHash && currentHash !== '' && currentHash !== '#top') {
          currentHash = '';
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        return;
      }

      // If at the very bottom of the page, active section is inquiry
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        if (currentHash !== '#inquiry') {
          currentHash = '#inquiry';
          window.history.replaceState(null, '', '#inquiry');
        }
        return;
      }

      // Find section in primary focus (35% down viewport)
      const focusY = window.innerHeight * 0.35;
      let matchedId = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focusY && rect.bottom >= focusY) {
            matchedId = id;
            break;
          }
        }
      }

      if (matchedId && currentHash !== `#${matchedId}`) {
        currentHash = `#${matchedId}`;
        window.history.replaceState(null, '', `#${matchedId}`);
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Stage 1 Entrance Cadence & Parallax Transition Scroll:
  // "What's": 0.50s – 0.80s (0.30s)
  // "important": 0.80s – 1.30s (0.50s)
  // Pause: 1.30s – 2.10s (0.80s)
  // "to": 2.10s – 2.35s (0.25s)
  // "you?": 2.35s – 2.75s (0.40s)
  // Waiting time post-"you?" is 1.00s (firing at 3.75s / 3750ms).
  // On mobile (Pixel 8 / Samsung S25 Ultra), lands at ~29.5% height to ensure the full phrase
  // is visible with generous clearance above the Android navigation bar;
  // on desktop/tablet, lands at ~23.5% height preserving generous breathing room below the hero.
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPeeked(true);

      // Only perform slow transition scroll if visitor hasn't manually scrolled away yet
      if (window.scrollY < 30) {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const targetY = isMobile
          ? Math.round(window.innerHeight * 0.295)
          : Math.max(Math.round(window.innerHeight * 0.35), 300);
        smoothScrollTo(targetY, isMobile ? 1200 : 1400);

        setTimeout(() => {
          setPeekAnimationDone(true);
        }, isMobile ? 1300 : 1500);
      } else {
        setPeekAnimationDone(true);
      }
    }, 3750);

    return () => clearTimeout(timer);
  }, []);

  // Dismiss Section 1:
  // Gracefully dissolves and collapses Section 1, permanently disappearing it for the session
  // (unless the visitor reloads the page), while smoothly scrolling Section 2 (The Mandate)
  // into main focus flush below the fixed header.
  const handleDismissPeek = () => {
    if (isDismissingPeek || isPeekDismissed) return;
    setIsExpanded(true);
    setIsDismissingPeek(true);

    const header = document.querySelector('header');
    const headerH = header ? header.offsetHeight : 70;
    const targetY = window.innerHeight - (headerH > 0 ? headerH : 65);
    smoothScrollTo(targetY, 800);

    setTimeout(() => {
      setIsPeekDismissed(true);
    }, 850);
  };

  // Hide Section 1 when visitor starts scrolling down the page (via wheel, touch, or scroll position)
  useEffect(() => {
    if (isPeekDismissed || isDismissingPeek) return;

    let touchStartY = null;

    // Detect mouse wheel / trackpad scroll down
    const handleWheel = (e) => {
      if (e.deltaY > 12) {
        if (peekAnimationDone) {
          handleDismissPeek();
        } else if (window.scrollY > 40) {
          handleDismissPeek();
        }
      }
    };

    // Detect mobile touch swipe up (which scrolls page down)
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (touchStartY !== null && e.touches && e.touches.length > 0) {
        const touchCurrentY = e.touches[0].clientY;
        const diff = touchStartY - touchCurrentY; // positive = swiping up / scrolling down
        if (diff > 18) {
          if (peekAnimationDone) {
            handleDismissPeek();
          } else if (window.scrollY > 30) {
            handleDismissPeek();
          }
        }
      }
    };

    // Detect scroll position when scrolling down
    const handleScrollDown = () => {
      const isMobile = window.innerWidth < 768;
      const targetPeekY = isMobile
        ? Math.round(window.innerHeight * 0.295)
        : Math.max(Math.round(window.innerHeight * 0.35), 300);

      if (peekAnimationDone && window.scrollY > targetPeekY + 25) {
        handleDismissPeek();
      } else if (!hasPeeked && window.scrollY > 60) {
        handleDismissPeek();
      } else if (window.scrollY > window.innerHeight * 0.65) {
        setIsDismissingPeek(true);
        setIsPeekDismissed(true);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScrollDown, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScrollDown);
    };
  }, [isPeekDismissed, isDismissingPeek, peekAnimationDone, hasPeeked]);

  // When user clicks the 'Learn More' prompt in the Mandate section:
  // Smoothly scroll so the horizontal seam lands at ~27.2% of viewport height (matching Image 1).
  // The portrait circle sits cleanly below the header with visible ivory space above it,
  // and the Institutional Trust section fills the rest of the screen down to the bottom.
  const handleLearnMore = () => {
    setIsExpanded(true);
    const target = document.getElementById('institutional-trust');
    if (target) {
      const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
      const targetY = Math.max(0, absoluteTop - Math.round(window.innerHeight * 0.272));
      smoothScrollTo(targetY, 900);
    }
  };

  const [prefillInquiry, setPrefillInquiry] = useState(null);

  const handleRegisterEvent = useCallback((event) => {
    const isFr = lang === 'fr';
    const requestType = isFr ? 'Conférences et forums' : 'Keynotes & Forums';

    let message;
    if (isFr) {
      if (event.title.toLowerCase().startsWith('forum')) {
        message = `Je souhaite m'inscrire au ${event.title}.`;
      } else {
        message = `Je souhaite m'inscrire à l'événement : ${event.title}.`;
      }
    } else {
      message = `I would like to register for ${event.title}.`;
    }

    setPrefillInquiry({
      eventId: event.id,
      requestType,
      mandateText: message,
      timestamp: Date.now(),
    });

    setIsExpanded(true);

    const inquiryEl = document.getElementById('inquiry');
    if (inquiryEl) {
      const header = document.querySelector('header');
      const headerH = header ? header.offsetHeight : 70;
      const targetY = inquiryEl.getBoundingClientRect().top + window.scrollY - (headerH + 20);
      smoothScrollTo(Math.max(0, targetY), 900);

      setTimeout(() => {
        const nameInput = document.getElementById('t1-name');
        if (nameInput) {
          nameInput.focus();
        }
      }, 950);
    }
  }, [lang]);

  useEffect(() => {
    const onCustomRegister = (e) => {
      if (e.detail?.event) {
        handleRegisterEvent(e.detail.event);
      }
    };
    window.addEventListener('ld:register-event', onCustomRegister);
    return () => window.removeEventListener('ld:register-event', onCustomRegister);
  }, [handleRegisterEvent]);

  return (
    <div className="font-sans antialiased text-[#343434] bg-[#FBFAF5] selection:bg-[#9D2933] selection:text-[#FBFAF5] overflow-x-hidden relative min-h-screen">
      {/* Dynamic Fading Header with Bilingual EN/FR Switcher */}
      <Navigation lang={lang} onSetLang={handleSetLang} />

      {/* Stage 1 & 2: Fixed Background Hero with Spoken Cadence and Scroll Fade */}
      <Hero lang={lang} />

      {/* Stage 2: Main Content Container (Slides up over fixed hero like a solid curtain, z-index: 20) */}
      <main className="relative z-20 mt-[100vh] shadow-[0_-25px_50px_rgba(0,0,0,0.12)]">
        {/* 
          Seamless Ivory Mandate Enclosure:
          Wraps Section 1 (Lead Title) and Section 2 (Mandate Narrative) in an identical,
          unbroken #FBFAF5 background with zero internal shadow or line division.
          When Section 1 is dismissed via arrow, the top subtle gold border transfers to this container.
        */}
        <div className={`bg-[#FBFAF5] relative ${isPeekDismissed ? 'border-t border-[#B48B44]/35' : ''}`}>
          {!isPeekDismissed && (
            <LeadTitleSection
              lang={lang}
              hasPeeked={hasPeeked}
              isDismissing={isDismissingPeek}
              onArrowClick={handleDismissPeek}
            />
          )}
          <MandateSection
            lang={lang}
            onLearnMore={handleLearnMore}
          />
        </div>

        {/* 
          Section 3: Institutional Trust Section
          In signature deep navy blue (#0C1B26), with the portrait circle centered on the seam.
        */}
        <InstitutionalTrustSection lang={lang} />

        <SovereignTriptych lang={lang} />
        <ServicesEngagement lang={lang} />

        <PublicLedger lang={lang} onRegisterEvent={handleRegisterEvent} />
        <ConfidentialInquiry lang={lang} prefill={prefillInquiry} />
        <Footer lang={lang} />
      </main>
    </div>
  );
}
