import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { Search, Info, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Generation {
  id: string;
  name: string;
  years: string;
  description: string;
  keyValues: string[];
  slang: { word: string; meaning: string }[];
  popCulture: { label: string; example: string }[];
  color: 'primary' | 'secondary' | 'lavender' | 'outline';
}

export const Explorer: React.FC = () => {
  const [selectedGen, setSelectedGen] = useState<Generation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, language } = useLanguage();

  const en = language === 'en';

  const generations: Generation[] = [
    {
      id: 'silent',
      name: t('gen_silent'),
      years: '1928 – 1945',
      description: t('gen_silent_desc'),
      keyValues: [
        en ? 'Stability' : '穩定',
        en ? 'Dedication' : '奉獻',
        en ? 'Sacrifice' : '犧牲',
        en ? 'Discipline' : '紀律',
        en ? 'Patriotism' : '愛國情操',
      ],
      slang: [
        { word: 'G-Man', meaning: en ? 'A federal agent' : '聯邦調查員' },
        { word: 'Cooking with gas', meaning: en ? 'Doing something right or fast' : '進展順利' },
        { word: 'Copacetic', meaning: en ? 'Everything is fine, satisfactory' : '一切都很好' },
        { word: 'Hep cat', meaning: en ? 'A hip, jazz-savvy person' : '時髦、懂爵士樂的人' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Big Band, Glenn Miller, Frank Sinatra' : '大樂隊音樂、法蘭克·辛納屈' },
        { label: en ? 'Film' : '電影', example: en ? 'Casablanca, Gone with the Wind' : '《北非諜影》、《亂世佳人》' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'WWII, Great Depression, Radio era' : '二次世界大戰、大蕭條、廣播時代' },
      ],
      color: 'outline'
    },
    {
      id: 'boomers',
      name: t('gen_boomers'),
      years: '1946 – 1964',
      description: t('gen_boomers_desc'),
      keyValues: [
        en ? 'Ambition' : '野心',
        en ? 'Community' : '社群',
        en ? 'Fairness' : '公平',
        en ? 'Security' : '安全',
        en ? 'Hard Work' : '努力工作',
      ],
      slang: [
        { word: 'Groovy', meaning: en ? 'Excellent, fashionable' : '極好的、時髦的' },
        { word: 'Right on', meaning: en ? 'I agree completely' : '完全同意' },
        { word: 'Far out', meaning: en ? 'Extremely unusual or excellent' : '太棒了、超厲害' },
        { word: 'Dig it', meaning: en ? 'Understand or appreciate something' : '明白、欣賞' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'The Beatles, Woodstock, Rock \'n\' Roll' : '披頭四、伍茲塔克音樂節、搖滾樂' },
        { label: en ? 'TV' : '電視', example: en ? 'Moon landing live broadcast, I Love Lucy' : '月球登陸直播、情境喜劇' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'Civil Rights Movement, Vietnam War' : '民權運動、越戰' },
      ],
      color: 'secondary'
    },
    {
      id: 'genx',
      name: t('gen_genx'),
      years: '1965 – 1980',
      description: t('gen_genx_desc'),
      keyValues: [
        en ? 'Independence' : '獨立',
        en ? 'Pragmatism' : '務實',
        en ? 'Authenticity' : '真實',
        en ? 'Flexibility' : '靈活',
        en ? 'Self-reliance' : '自力更生',
      ],
      slang: [
        { word: 'Whatever', meaning: en ? 'Indifference or dismissal' : '隨便、無所謂' },
        { word: 'As if!', meaning: en ? 'I don\'t believe you' : '怎麼可能！' },
        { word: 'Dude', meaning: en ? 'A general address term' : '夥伴、老兄（通用稱呼）' },
        { word: 'Bogus', meaning: en ? 'Fake or unfair' : '假的、不公平的' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Nirvana, Grunge, MTV, Michael Jackson' : '涅槃樂隊、油漬搖滾、MTV、麥可·傑克遜' },
        { label: en ? 'Film' : '電影', example: en ? 'Ferris Bueller, The Breakfast Club' : '《蹺課天才》、《早餐俱樂部》' },
        { label: en ? 'Tech' : '科技', example: en ? 'Walkman, Atari, NES, VHS' : '隨身聽、電玩（雅達利/FC紅白機）' },
      ],
      color: 'primary'
    },
    {
      id: 'millennials',
      name: t('gen_millennials'),
      years: '1981 – 1996',
      description: t('gen_millennials_desc'),
      keyValues: [
        en ? 'Purpose' : '目標',
        en ? 'Collaboration' : '協作',
        en ? 'Inclusion' : '包容',
        en ? 'Diversity' : '多元',
        en ? 'Work-Life Balance' : '生活平衡',
      ],
      slang: [
        { word: 'On fleek', meaning: en ? 'Perfectly styled' : '完美極了' },
        { word: 'Ghosting', meaning: en ? 'Ending contact suddenly' : '不告而別、已讀不回' },
        { word: 'FOMO', meaning: en ? 'Fear Of Missing Out' : '害怕錯過（FOMO 症）' },
        { word: 'Basic', meaning: en ? 'Mainstream, unoriginal' : '普通、沒有個性' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Britney Spears, Eminem, Indie Rock' : '小甜甜布蘭妮、阿姆、獨立搖滾' },
        { label: en ? 'Tech' : '科技', example: en ? 'AIM, MySpace, iPod, early smartphones' : 'MSN 即時通、MySpace、iPod' },
        { label: en ? 'Events' : '歷史大事', example: en ? '9/11, 2008 Financial Crisis, Social Media rise' : '911事件、2008金融危機、社群媒體興起' },
      ],
      color: 'lavender'
    },
    {
      id: 'genz',
      name: t('gen_genz'),
      years: '1997 – 2012',
      description: t('gen_genz_desc'),
      keyValues: [
        en ? 'Privacy' : '隱私',
        en ? 'Individuality' : '個性化',
        en ? 'Stability' : '穩定',
        en ? 'Activism' : '行動力',
        en ? 'Mental Health' : '心理健康',
      ],
      slang: [
        { word: 'No cap', meaning: en ? 'I\'m not lying / For real' : '沒騙你、真的' },
        { word: 'Slay', meaning: en ? 'Doing something exceptionally well' : '太殺了、做得好' },
        { word: 'It\'s giving', meaning: en ? 'It gives off a certain vibe' : '這很有……的感覺' },
        { word: 'Understood the assignment', meaning: en ? 'Did exactly what was needed, perfectly' : '完全掌握狀況、做到位了' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Billie Eilish, BTS, Olivia Rodrigo, TikTok hits' : '碧梨、防彈少年團、TikTok 神曲' },
        { label: en ? 'Tech' : '科技', example: en ? 'TikTok, Snapchat, YouTube, Streaming' : 'TikTok、Snapchat、YouTube 直播' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'COVID-19, Climate activism, BLM movement' : '新冠疫情、氣候行動、BLM 運動' },
      ],
      color: 'primary'
    },
    {
      id: 'alpha',
      name: t('gen_alpha'),
      years: '2013 – 2025',
      description: t('gen_alpha_desc'),
      keyValues: [
        en ? 'Adaptability' : '適應力',
        en ? 'Global Citizenship' : '世界公民',
        en ? 'Tech-fluency' : '科技流利度',
        en ? 'Creativity' : '創造性',
        en ? 'AI-native' : 'AI 原住民',
      ],
      slang: [
        { word: 'Skibidi', meaning: en ? 'Absurdist meme slang; cool or weird' : '無厘頭梗語，表示酷或奇怪' },
        { word: 'Rizz', meaning: en ? 'Charisma, the ability to attract others' : '魅力、吸引人的特質' },
        { word: 'Sigma', meaning: en ? 'Self-reliant, lone-wolf archetype' : '獨立自主、不依賴他人的類型' },
        { word: 'Delulu', meaning: en ? 'Delusional, used humorously' : '妄想、不切實際（幽默用法）' },
      ],
      popCulture: [
        { label: en ? 'Tech' : '科技', example: en ? 'AI tools, iPads from birth, smart devices' : '從小接觸 AI、iPad、智慧裝置' },
        { label: en ? 'Media' : '媒體', example: en ? 'YouTube Kids, Roblox, Minecraft' : 'YouTube Kids、Roblox、Minecraft' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'Post-COVID world, AI revolution, remote school' : '後疫情世界、AI 革命、遠距教學' },
      ],
      color: 'secondary'
    }
  ];

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
              className="relative w-full max-w-2xl bg-brand-background hand-drawn-border shadow-offset-bold overflow-hidden"
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
