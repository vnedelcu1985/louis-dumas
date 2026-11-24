import React from 'react';
import useFadeIn from '../../hooks/useFadeIn';

export default function FadeInSection({
  children,
  className = '',
  delay = 'delay-0',
  threshold = 0.15,
}) {
  const { ref, isVisible } = useFadeIn(threshold);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-out ${delay} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
