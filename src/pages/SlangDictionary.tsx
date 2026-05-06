import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Hash } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getGenerations } from '../data/generations';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';

export const SlangDictionary: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenId, setSelectedGenId] = useState<string | 'all'>('all');

  const generations = useMemo(() => getGenerations(t, language), [t, language]);

  const allSlang = useMemo(() => {
    return generations.flatMap(gen => 
      gen.slang.map(s => ({
        ...s,
        genName: gen.name,
        genId: gen.id,
        genColor: gen.color
      }))
    );
  }, [generations]);

  const filteredSlang = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allSlang.filter(item => {
      const matchesSearch = item.word.toLowerCase().includes(q) || 
                          item.meaning.toLowerCase().includes(q);
      const matchesGen = selectedGenId === 'all' || item.genId === selectedGenId;
      return matchesSearch && matchesGen;
    });
  }, [allSlang, searchQuery, selectedGenId]);

  return (
    <div className="py-12 px-6 pb-24 lg:pb-12 max-w-7xl mx-auto">
      <header className="mb-12 text-center space-y-4">
        <TypographicOrnament variant="scroll" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('dictionaryTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('dictionaryDesc')}
        </p>
      </header>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-12 space-y-6">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-on-surface/30 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('dictionarySearch')}
            className="w-full pl-12 pr-12 py-4 bg-brand-surface hand-drawn-border text-base font-sans focus:outline-none focus:border-brand-primary transition-colors placeholder:text-brand-on-surface/30 shadow-offset-outline"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-on-surface/30 hover:text-brand-primary transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedGenId('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-2 ${
              selectedGenId === 'all' 
                ? 'bg-brand-on-surface text-brand-surface border-brand-on-surface' 
                : 'bg-brand-surface text-brand-on-surface/40 border-brand-outline/10 hover:border-brand-on-surface/40'
            }`}
          >
            {language === 'en' ? 'All Eras' : '所有時代'}
          </button>
          {generations.map(gen => (
            <button
              key={gen.id}
              onClick={() => setSelectedGenId(gen.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border-2 ${
                selectedGenId === gen.id 
                  ? 'bg-brand-primary text-brand-surface border-brand-primary' 
                  : 'bg-brand-surface text-brand-on-surface/40 border-brand-outline/10 hover:border-brand-primary/40'
              }`}
            >
              {gen.name}
            </button>
          ))}
        </div>
      </div>

      {filteredSlang.length === 0 ? (
        <div className="text-center py-20 text-brand-on-surface/40 font-sans font-medium">
          {t('explorerNoResults')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSlang.map((item, idx) => (
              <motion.div
                key={`${item.genId}-${item.word}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
                className="bg-brand-surface-container p-6 hand-drawn-border hover:shadow-offset-primary transition-all group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <Hash size={16} className="text-brand-on-surface/10 group-hover:text-brand-primary transition-colors" />
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded bg-brand-surface border border-brand-outline/10 ${
                      item.genColor === 'primary' ? 'text-brand-primary' : item.genColor === 'secondary' ? 'text-brand-secondary' : 'text-brand-tertiary'
                    }`}>
                      {item.genName}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-black text-brand-on-surface mb-3 group-hover:text-brand-primary transition-colors">
                    {item.word}
                  </h3>
                  <p className="text-sm text-brand-on-surface/70 leading-relaxed font-medium italic">
                    {item.meaning}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-brand-outline/10 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                  <BookOpen size={12} />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-tighter">Vocabulary</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
