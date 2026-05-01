import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TypographicOrnament } from './TypographicOrnament';
import { OffsetButton } from './OffsetButton';
import { Sparkles, BookOpen, Heart, MessageCircle } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-brand-on-surface/50 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-brand-background hand-drawn-border shadow-offset-bold p-8 sm:p-12 space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4 mb-4">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-brand-primary text-brand-background' : 'bg-brand-surface border border-brand-outline/10 text-brand-on-surface/40 hover:text-brand-primary'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('zh')}
                  className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${language === 'zh' ? 'bg-brand-secondary text-brand-background' : 'bg-brand-surface border border-brand-outline/10 text-brand-on-surface/40 hover:text-brand-secondary'}`}
                >
                  繁體中文
                </button>
              </div>
              <TypographicOrnament variant="flower" className="text-4xl" />
              <h2 className="text-3xl font-serif font-bold text-brand-primary flex items-center justify-center gap-2">
                <Sparkles size={28} className="text-brand-secondary" /> {t('onboardingWelcome')}
              </h2>
              <p className="text-brand-on-surface/70 font-sans font-medium leading-relaxed">
                {t('onboardingIntro')}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { text: t('onboardingStep1'), icon: BookOpen, color: 'text-brand-primary' },
                { text: t('onboardingStep2'), icon: Heart, color: 'text-brand-secondary' },
                { text: t('onboardingStep3'), icon: MessageCircle, color: 'text-brand-tertiary' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-lg bg-brand-surface border border-brand-outline/10 ${step.color}`}>
                    <step.icon size={20} />
                  </div>
                  <p className="text-sm font-sans font-medium text-brand-on-surface/80 leading-relaxed pt-1">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-center">
              <OffsetButton onClick={handleClose} variant="primary" className="px-10 py-4 text-lg">
                {t('onboardingGotIt')}
              </OffsetButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
