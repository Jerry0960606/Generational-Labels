import React from 'react';

interface TypographicOrnamentProps {
  variant?: 'flower' | 'diamond' | 'scroll';
  className?: string;
}

export const TypographicOrnament: React.FC<TypographicOrnamentProps> = ({ 
  variant = 'flower', 
  className = '' 
}) => {
  if (variant === 'flower') {
    return (
      <span className={`inline-block text-brand-secondary/40 select-none ${className}`}>
        ❧
      </span>
    );
  }
  if (variant === 'diamond') {
    return (
      <span className={`inline-block text-brand-primary/40 select-none ${className}`}>
        ⬥
      </span>
    );
  }
  return (
    <span className={`inline-block text-brand-tertiary/40 select-none ${className}`}>
      ❦
    </span>
  );
};
