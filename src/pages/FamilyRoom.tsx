import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { Heart, MessageCircle, Quote, Plus, Filter, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useStories } from '../contexts/StoryContext';

export const FamilyRoom: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { stories, likeStory, addComment } = useStories();
  const [activeStoryComments, setActiveStoryComments] = React.useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'All' | 'Memory' | 'Advice' | 'Observation'>('All');
  const [likedStories, setLikedStories] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('gb_liked_stories');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch { return new Set(); }
  });

  const filteredStories = stories.filter(s => filter === 'All' || s.category === filter);

  const handleLike = (id: string) => {
    if (likedStories.has(id)) return; // prevent double-liking
    likeStory(id);
    const next = new Set(likedStories).add(id);
    setLikedStories(next);
    localStorage.setItem('gb_liked_stories', JSON.stringify([...next]));
  };

  const handlePostComment = (storyId: string) => {
    const text = commentDrafts[storyId] || '';
    if (!text.trim()) return;
    addComment(storyId, text);
    setCommentDrafts(prev => ({ ...prev, [storyId]: '' }));
  };

  const filterLabels: Record<string, string> = {
    All: language === 'en' ? 'All' : '全部',
    Memory: t('memory'),
    Advice: t('advice'),
    Observation: t('observation'),
  };

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
          {(['All', 'Memory', 'Advice', 'Observation'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap ${
                filter === f
                  ? 'bg-brand-secondary text-brand-background border-brand-secondary'
                  : 'bg-brand-surface text-brand-on-surface/40 border-brand-outline/10 hover:border-brand-secondary/40'
              }`}
            >
              {filterLabels[f]}
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-brand-background font-serif font-bold flex-shrink-0 ${story.color === 'primary' ? 'bg-brand-primary' : story.color === 'secondary' ? 'bg-brand-secondary' : 'bg-brand-tertiary'}`}>
                  {story.author[0]}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-on-surface leading-none">{story.author}</h4>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-brand-on-surface/40 leading-none">
                    {story.role}
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
                    onClick={() => handleLike(story.id)}
                    disabled={likedStories.has(story.id)}
                    className={`transition-colors flex items-center gap-1 ${likedStories.has(story.id) ? 'text-brand-secondary' : 'hover:text-brand-secondary'}`}
                    title={likedStories.has(story.id) ? (language === 'en' ? 'Already liked' : '已按讚') : (language === 'en' ? 'Like' : '按讚')}
                  >
                    <Heart size={14} className={likedStories.has(story.id) ? 'fill-brand-secondary text-brand-secondary' : ''} />
                    <span className="text-[10px] font-bold">{story.likes}</span>
                  </button>
                  <button
                    onClick={() => setActiveStoryComments(activeStoryComments === story.id ? null : story.id)}
                    className={`hover:text-brand-primary transition-colors flex items-center gap-1 ${activeStoryComments === story.id ? 'text-brand-primary' : ''}`}
                  >
                    <MessageCircle size={14} />
                    <span className="text-[10px] font-bold">{story.comments.length}</span>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {activeStoryComments === story.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-4 pt-4 border-t border-brand-outline/5"
                  >
                    <div className="text-[10px] uppercase tracking-widest font-bold text-brand-on-surface/40 mb-3">
                      {t('comments')} ({story.comments.length})
                    </div>

                    {story.comments.length > 0 ? (
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {story.comments.map(comment => (
                          <div key={comment.id} className="flex gap-2">
                            <div className="w-6 h-6 rounded-full bg-brand-surface-container border border-brand-outline/20 flex items-center justify-center text-[9px] font-bold text-brand-on-surface/50 flex-shrink-0">
                              ✦
                            </div>
                            <div className="flex-grow">
                              <div className="bg-brand-surface-container rounded-xl p-2.5 text-[11px] text-brand-on-surface/80 leading-relaxed">
                                {comment.text}
                              </div>
                              <span className="text-[9px] text-brand-on-surface/30 font-sans pl-1">{comment.date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] italic text-brand-on-surface/30 mb-3">
                        {language === 'en' ? 'Be the first to leave a comment.' : '成為第一個留言的人吧。'}
                      </p>
                    )}

                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={commentDrafts[story.id] || ''}
                        onChange={e => setCommentDrafts(prev => ({ ...prev, [story.id]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && handlePostComment(story.id)}
                        placeholder={t('addComment')}
                        className="flex-grow bg-brand-surface-container-low border border-brand-outline/10 rounded-lg py-2 px-3 text-[11px] focus:outline-none focus:border-brand-primary/50 transition-colors"
                      />
                      <button
                        onClick={() => handlePostComment(story.id)}
                        className="px-3 py-2 bg-brand-primary text-brand-background rounded-lg flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-colors"
                      >
                        <Send size={11} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute -bottom-2 -right-2 transform rotate-3">
                <span className={`px-2 py-0.5 rounded text-[8px] font-sans font-bold uppercase tracking-widest text-brand-background ${story.color === 'primary' ? 'bg-brand-primary' : story.color === 'secondary' ? 'bg-brand-secondary' : 'bg-brand-tertiary'}`}>
                  {filterLabels[story.category]}
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
        <OffsetButton onClick={() => navigate('/submit')} variant="primary" className="mx-auto">
          {t('shareStory')}
        </OffsetButton>
      </div>
    </div>
  );
};
