import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TypographicOrnament } from '../components/ui/TypographicOrnament';
import { OffsetButton } from '../components/ui/OffsetButton';
import { Send, Image, PenTool, Sparkles, RefreshCcw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useStories } from '../contexts/StoryContext';

export const SubmitStory: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { addStory } = useStories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'Memory' as 'Memory' | 'Advice' | 'Observation',
    content: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add real story to global state
    addStory({
      author: formData.name,
      role: formData.role || 'Family Member',
      category: formData.category,
      content: formData.content,
      image: selectedImage || undefined,
      color: formData.category === 'Memory' ? 'primary' : formData.category === 'Advice' ? 'secondary' : 'lavender'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => navigate('/family-room'), 3000);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 bg-brand-primary-container rounded-full flex items-center justify-center mx-auto hand-drawn-border shadow-offset-primary">
            <Sparkles className="text-brand-on-primary-container" size={32} />
          </div>
          <h2 className="text-4xl font-serif font-bold text-brand-primary">{language === 'en' ? 'Thank you, Bridge Builder!' : '謝謝你，串連者！'}</h2>
          <p className="text-brand-on-surface/60 font-sans font-medium">
            {language === 'en' ? 'Your piece has been sent to our moderators. We curate stories with care to ensure the room stays warm.' : '你的故事已經送出審核。我們會用心挑選，確保空間溫暖人心。'}
          </p>
          <p className="text-xs text-brand-secondary italic">
            {language === 'en' ? 'Taking you back to the Family Room...' : '正帶你回到故事牆...'}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-3xl mx-auto">
      <header className="mb-12 text-center space-y-4">
        <TypographicOrnament variant="scroll" className="text-3xl" />
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary">{t('submitTitle')}</h1>
        <p className="text-brand-on-surface/60 max-w-xl mx-auto font-sans font-medium">
          {t('submitDesc')}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="bg-brand-surface hand-drawn-border shadow-offset-secondary p-8 sm:p-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-sans font-black uppercase tracking-widest text-brand-secondary block">
              {language === 'en' ? 'Your Name' : '你的名字'}
            </label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder={t('namePlaceholder')}
              className="w-full bg-brand-surface-container-low border border-brand-outline/10 rounded-xl p-4 font-sans text-sm focus:outline-none focus:border-brand-primary transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-sans font-black uppercase tracking-widest text-brand-secondary block">
              {t('roleLabel')}
            </label>
            <select
              required
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-brand-surface-container-low border border-brand-outline/10 rounded-xl p-4 font-sans text-sm focus:outline-none focus:border-brand-primary transition-colors appearance-none"
            >
              <option value="">{language === 'en' ? 'Select Role' : '選擇身份'}</option>
              <option value="Parent">{t('parent')}</option>
              <option value="Child">{t('child')}</option>
              <option value="Grandparent">{t('grandparent')}</option>
              <option value="Grandchild">{t('grandchild')}</option>
              <option value="Silent">{language === 'en' ? 'Silent Generation' : '沉默世代'}</option>
              <option value="Boomers">{language === 'en' ? 'Baby Boomer' : '嬰兒潮'}</option>
              <option value="GenX">Gen X</option>
              <option value="Millennial">Millennial</option>
              <option value="GenZ">Gen Z</option>
              <option value="Alpha">Gen Alpha</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-sans font-black uppercase tracking-widest text-brand-secondary block">
            {t('categoryLabel')}
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'Memory', label: t('memory') },
              { id: 'Advice', label: t('advice') },
              { id: 'Observation', label: t('observation') }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({...formData, category: cat.id as any})}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                  formData.category === cat.id 
                    ? 'bg-brand-primary text-brand-background border-brand-primary' 
                    : 'bg-brand-surface-container text-brand-on-surface/60 border-brand-outline/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-sans font-black uppercase tracking-widest text-brand-secondary block">
            {language === 'en' ? 'Your Story Fragment' : '你的片段故事'}
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder={t('storyPlaceholder')}
            className="w-full h-48 bg-brand-surface-container-low border border-brand-outline/10 rounded-xl p-6 font-sans text-sm resize-none focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6 pt-4">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
            <button 
              type="button"
              onClick={handleUploadClick}
              className="flex items-center gap-2 text-brand-on-surface/40 hover:text-brand-primary cursor-pointer transition-colors"
            >
              <Image size={18} />
              <span className="text-xs font-bold font-sans">{t('attachPhoto')}</span>
            </button>
            <div className="flex items-center gap-2 text-brand-on-surface/40 hover:text-brand-secondary cursor-pointer transition-colors">
              <PenTool size={18} />
              <span className="text-xs font-bold font-sans">{t('addIllustration')}</span>
            </div>
          </div>

          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="relative inline-block"
              >
                <div className="relative w-32 h-32 hand-drawn-border overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-brand-primary text-brand-background rounded-full flex items-center justify-center shadow-md hover:bg-brand-primary/90 transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8 border-t border-brand-outline/10">
          <OffsetButton
            disabled={isSubmitting}
            type="submit"
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 py-4"
          >
            {isSubmitting ? (
              <RefreshCcw className="animate-spin" size={20} />
            ) : (
              <>
                <Send size={20} /> {t('sendStory')}
              </>
            )}
          </OffsetButton>
        </div>
      </form>
    </div>
  );
};
