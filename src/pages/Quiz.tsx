import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { Trophy, RefreshCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Question {
  text: string;
  options: { text: string; score: number }[];
}

export const Quiz: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const questions: Question[] = [
    {
      text: t('q1Text'),
      options: [
        { text: t('q1o1'), score: 3 },
        { text: t('q1o2'), score: 4 },
        { text: t('q1o3'), score: 0 },
        { text: t('q1o4'), score: 1 }
      ]
    },
    {
      text: t('q2Text'),
      options: [
        { text: t('q2o1'), score: 1 },
        { text: t('q2o2'), score: 4 },
        { text: t('q2o3'), score: 0 },
        { text: t('q2o4'), score: 3 }
      ]
    },
    {
      text: t('q3Text'),
      options: [
        { text: t('q3o1'), score: 0 },
        { text: t('q3o2'), score: 4 },
        { text: t('q3o3'), score: 3 },
        { text: t('q3o4'), score: 1 }
      ]
    },
    {
      text: t('q4Text'),
      options: [
        { text: t('q4o1'), score: 4 },
        { text: t('q4o2'), score: 2 },
        { text: t('q4o3'), score: 1 },
        { text: t('q4o4'), score: 0 }
      ]
    },
    {
      text: t('q5Text'),
      options: [
        { text: t('q5o1'), score: 4 },
        { text: t('q5o2'), score: 1 },
        { text: t('q5o3'), score: 0 },
        { text: t('q5o4'), score: 3 }
      ]
    },
    {
      text: t('q6Text'),
      options: [
        { text: t('q6o1'), score: 4 },
        { text: t('q6o2'), score: 2 },
        { text: t('q6o3'), score: 1 },
        { text: t('q6o4'), score: 0 }
      ]
    },
    {
      text: t('q7Text'),
      options: [
        { text: t('q7o1'), score: 4 },
        { text: t('q7o2'), score: 1 },
        { text: t('q7o3'), score: 0 },
        { text: t('q7o4'), score: 3 }
      ]
    }
  ];

  const results = [
    { 
      id: 'WallBuilder',
      titleKey: 'resultWallBuilder', 
      traitsKey: 'resultWallTraits',
      watchOutKey: 'resultWallWatchOut',
      growKey: 'resultWallGrow',
      minScore: 0, 
      maxScore: 6, 
      icon: "🧱"
    },
    { 
      id: 'CuriousObserver',
      titleKey: 'resultCuriousObserver',
      traitsKey: 'resultCuriousTraits',
      watchOutKey: 'resultCuriousWatchOut',
      growKey: 'resultCuriousGrow',
      minScore: 7, 
      maxScore: 15, 
      icon: "🔭"
    },
    { 
      id: 'BridgeArtisan',
      titleKey: 'resultBridgeArtisan',
      traitsKey: 'resultBridgeTraits',
      watchOutKey: 'resultBridgeWatchOut',
      growKey: 'resultBridgeGrow',
      minScore: 16, 
      maxScore: 23, 
      icon: "🌉"
    },
    { 
      id: 'MasterConnector',
      titleKey: 'resultMasterConnector',
      traitsKey: 'resultMasterTraits',
      watchOutKey: 'resultMasterWatchOut',
      growKey: 'resultMasterGrow',
      minScore: 24, 
      maxScore: 28, 
      icon: "✨"
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (points: number) => {
    setScore(score + points);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setIsFinished(false);
  };

  const getResult = () => {
    return results.find(r => score >= r.minScore && score <= r.maxScore) || results[0];
  };

  const result = getResult();

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <TypographicOrnament variant="flower" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('quizPageTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-xl mx-auto font-sans font-medium">
          {t('quizPageDesc')}
        </p>
      </header>

      <div className="min-h-[500px] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full bg-brand-surface hand-drawn-border shadow-offset-lavender p-8 sm:p-12 space-y-8"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-secondary">
                  {t('qCountPrefix')} {currentStep + 1} / {questions.length}
                </span>
                <h2 className="text-2xl font-serif font-bold text-brand-primary leading-tight">
                  {questions[currentStep].text}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.score)}
                    className="group flex items-center justify-between p-4 bg-brand-surface-container-low border border-brand-outline/10 rounded-xl hover:border-brand-primary hover:bg-brand-surface transition-all text-left"
                  >
                    <span className="text-sm font-sans font-medium text-brand-on-surface group-hover:text-brand-primary">
                      {option.text}
                    </span>
                    <ArrowRight size={16} className="text-brand-on-surface/20 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>

              <div className="w-full h-1 bg-brand-outline/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-primary-container"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-brand-surface hand-drawn-border shadow-offset-bold p-8 sm:p-12 text-center space-y-8"
            >
              <div className="text-6xl mb-4">{result.icon}</div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-primary">
                    {t('resultsTitle')}
                  </span>
                  <h2 className="text-4xl font-serif font-bold text-brand-secondary">
                    {t(result.titleKey)}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 gap-6 text-left pt-4 max-w-2xl mx-auto">
                  <div className="p-6 bg-brand-primary-container-low/30 rounded-2xl border border-brand-primary/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-4xl">🧠</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                      核心思維 / Core Mindset
                    </h3>
                    <p className="text-sm sm:text-base text-brand-on-surface/90 leading-relaxed font-sans">{t(result.traitsKey)}</p>
                  </div>

                  <div className="p-6 bg-brand-secondary-container-low/30 rounded-2xl border border-brand-secondary/20 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-4xl">🚧</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-secondary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                      潛在盲點 / Blind Spots
                    </h3>
                    <p className="text-sm sm:text-base text-brand-on-surface/90 leading-relaxed font-sans">{t(result.watchOutKey)}</p>
                  </div>

                  <div className="p-6 bg-brand-surface border-2 border-dashed border-brand-primary/30 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <span className="text-4xl">🚀</span>
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                      行動建議 / Next Step
                    </h3>
                    <p className="text-sm sm:text-base text-brand-on-surface/90 leading-relaxed font-sans font-medium">{t(result.growKey)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <OffsetButton onClick={resetQuiz} variant="primary" className="flex items-center gap-2">
                  <RefreshCcw size={18} /> {t('takeAgain')}
                </OffsetButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-20 text-center">
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-brand-on-surface/30">
          {t('quizFooter')}
        </p>
      </div>
    </div>
  );
};
