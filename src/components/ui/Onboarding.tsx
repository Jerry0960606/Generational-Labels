// Updated onboarding with 4 steps
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TypographicOrnament } from './TypographicOrnament';
import { OffsetButton } from './OffsetButton';
import { Sparkles, BookOpen, Heart, MessageCircle, ArrowLeftRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
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
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-brand-background hand-drawn-border shadow-offset-bold p-5 sm:p-12 space-y-5 sm:space-y-8"
          >
            <div className="text-center space-y-3 sm:space-y-4">
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
              <TypographicOrnament variant="flower" className="text-3xl sm:text-4xl" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-primary flex items-center justify-center gap-2">
                <Sparkles size={28} className="text-brand-secondary" /> {language === 'en' ? 'Welcome to GL!' : '歡迎來到 GL！'}
              </h2>
              <p className="text-brand-on-surface/70 font-sans font-medium leading-relaxed">
                {t('onboardingIntro')}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-5">
              {[
                { text: t('onboardingStep1'), icon: BookOpen, color: 'text-brand-primary' },
                { text: t('onboardingStep2'), icon: ArrowLeftRight, color: 'text-brand-secondary' },
                { text: t('onboardingStep3'), icon: Sparkles, color: 'text-brand-tertiary' },
                { text: t('onboardingStep4'), icon: MessageCircle, color: 'text-brand-primary' }
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className={`mt-1 p-2 rounded-lg bg-brand-surface border border-brand-outline/10 group-hover:scale-110 transition-transform ${step.color}`}>
                    <step.icon size={18} />
                  </div>
                  <p className="text-sm font-sans font-medium text-brand-on-surface/80 leading-relaxed pt-1">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4 flex justify-center sticky bottom-0 bg-brand-background pb-1">
              <OffsetButton onClick={handleClose} variant="primary" className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg">
                {t('onboardingGotIt')}
              </OffsetButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
