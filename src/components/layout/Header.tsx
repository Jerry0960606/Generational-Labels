import React from 'react';
import { NavLink } from 'react-router-dom';
import { Compass, Home, BookOpen, MessageCircle, Heart, Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('explorer'), path: '/explorer', icon: Compass },
    { name: t('familyRoom'), path: '/family-room', icon: Heart },
    { name: t('actionGuide'), path: '/action-guide', icon: BookOpen },
    { name: t('bridgeQuiz'), path: '/quiz', icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 py-4 px-6 bg-brand-background/80 backdrop-blur-md border-b-2 border-brand-outline/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary-container rounded-full flex items-center justify-center hand-drawn-border paper-offset-alt group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
            <span className="text-xl font-bold font-serif text-brand-on-primary-container">GL</span>
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight text-brand-primary hidden sm:inline-block">
            Generational <span className="text-brand-secondary">Labels</span>
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                font-sans font-semibold text-sm transition-colors flex items-center gap-1.5 py-1
                ${isActive ? 'text-brand-primary wavy-underline' : 'text-brand-on-surface/60 hover:text-brand-primary'}
              `}
            >
              <item.icon size={16} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-brand-surface-container-low rounded-full px-2 py-1 border border-brand-outline/10">
            <Languages size={14} className="text-brand-on-surface/40" />
            <button
              onClick={() => setLanguage('en')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${language === 'en' ? 'bg-brand-primary text-brand-background' : 'text-brand-on-surface/40 hover:text-brand-primary'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('zh')}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${language === 'zh' ? 'bg-brand-secondary text-brand-background' : 'text-brand-on-surface/40 hover:text-brand-secondary'}`}
            >
              中文
            </button>
          </div>

          <NavLink to="/submit">
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-secondary text-brand-background rounded-full font-sans font-bold text-[10px] sm:text-xs hover:bg-brand-secondary/90 transition-colors">
              {t('shareStory')}
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
