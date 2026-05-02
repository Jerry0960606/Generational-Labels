import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const MobileNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { name: t('home'), path: '/', icon: Home },
    { name: t('explorer'), path: '/explorer', icon: Compass },
    { name: t('familyRoom'), path: '/family-room', icon: Heart },
    { name: t('actionGuide'), path: '/action-guide', icon: BookOpen },
    { name: t('bridgeQuiz'), path: '/quiz', icon: MessageCircle },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-background/95 backdrop-blur-md border-t-2 border-brand-outline/20">
      <div className="flex items-stretch justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-3 px-2 flex-1 transition-colors relative ${
                isActive
                  ? 'text-brand-primary'
                  : 'text-brand-on-surface/40 hover:text-brand-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className={`text-[9px] font-sans font-bold uppercase tracking-wider leading-none ${isActive ? 'text-brand-primary' : ''}`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand-primary rounded-full pointer-events-none" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
