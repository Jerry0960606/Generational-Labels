import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Story {
  id: string;
  author: string;
  role: string;
  content: string;
  category: 'Memory' | 'Advice' | 'Observation';
  date: string;
  image?: string;
  color: 'primary' | 'secondary' | 'lavender' | 'outline';
  likes: number;
}

interface StoryContextType {
  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'likes' | 'date'>) => void;
  likeStory: (id: string) => void;
}

const INITIAL_STORIES: Story[] = [
  {
    id: '1',
    author: 'Elena',
    role: 'Grandparent',
    content: 'My grandmother used to say that a family is like a quilt—different pieces stitched together by the thread of love. I finally understand what she meant today.',
    category: 'Memory',
    date: 'April 12, 2026',
    color: 'primary',
    likes: 24
  },
  {
    id: '2',
    author: 'Marcus',
    role: 'Child',
    content: 'I taught my grandpa how to use emojis today. He keeps sending me the "sparkles" emoji for everything. It\'s making my day.',
    category: 'Observation',
    date: 'April 15, 2026',
    color: 'secondary',
    likes: 156
  },
  {
    id: '3',
    author: 'Sarah J.',
    role: 'Parent',
    content: 'Advice for my daughter: Don\'t worry about having it all figured out at 20. Your grandmother was still finding herself at 50, and she was the happiest person I knew.',
    category: 'Advice',
    date: 'April 18, 2026',
    color: 'lavender',
    likes: 89
  }
];

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('generational_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  useEffect(() => {
    localStorage.setItem('generational_stories', JSON.stringify(stories));
  }, [stories]);

  const addStory = (newStory: Omit<Story, 'id' | 'likes' | 'date'>) => {
    const story: Story = {
      ...newStory,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: 0
    };
    setStories([story, ...stories]);
  };

  const likeStory = (id: string) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  return (
    <StoryContext.Provider value={{ stories, addStory, likeStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
};
