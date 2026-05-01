import React from 'react';
import { Mail, Github, Twitter, Heart } from 'lucide-react';
import { TypographicOrnament } from '../ui/TypographicOrnament';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t-2 border-brand-outline/10 bg-brand-surface-container-low py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TypographicOrnament variant="flower" className="text-2xl" />
            <h3 className="text-xl font-serif font-bold text-brand-primary">Generational Bridges</h3>
          </div>
          <p className="text-sm text-brand-on-surface/70 leading-relaxed max-w-xs">
            {t('heroDesc').slice(0, 100)}...
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-brand-secondary">{t('missionLabel')}</h4>
          <p className="text-sm text-brand-on-surface/70 italic leading-relaxed">
            {t('missionQuote')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-outline/5 text-center text-[10px] uppercase tracking-tighter text-brand-on-surface/40 font-sans font-bold">
        <p>© 2026 Generational Bridge</p>
      </div>
    </footer>
  );
};
