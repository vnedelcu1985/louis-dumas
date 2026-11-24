import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for smooth viewport intersection fade-ins.
 * Automatically unobserves once visible to optimize performance.
 */
export const useFadeIn = (threshold = 0.15) => {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    return typeof IntersectionObserver === 'undefined';
  });

  useEffect(() => {
    const node = domRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref: domRef, isVisible };
};

export default useFadeIn;
