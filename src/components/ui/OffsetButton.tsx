import React from 'react';

interface OffsetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'lavender';
  children: React.ReactNode;
}

export const OffsetButton: React.FC<OffsetButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const shadows = {
    primary: 'shadow-offset-primary',
    secondary: 'shadow-offset-secondary',
    outline: 'shadow-offset-outline',
    lavender: 'shadow-offset-lavender',
  };

  const bgColors = {
    primary: 'bg-brand-primary-container text-brand-on-primary-container',
    secondary: 'bg-brand-secondary-container text-brand-on-secondary-container',
    outline: 'bg-brand-surface border-2 border-brand-outline text-brand-on-surface',
    lavender: 'bg-brand-tertiary-container text-brand-on-tertiary-container',
  };

  return (
    <button
      className={`
        px-6 py-2 rounded-lg font-sans font-bold transition-all
        active:translate-x-1 active:translate-y-1 active:shadow-none
        disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
        ${shadows[variant]}
        ${bgColors[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
