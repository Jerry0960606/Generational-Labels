import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftRight, Info, CheckCircle2, Zap, MessageSquare, Briefcase, History } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getGenerations, Generation } from '../data/generations';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';

export const Comparison: React.FC = () => {
  const { t, language } = useLanguage();
  const generations = useMemo(() => getGenerations(t, language), [t, language]);

  const [gen1Id, setGen1Id] = useState<string>(generations[3].id); // Default to Millennial
  const [gen2Id, setGen2Id] = useState<string>(generations[4].id); // Default to Gen Z

  const gen1 = useMemo(() => generations.find(g => g.id === gen1Id)!, [generations, gen1Id]);
  const gen2 = useMemo(() => generations.find(g => g.id === gen2Id)!, [generations, gen2Id]);

  const ComparisonRow = ({ 
    title, 
    icon: Icon, 
    val1, 
    val2,
    isList = false
  }: { 
    title: string, 
    icon: any, 
    val1: string | string[], 
    val2: string | string[],
    isList?: boolean
  }) => (
    <div className="border-b border-brand-outline/10 last:border-0">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-2 py-6 px-4 flex flex-col items-center justify-center bg-brand-surface-container/30 border-r border-brand-outline/10 text-center">
          <Icon size={20} className="text-brand-primary mb-2" />
          <span className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 leading-tight">
            {title}
          </span>
        </div>
        
        <div className="md:col-span-5 p-8 flex items-center bg-brand-background">
          {isList ? (
            <ul className="space-y-2 w-full">
              {(val1 as string[]).map(v => (
                <li key={v} className="flex items-center gap-3 text-sm font-sans font-bold text-brand-on-surface/70">
                  <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-sans font-bold text-brand-on-surface/70 leading-relaxed italic border-l-2 border-brand-primary/20 pl-4">
              {val1}
            </p>
          )}
        </div>

        <div className="md:col-span-5 p-8 flex items-center bg-brand-surface-container/10">
          {isList ? (
            <ul className="space-y-2 w-full">
              {(val2 as string[]).map(v => (
                <li key={v} className="flex items-center gap-3 text-sm font-sans font-bold text-brand-on-surface/70">
                  <span className="w-1.5 h-1.5 bg-brand-secondary-container rounded-full flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-sans font-bold text-brand-on-surface/70 leading-relaxed italic border-l-2 border-brand-secondary/20 pl-4">
              {val2}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-6 pb-24 lg:pb-12 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <TypographicOrnament variant="diamond" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('comparisonTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('comparisonDesc')}
        </p>
      </header>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-16 bg-brand-surface p-8 hand-drawn-border shadow-offset-bold">
        <div className="md:col-span-5 space-y-2">
          <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 block">
            {t('comparisonSelect1')}
          </label>
          <select 
            value={gen1Id}
            onChange={e => setGen1Id(e.target.value)}
            className="w-full bg-brand-background border-2 border-brand-outline/10 rounded-xl p-4 font-serif text-xl font-bold text-brand-primary focus:outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer"
          >
            {generations.map(g => (
              <option key={g.id} value={g.id} disabled={g.id === gen2Id}>{g.name} ({g.years})</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 flex justify-center py-4">
          <div className="p-4 bg-brand-primary-container/20 rounded-full text-brand-primary">
            <ArrowLeftRight size={32} strokeWidth={1.5} />
          </div>
        </div>

        <div className="md:col-span-5 space-y-2">
          <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 block">
            {t('comparisonSelect2')}
          </label>
          <select 
            value={gen2Id}
            onChange={e => setGen2Id(e.target.value)}
            className="w-full bg-brand-background border-2 border-brand-outline/10 rounded-xl p-4 font-serif text-xl font-bold text-brand-secondary focus:outline-none focus:border-brand-secondary transition-all appearance-none cursor-pointer"
          >
            {generations.map(g => (
              <option key={g.id} value={g.id} disabled={g.id === gen1Id}>{g.name} ({g.years})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="hand-drawn-border overflow-hidden bg-brand-surface shadow-offset-lavender">
        <ComparisonRow 
          title={t('explorerKeyPhilosophy')} 
          icon={Zap} 
          val1={gen1.keyValues} 
          val2={gen2.keyValues} 
          isList 
        />
        <ComparisonRow 
          title={t('explorerCommunication')} 
          icon={MessageSquare} 
          val1={gen1.communication} 
          val2={gen2.communication} 
        />
        <ComparisonRow 
          title={t('explorerWorkplace')} 
          icon={Briefcase} 
          val1={gen1.workplace} 
          val2={gen2.workplace} 
        />
        <ComparisonRow 
          title={t('explorerContext')} 
          icon={History} 
          val1={gen1.context} 
          val2={gen2.context} 
        />
        <div className="border-b border-brand-outline/10 last:border-0">
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-2 py-6 px-4 flex flex-col items-center justify-center bg-brand-surface-container/30 border-r border-brand-outline/10 text-center">
              <BookOpen size={20} className="text-brand-primary mb-2" />
              <span className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 leading-tight">
                {t('explorerSlangBox')}
              </span>
            </div>
            
            <div className="md:col-span-5 p-8 bg-brand-background">
              <div className="flex flex-wrap gap-2">
                {gen1.slang.map(s => (
                  <span key={s.word} className="px-3 py-1.5 bg-brand-surface-container rounded-lg text-xs font-bold text-brand-primary border border-brand-outline/5">
                    {s.word}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 p-8 bg-brand-surface-container/10">
              <div className="flex flex-wrap gap-2">
                {gen2.slang.map(s => (
                  <span key={s.word} className="px-3 py-1.5 bg-brand-surface-container rounded-lg text-xs font-bold text-brand-secondary border border-brand-outline/5">
                    {s.word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center">
        <p className="text-xs font-sans font-bold text-brand-on-surface/30 italic">
          {language === 'en' 
            ? "* Note: These are generalizations based on cultural studies. Every individual is unique." 
            : "* 註：以上內容基於文化研究的概括，每個人都是獨一無二的個體。"}
        </p>
      </footer>
    </div>
  );
};

const BookOpen = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
