import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { Heart, MessageCircle, Quote, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useStories } from '../contexts/StoryContext';

export const FamilyRoom: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { stories, likeStory } = useStories();
  const [activeStoryComments, setActiveStoryComments] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<'All' | 'Memory' | 'Advice' | 'Observation'>('All');

  const filteredStories = stories.filter(s => filter === 'All' || s.category === filter);

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center space-y-4">
        <TypographicOrnament variant="flower" className="text-3xl" />
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-secondary">{t('familyRoomTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-2xl mx-auto font-sans font-medium">
          {t('familyRoomDesc')}
        </p>
      </header>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          <Filter size={16} className="text-brand-on-surface/30 flex-shrink-0" />
          {['All', 'Memory', 'Advice', 'Observation'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                filter === f 
                  ? 'bg-brand-secondary text-brand-background border-brand-secondary' 
                  : 'bg-brand-surface text-brand-on-surface/40 border-brand-outline/10 hover:border-brand-secondary/40'
              }`}
            >
              {f === 'All' ? (language === 'en' ? 'All' : '全部') : t(f.toLowerCase())}
            </button>
          ))}
        </div>
        
        <OffsetButton onClick={() => navigate('/submit')} variant="secondary" className="flex items-center gap-2 px-8 py-4 w-full sm:w-auto">
          <Plus size={20} /> {t('shareStory')}
        </OffsetButton>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredStories.map((story, idx) => (
            <motion.div
              layout
              key={story.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className={`
                break-inside-avoid p-8 bg-brand-surface hand-drawn-border relative
                ${story.color === 'primary' ? 'shadow-offset-primary' : story.color === 'secondary' ? 'shadow-offset-secondary' : 'shadow-offset-lavender'}
              `}
            >
              <div className="absolute top-4 right-4 text-brand-on-surface/10">
                <Quote size={40} />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-brand-background font-serif font-bold ${story.color === 'primary' ? 'bg-brand-primary' : story.color === 'secondary' ? 'bg-brand-secondary' : 'bg-brand-tertiary'}`}>
                  {story.author[0]}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-on-surface leading-none">{story.author}</h4>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-on-surface/40 leading-none">
                    {t(story.role.toLowerCase())}
                  </span>
                </div>
              </div>

              {story.image && (
                <div className="mb-4 rounded-xl overflow-hidden hand-drawn-border max-h-64">
                  <img src={story.image} alt="Story" className="w-full h-full object-cover" />
                </div>
              )}

              <p className="text-brand-on-surface/70 font-sans italic leading-relaxed mb-6">
                "{story.content}"
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-brand-outline/10">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-on-surface/30">
                  {story.date}
                </span>
                <div className="flex items-center gap-3 text-brand-on-surface/30">
                  <button 
                    onClick={() => likeStory(story.id)}
                    className="hover:text-brand-secondary transition-colors flex items-center gap-1 group/btn"
                  >
                    <Heart size={14} className={story.likes > 0 ? "fill-brand-secondary text-brand-secondary" : ""} />
                    <span className="text-[10px] font-bold">{story.likes}</span>
                  </button>
                  <button 
                    onClick={() => setActiveStoryComments(activeStoryComments === story.id ? null : story.id)}
                    className={`hover:text-brand-primary transition-colors flex items-center gap-1 ${activeStoryComments === story.id ? 'text-brand-primary' : ''}`}
                  >
                    <MessageCircle size={14} />
                    <span className="text-[10px] font-bold">4</span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {activeStoryComments === story.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-brand-outline/5 space-y-4"
                  >
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-on-surface/40 mb-2">
                      {t('comments')}
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-surface border border-brand-outline/20 flex-shrink-0" />
                        <div className="bg-brand-surface-container rounded-xl p-2 text-[11px] text-brand-on-surface/80 flex-grow">
                          {language === 'en' ? 'Such a beautiful memory!' : '真是美好的回憶！'}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <input 
                        type="text" 
                        placeholder={t('addComment')}
                        className="flex-grow bg-brand-surface-container-low border border-brand-outline/10 rounded-lg py-2 px-3 text-[11px] focus:outline-none focus:border-brand-primary/50"
                      />
                      <button className="px-3 py-1 bg-brand-primary text-brand-background rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-colors">
                        {t('post')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="absolute -bottom-2 -right-2 transform rotate-3">
                <span className={`px-2 py-0.5 rounded text-[8px] font-sans font-bold uppercase tracking-widest text-brand-background ${story.color === 'primary' ? 'bg-brand-primary' : story.color === 'secondary' ? 'bg-brand-secondary' : 'bg-brand-tertiary'}`}>
                  {t(story.category.toLowerCase())}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="mt-20 p-12 bg-brand-surface-container-high rounded-3xl text-center space-y-6">
        <TypographicOrnament variant="scroll" className="text-3xl" />
        <h2 className="text-3xl font-serif font-bold text-brand-primary">
          {language === 'en' ? 'The Archive is Growing' : '檔案庫持續壯大中'}
        </h2>
        <p className="text-brand-on-surface/60 max-w-xl mx-auto font-sans font-medium text-sm leading-relaxed">
          {language === 'en' 
            ? "Our family room expands with every shared breath. Whether it's a blurry photo, a scanned recipe, or a simple 'I'm thinking of you,' your contribution builds the bridge."
            : "故事牆隨著每一次的分享而豐富。無論是一張模糊的老相片、一份掃描的食譜，或是一句簡單的『我想你』，你的每一份分享都在穩固這座代際之橋。"}
        </p>
      </div>
    </div>
  );
};
