import React from 'react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { WavyDivider } from '../components/ui/WavyDivider';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="py-12 px-6 overflow-x-hidden">
      <section className="max-w-5xl mx-auto text-center space-y-8 relative">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TypographicOrnament variant="flower" className="text-3xl mb-4" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-brand-primary leading-[1.1]"
          >
            {t('heroTitle')} <br />
            <span className="italic text-brand-secondary">{t('heroTitleItalic')}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-brand-on-surface/70 leading-relaxed font-light"
          >
            {t('heroDesc')}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 pt-4"
        >
          <OffsetButton onClick={() => navigate('/explorer')} variant="primary" className="text-lg px-10 py-4">
            {t('enterExplorer')}
          </OffsetButton>
          <OffsetButton onClick={() => navigate('/family-room')} variant="secondary" className="text-lg px-10 py-4">
            {t('visitFamilyRoom')}
          </OffsetButton>
        </motion.div>
      </section>

      <WavyDivider className="my-24" />

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: t('fieldGuideTitle'),
            desc: t('fieldGuideDesc'),
            icon: "◓",
            path: "/explorer",
            color: "lavender"
          },
          {
            title: t('convBridgeTitle'),
            desc: t('convBridgeDesc'),
            icon: "⟢",
            path: "/action-guide",
            color: "primary"
          },
          {
            title: t('quizTitle'),
            desc: t('quizDesc'),
            icon: "⬥",
            path: "/quiz",
            color: "secondary"
          }
        ].map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`
              p-8 bg-brand-surface hand-drawn-border
              ${item.color === 'primary' ? 'shadow-offset-primary' : item.color === 'secondary' ? 'shadow-offset-secondary' : 'shadow-offset-lavender'}
              hover:-translate-x-1 hover:-translate-y-1 transition-transform cursor-pointer
            `}
            onClick={() => navigate(item.path)}
          >
            <div className="text-3xl mb-6 text-brand-primary">{item.icon}</div>
            <h3 className="text-2xl font-serif font-bold text-brand-on-surface mb-4">{item.title}</h3>
            <p className="text-brand-on-surface/60 font-sans font-medium text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto mt-32 text-center bg-brand-surface-container-high hand-drawn-border p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl font-serif italic">“</div>
        <TypographicOrnament variant="scroll" className="text-4xl mb-6" />
        <h2 className="text-3xl font-serif italic text-brand-secondary mb-8">
          "The biggest gap between generations is often just a conversation that hasn't happened yet."
        </h2>
        <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-brand-on-surface/40">
          — Founding Bridge Builder
        </p>
      </section>
    </div>
  );
};
