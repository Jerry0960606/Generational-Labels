import React from 'react';

export const WavyDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-8 overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-brand-primary-container/30"
        preserveAspectRatio="none"
      >
        <path
          d="M0 12C150 12 150 0 300 0C450 0 450 12 600 12C750 12 750 0 900 0C1050 0 1050 12 1200 12V24H0V12Z"
          fill="currentColor"
        />
        <path
          d="M0 24C150 24 150 12 300 12C450 12 450 24 600 24C750 24 750 12 900 12C1050 12 1050 24 1200 24V24H0V24Z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};
