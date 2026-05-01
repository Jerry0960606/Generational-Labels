import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { Search, Info, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Generation {
  id: string;
  name: string;
  years: string;
  description: string;
  keyValues: string[];
  slang: { word: string; meaning: string }[];
  color: 'primary' | 'secondary' | 'lavender' | 'outline';
}

export const Explorer: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const { t, language } = useLanguage();

  const generations: Generation[] = [
    {
      id: 'silent',
      name: t('gen_silent'),
      years: '1928 – 1945',
      description: t('gen_silent_desc'),
      keyValues: [
        language === 'en' ? 'Stability' : '穩定',
        language === 'en' ? 'Dedication' : '奉獻',
        language === 'en' ? 'Sacrifice' : '犧牲',
        language === 'en' ? 'Discipline' : '紀律'
      ],
      slang: [
        { word: 'G-Man', meaning: language === 'en' ? 'A federal agent' : '聯邦調查員' },
        { word: 'Cooking with gas', meaning: language === 'en' ? 'Doing something right or fast' : '進展順利' }
      ],
      color: 'outline'
    },
    {
      id: 'boomers',
      name: t('gen_boomers'),
      years: '1946 – 1964',
      description: t('gen_boomers_desc'),
      keyValues: [
        language === 'en' ? 'Ambition' : '野心',
        language === 'en' ? 'Community' : '社群',
        language === 'en' ? 'Fairness' : '公平',
        language === 'en' ? 'Security' : '安全'
      ],
      slang: [
        { word: 'Groovy', meaning: language === 'en' ? 'Excellent, fashionable' : '極好的、時髦的' },
        { word: 'Right on', meaning: language === 'en' ? 'I agree completely' : '完全同意' }
      ],
      color: 'secondary'
    },
    {
      id: 'genx',
      name: t('gen_genx'),
      years: '1965 – 1980',
      description: t('gen_genx_desc'),
      keyValues: [
        language === 'en' ? 'Independence' : '獨立',
        language === 'en' ? 'Pragmatism' : '務實',
        language === 'en' ? 'Authenticity' : '真實',
        language === 'en' ? 'Flexibility' : '靈活'
      ],
      slang: [
        { word: 'Whatever', meaning: language === 'en' ? 'Indifference or dismissal' : '隨便、無所謂' },
        { word: 'As if!', meaning: language === 'en' ? 'I don\'t believe you' : '怎麼可能！' }
      ],
      color: 'primary'
    },
    {
      id: 'millennials',
      name: t('gen_millennials'),
      years: '1981 – 1996',
      description: t('gen_millennials_desc'),
      keyValues: [
        language === 'en' ? 'Purpose' : '目標',
        language === 'en' ? 'Collaboration' : '協作',
        language === 'en' ? 'Inclusion' : '包容',
        language === 'en' ? 'Diversity' : '多元'
      ],
      slang: [
        { word: 'On fleek', meaning: language === 'en' ? 'Perfectly styled' : '完美極了' },
        { word: 'Ghosting', meaning: language === 'en' ? 'Ending contact suddenly' : '不告而別、已讀不回' }
      ],
      color: 'lavender'
    },
    {
      id: 'genz',
      name: t('gen_genz'),
      years: '1997 – 2012',
      description: t('gen_genz_desc'),
      keyValues: [
        language === 'en' ? 'Privacy' : '隱私',
        language === 'en' ? 'Individuality' : '個性化',
        language === 'en' ? 'Stability' : '穩定',
        language === 'en' ? 'Activism' : '行動力'
      ],
      slang: [
        { word: 'No cap', meaning: language === 'en' ? 'I\'m not lying' : '沒騙你、真的' },
        { word: 'Slay', meaning: language === 'en' ? 'Doing something exceptionally well' : '太殺了、做得好' }
      ],
      color: 'primary'
    },
    {
      id: 'alpha',
      name: t('gen_alpha'),
      years: '2013 – 2025',
      description: t('gen_alpha_desc'),
      keyValues: [
        language === 'en' ? 'Adaptability' : '適應力',
        language === 'en' ? 'Global Citizenship' : '世界公民',
        language === 'en' ? 'Tech-fluency' : '科技流利度',
        language === 'en' ? 'Creativity' : '創造性'
      ],
      slang: [
        { word: 'Skibidi', meaning: language === 'en' ? 'Absurdist slang' : '無厘頭流行語' },
        { word: 'Rizz', meaning: language === 'en' ? 'Charisma' : '魅力、抓地力' }
      ],
      color: 'secondary'
    }
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <TypographicOrnament variant="diamond" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('explorerTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('explorerDesc')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generations.map((gen) => (
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
                  +{gen.keyValues.length - 2} more
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGen(null)}
              className="absolute inset-0 bg-brand-on-surface/40 backdrop-blur-sm"
            />
            <motion.div
              layoutId={selectedGen.id}
              className="relative w-full max-w-2xl bg-brand-background hand-drawn-border shadow-offset-bold overflow-hidden"
            >
              <div className="p-8 sm:p-12 overflow-y-auto max-h-[80vh]">
                <button 
                  onClick={() => setSelectedGen(null)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-brand-surface-container-high text-brand-on-surface/60 hover:text-brand-primary transition-colors"
                >
                  ✕
                </button>

                <div className="mb-8">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-brand-secondary">
                    {selectedGen.years}
                  </span>
                  <h2 className="text-4xl font-serif font-bold text-brand-primary mt-2">{selectedGen.name}</h2>
                </div>

                <div className="prose prose-brand max-w-none">
                  <p className="text-lg text-brand-on-surface/70 font-medium leading-relaxed mb-8 italic">
                    "{selectedGen.description}"
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-brand-on-surface/40">
                        <TypographicOrnament variant="diamond" className="text-sm" />
                        Key Philosophy
                      </h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {selectedGen.keyValues.map((val) => (
                          <li key={val} className="flex items-center gap-2 text-sm font-sans font-bold text-brand-on-surface/70">
                            <span className="w-1.5 h-1.5 bg-brand-primary-container rounded-full" />
                            {val}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 text-xs font-sans font-black uppercase tracking-widest text-brand-on-surface/40">
                        <TypographicOrnament variant="flower" className="text-sm" />
                        The Slang Box
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        {selectedGen.slang.map((item) => (
                          <div key={item.word} className="p-3 bg-brand-surface-container rounded-lg border border-brand-outline/10">
                            <span className="block font-bold text-brand-secondary text-sm mb-1">{item.word}</span>
                            <span className="block text-xs text-brand-on-surface/60 italic">{item.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-brand-outline/10 flex justify-between items-center">
                  <p className="text-[10px] font-sans font-bold text-brand-on-surface/40 max-w-[200px]">
                    Dive deeper into the {selectedGen.name} research at the Bridge Archives.
                  </p>
                  <button className="flex items-center gap-2 text-xs font-bold text-brand-primary hover:underline">
                    View Full Archival Record <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
