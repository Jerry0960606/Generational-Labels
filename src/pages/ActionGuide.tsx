import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { CheckCircle2, MessageSquare, Lightbulb, Coffee, PhoneCall, Zap, Sparkles, RefreshCcw, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { GoogleGenAI } from '@google/genai';

const GENERATION_OPTIONS_EN = [
  'Silent Generation (1928–1945)',
  'Baby Boomers (1946–1964)',
  'Gen X (1965–1980)',
  'Millennials (1981–1996)',
  'Gen Z (1997–2012)',
  'Gen Alpha (2013–2025)',
];
const GENERATION_OPTIONS_ZH = [
  '沉默世代 (1928–1945)',
  '嬰兒潮 (1946–1964)',
  'X 世代 (1965–1980)',
  '千禧世代 (1981–1996)',
  'Z 世代 (1997–2012)',
  'Alpha 世代 (2013–2025)',
];

async function generateSpark(
  yourGen: string,
  theirGen: string,
  language: 'en' | 'zh'
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Graceful fallback when no API key is configured
    const yName = yourGen.split('(')[0].trim();
    const tName = theirGen.split('(')[0].trim();
    const fallbacks: Record<string, string> = {
      en: `"${yName} to ${tName}: 'What's one thing you wish more people understood about the era you grew up in?' — then really listen."`,
      zh: `「${yName} 對 ${tName} 說：『你希望更多人了解你成長年代的哪件事？』——然後認真傾聽。」`,
    };
    await new Promise(r => setTimeout(r, 800));
    return fallbacks[language];
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompt = language === 'en'
    ? `You are a warm, witty generational bridge-builder. Generate ONE short, specific, heartfelt conversation starter (2–3 sentences max) for a ${yourGen} speaking with a ${theirGen}. Focus on a shared human experience that transcends their age gap. Wrap the opening line in quotation marks. No preamble, just the prompt.`
    : `你是一位溫暖風趣的世代橋樑建造者。請為一位${yourGen.split('(')[0].trim()}與${theirGen.split('(')[0].trim()}之間的對話，生成一句簡短、具體、溫暖的破冰引言（最多2至3句話）。聚焦於跨越年齡差距的共同人類經驗。用引號包住開場白。不要加前言，直接給出引言。`;
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  });
  return response.text?.trim() || '';
}

export const ActionGuide: React.FC = () => {
  const { t, language } = useLanguage();
  const en = language === 'en';

  // AI Spark state
  const [yourGen, setYourGen] = useState('');
  const [theirGen, setTheirGen] = useState('');
  const [sparkResult, setSparkResult] = useState('');
  const [sparkLoading, setSparkLoading] = useState(false);
  const [sparkError, setSparkError] = useState('');

  const genOptions = en ? GENERATION_OPTIONS_EN : GENERATION_OPTIONS_ZH;

  const handleGenerateSpark = async () => {
    if (!yourGen || !theirGen) return;
    setSparkLoading(true);
    setSparkError('');
    setSparkResult('');
    try {
      const result = await generateSpark(yourGen, theirGen, language as 'en' | 'zh');
      setSparkResult(result);
    } catch (err) {
      setSparkError(t('aiStarterError'));
    } finally {
      setSparkLoading(false);
    }
  };

  const steps = [
    {
      title: t('step1'),
      icon: MessageSquare,
      color: 'primary',
      tips: en ? [
        "Ask 'What was your favorite physical object as a child?'",
        "Don't start with technology; start with shared feelings like 'boredom' or 'excitement'.",
        "Use the 'Tell me more' rule—when they say something interesting, don't move on immediately."
      ] : [
        "問問看：『你小時候最喜歡的實體物品是什麼？』",
        "不要從科技開始；從共同的情感開始，比如『無聊』或『興奮』的經驗。",
        "運用『多告訴我一點』原則——當他們說到有趣的事情時，不要立刻換話題。"
      ]
    },
    {
      title: t('step2'),
      icon: Coffee,
      color: 'secondary',
      tips: en ? [
        "Ask for a physical tutorial (cooking, knitting, card games).",
        "Collaborate on a 'Digital Heritage' project—help digitize old photos.",
        "Take a 'No-Tech' walk together and discuss what you see."
      ] : [
        "請教一項實作技巧（煮菜、編織、玩牌）。",
        "一起執行『數位遺產』計畫——幫忙將舊相片數位化。",
        "一起進行一場『無科技』散步，並聊聊路上看到的景色。"
      ]
    },
    {
      title: t('step3'),
      icon: Lightbulb,
      color: 'lavender',
      tips: en ? [
        "Listen to understand, not to rebut. Every generation's reaction is shaped by their era's trauma/triumph.",
        "Acknowledge that 'different' doesn't mean 'worse'.",
        "Validate their experience even if you can't relate to the specific circumstances."
      ] : [
        "為了理解而傾聽，而不是為了反駁。每個世代的反應都深受其時代背景影響。",
        "承認『不同』並不代表『更糟』。",
        "即使你無法感同身受，也要肯定他們的經歷是真實存在的。"
      ]
    }
  ];

  const prompts = [
    {
      text: en ? "What did a typical Saturday morning look like for you at age 10?" : "你 10 歲時，一個典型的周六早晨通常是怎麼度過的？",
      gen: en ? "Elders" : "長輩"
    },
    {
      text: en ? "What is something from your world today that you think I would find confusing?" : "你覺得現代世界中有什麼東西會讓我感到困惑？",
      gen: en ? "Younger" : "晚輩"
    },
    {
      text: en ? "If you could preserve one tradition for 100 years, what would it be?" : "如果你可以保留一項傳統 100 年，那會是什麼？",
      gen: en ? "Universal" : "通用"
    },
  ];

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <header className="mb-16 text-center space-y-4">
        <TypographicOrnament variant="flower" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-primary">{t('actionGuideTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('actionGuideDesc')}
        </p>
      </header>

      {/* AI Conversation Spark — full width, above the columns */}
      <section className="mb-16 p-8 sm:p-10 bg-brand-surface hand-drawn-border shadow-offset-lavender relative overflow-hidden">
        <div className="absolute -top-6 -right-6 opacity-5 text-[120px] select-none pointer-events-none">✦</div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-brand-tertiary-container text-brand-on-tertiary-container">
            <Sparkles size={22} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-on-surface">{t('aiStarterTitle')}</h2>
        </div>
        <p className="text-sm text-brand-on-surface/60 font-sans font-medium mb-8 max-w-2xl">
          {t('aiStarterDesc')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 block">
              {t('aiStarterYourGen')}
            </label>
            <select
              value={yourGen}
              onChange={e => setYourGen(e.target.value)}
              className="w-full bg-brand-surface-container-low border border-brand-outline/10 rounded-xl p-3 font-sans text-sm focus:outline-none focus:border-brand-tertiary transition-colors appearance-none"
            >
              <option value="">{en ? 'Select…' : '選擇…'}</option>
              {genOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-on-surface/40 block">
              {t('aiStarterTheirGen')}
            </label>
            <select
              value={theirGen}
              onChange={e => setTheirGen(e.target.value)}
              className="w-full bg-brand-surface-container-low border border-brand-outline/10 rounded-xl p-3 font-sans text-sm focus:outline-none focus:border-brand-tertiary transition-colors appearance-none"
            >
              <option value="">{en ? 'Select…' : '選擇…'}</option>
              {genOptions.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
        </div>

        <OffsetButton
          onClick={handleGenerateSpark}
          variant="lavender"
          disabled={!yourGen || !theirGen || sparkLoading}
          className="flex items-center gap-2 mb-6"
        >
          {sparkLoading ? (
            <><RefreshCcw size={16} className="animate-spin" /> {t('aiStarterGenerating')}</>
          ) : (
            <><Sparkles size={16} /> {t('aiStarterGenerate')}</>
          )}
        </OffsetButton>

        <AnimatePresence>
          {sparkResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-6 bg-brand-background border-2 border-brand-tertiary/30 rounded-2xl relative"
            >
              <div className="text-[10px] font-sans font-black uppercase tracking-widest text-brand-tertiary mb-3">
                {t('aiStarterResult')}
              </div>
              <p className="font-serif italic text-lg text-brand-on-surface/90 leading-relaxed">
                {sparkResult}
              </p>
              <button
                onClick={() => { setSparkResult(''); setYourGen(''); setTheirGen(''); }}
                className="mt-4 text-[10px] font-bold text-brand-tertiary hover:underline flex items-center gap-1"
              >
                <RefreshCcw size={10} /> {t('aiStarterTryAnother')}
              </button>
            </motion.div>
          )}
          {sparkError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-brand-secondary-container/30 border border-brand-secondary/20 rounded-xl flex items-start gap-3"
            >
              <AlertCircle size={16} className="text-brand-secondary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-on-surface/70">{sparkError}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <h2 className="text-3xl font-serif font-bold text-brand-primary flex items-center gap-3">
            <Zap className="text-brand-secondary" /> {en ? 'Three Steps to Connection' : '與家人連結的三步驟'}
          </h2>
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-brand-surface hand-drawn-border shadow-offset-primary relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                <step.icon size={80} />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${step.color === 'primary' ? 'bg-brand-primary-container text-brand-on-primary-container' : step.color === 'secondary' ? 'bg-brand-secondary-container text-brand-on-secondary-container' : 'bg-brand-tertiary-container text-brand-on-tertiary-container'}`}>
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-on-surface">{step.title}</h3>
              </div>

              <ul className="space-y-4">
                {step.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-1" />
                    <p className="text-sm text-brand-on-surface/70 leading-relaxed font-sans font-medium">
                      {tip}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="space-y-12">
          <section className="p-8 bg-brand-surface-container-highest hand-drawn-border shadow-offset-secondary">
            <h3 className="text-2xl font-serif font-bold text-brand-secondary mb-6 flex items-center gap-2">
              <PhoneCall size={24} /> {en ? 'Prompt Cards' : '對話小卡'}
            </h3>
            <p className="text-xs font-sans font-bold text-brand-on-surface/40 uppercase tracking-widest mb-8">
              {en ? 'Pick one for your next family call or visit.' : '下次家庭聚會時，選一張來試試看吧！'}
            </p>

            <div className="grid grid-cols-1 gap-4">
              {prompts.map((prompt, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-brand-background border-2 border-brand-outline/10 rounded-xl relative group cursor-help"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TypographicOrnament variant="diamond" className="text-xs" />
                  </div>
                  <p className="font-serif italic text-lg text-brand-primary mb-2 leading-tight">
                    "{prompt.text}"
                  </p>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-secondary/60">
                    {en ? 'Best for:' : '適合對象：'} {prompt.gen}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="text-center p-8 border-2 border-dashed border-brand-outline/20 rounded-3xl">
            <h4 className="text-lg font-serif font-bold text-brand-on-surface mb-2">
              {en ? 'Need a specific script?' : '需要開頭白嗎？'}
            </h4>
            <p className="text-sm text-brand-on-surface/60 font-sans font-medium mb-6">
              {en
                ? '"Hey [Grandparent/Child], I saw this interesting prompt on Generational Labels and was wondering…"'
                : '『嘿，我想跟你聊聊，我最近在「世代標籤」網站上看到一個有趣的話題...』'}
            </p>
            <p className="text-[10px] uppercase font-sans font-bold tracking-[0.2em] text-brand-primary/50">
              {en ? 'Use the AI Spark above to get a personalised version ↑' : '使用上方的 AI 對話啟動器獲得個人化版本 ↑'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
