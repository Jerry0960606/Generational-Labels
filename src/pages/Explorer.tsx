import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { Search, Info, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

import { getGenerations, Generation } from '../data/generations';

export const Explorer: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  const generations = useMemo(() => getGenerations(t, language), [t, language]);
  const en = language === 'en';

  const filteredGenerations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return generations;
    return generations.filter(gen => {
      const inName = gen.name.toLowerCase().includes(q);
      const inDesc = gen.description.toLowerCase().includes(q);
      const inValues = gen.keyValues.some(v => v.toLowerCase().includes(q));
      const inSlang = gen.slang.some(s =>
        s.word.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q)
      );
      return inName || inDesc || inValues || inSlang;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, language]);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center space-y-4">
        <TypographicOrnament variant="diamond" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('explorerTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('explorerDesc')}
        </p>
      </header>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-on-surface/30 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={t('explorerSearch')}
          className="w-full pl-10 pr-10 py-3 bg-brand-surface hand-drawn-border text-sm font-sans focus:outline-none focus:border-brand-primary transition-colors placeholder:text-brand-on-surface/30"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-on-surface/30 hover:text-brand-primary transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {filteredGenerations.length === 0 ? (
        <div className="text-center py-20 text-brand-on-surface/40 font-sans font-medium">
          {t('explorerNoResults')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGenerations.map((gen) => (
            <motion.div
              key={gen.id}
              layoutId={gen.id}
              onClick={() => setSelectedGen(gen)}
              className={`
                p-8 bg-brand-surface hand-drawn-border cursor-pointer transition-all
                ${gen.color === 'primary' ? 'shadow-offset-primary' : gen.color === 'secondary' ? 'shadow-offset-secondary' : gen.color === 'lavender' ? 'shadow-offset-lavender' : 'shadow-offset-outline'}
                hover:-translate-x-1 hover:-translate-y-1 group
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-on-surface/40">
                  {gen.years}
                </span>
                <Info size={16} className="text-brand-on-surface/20 group-hover:text-brand-primary transition-colors" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-on-surface mb-2">{gen.name}</h3>
              <p className="text-sm text-brand-on-surface/60 line-clamp-3 mb-6 leading-relaxed">
                {gen.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {gen.keyValues.slice(0, 2).map((val) => (
                  <span key={val} className="px-2 py-1 bg-brand-surface-container rounded-md text-[10px] font-bold uppercase tracking-wider text-brand-on-surface/60 border border-brand-outline/10">
                    {val}
                  </span>
                ))}
                {gen.keyValues.length > 2 && (
                  <span className="px-2 py-1 text-[10px] font-bold text-brand-primary/60">
                    +{gen.keyValues.length - 2} {en ? 'more' : '更多'}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedGen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGen(null)}
              className="absolute inset-0 bg-brand-on-surface/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedGen.id}
              className="relative w-full max-w-3xl bg-brand-background hand-drawn-border shadow-offset-bold overflow-hidden"
            >
              <div className="p-6 sm:p-10 overflow-y-auto max-h-[85vh]">
                <button
                  onClick={() => setSelectedGen(null)}
                  className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-brand-surface-container-high text-brand-on-surface/60 hover:text-brand-primary transition-colors z-10"
                >
                  ✕
                </button>

                <div className="mb-6">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-secondary">
                    {selectedGen.years}
                  </span>
                  <h2 className="text-4xl font-serif font-bold text-brand-primary mt-2">{selectedGen.name}</h2>
                </div>

                <p className="text-base text-brand-on-surface/70 font-medium leading-relaxed mb-8 italic border-l-2 border-brand-secondary pl-4">
                  "{selectedGen.description}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Key Values */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-brand-on-surface/40">
                      <TypographicOrnament variant="diamond" className="text-sm" />
                      {t('explorerKeyPhilosophy')}
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {selectedGen.keyValues.map((val) => (
                        <li key={val} className="flex items-center gap-2 text-sm font-sans font-bold text-brand-on-surface/70">
                          <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full flex-shrink-0" />
                          {val}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Slang */}
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-brand-on-surface/40">
                      <TypographicOrnament variant="flower" className="text-sm" />
                      {t('explorerSlangBox')}
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedGen.slang.map((item) => (
                        <div key={item.word} className="p-3 bg-brand-surface-container rounded-lg border border-brand-outline/10">
                          <span className="block font-bold text-brand-secondary text-sm mb-1">{item.word}</span>
                          <span className="block text-xs text-brand-on-surface/60 italic">{item.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Traits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pt-8 border-t border-brand-outline/10">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-primary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-primary" />
                      {t('explorerCommunication')}
                    </h4>
                    <p className="text-sm text-brand-on-surface/70 leading-relaxed font-medium">{selectedGen.communication}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-secondary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary" />
                      {t('explorerWorkplace')}
                    </h4>
                    <p className="text-sm text-brand-on-surface/70 leading-relaxed font-medium">{selectedGen.workplace}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-tertiary flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-tertiary" />
                      {t('explorerContext')}
                    </h4>
                    <p className="text-sm text-brand-on-surface/70 leading-relaxed font-medium">{selectedGen.context}</p>
                  </div>
                </div>

                {/* Pop Culture */}
                <div className="space-y-4 pt-6 border-t border-brand-outline/10">
                  <h4 className="flex items-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-brand-on-surface/40">
                    <TypographicOrnament variant="scroll" className="text-sm" />
                    {t('explorerPopCulture')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedGen.popCulture.map((item) => (
                      <div key={item.label} className="p-4 bg-brand-surface-container-high rounded-xl border border-brand-outline/10 text-center">
                        <span className="block text-[10px] font-sans font-black uppercase tracking-widest text-brand-primary mb-2">{item.label}</span>
                        <span className="block text-xs text-brand-on-surface/70 leading-relaxed">{item.example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
