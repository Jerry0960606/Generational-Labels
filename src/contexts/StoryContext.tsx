import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

export interface Comment {
  id: string;
  text: string;
  date: string;
}

export interface Story {
  id: string;
  author: string;
  role: string;
  content: string;
  category: 'Memory' | 'Advice' | 'Observation';
  date: string;
  image?: string;
  emoji?: string;
  color: 'primary' | 'secondary' | 'lavender' | 'outline';
  likes: number;
  comments: Comment[];
  createdAt?: number;
  authorId?: string;
}

interface StoryContextType {
  stories: Story[];
  addStory: (story: Omit<Story, 'id' | 'likes' | 'date' | 'comments' | 'authorId'>) => Promise<void>;
  likeStory: (id: string) => Promise<void>;
  addComment: (storyId: string, text: string) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  currentAuthorId: string;
}

const INITIAL_STORIES: Story[] = [
  {
    id: 'example-1',
    author: 'Elena (Example)',
    role: 'Grandparent',
    content: 'My grandmother used to say that a family is like a quilt—different pieces stitched together by the thread of love. I finally understand what she meant today.',
    category: 'Memory',
    date: 'April 12, 2026',
    color: 'primary',
    likes: 24,
    comments: [
      { id: 'c1', text: 'Such a beautiful metaphor. My nana used to say something similar!', date: 'April 13, 2026' }
    ]
  },
  {
    id: 'example-2',
    author: 'Marcus (Example)',
    role: 'Child',
    content: "I taught my grandpa how to use emojis today. He keeps sending me the \"sparkles\" emoji for everything. It's making my day.",
    category: 'Observation',
    date: 'April 15, 2026',
    color: 'secondary',
    likes: 156,
    comments: [
      { id: 'c2', text: "This is the most wholesome thing I've read all week!", date: 'April 16, 2026' },
      { id: 'c3', text: 'My grandma did the same with the heart emoji \ud83d\ude02', date: 'April 17, 2026' }
    ]
  },
  {
    id: 'example-3',
    author: 'Sarah J. (Example)',
    role: 'Parent',
    content: "Advice for my daughter: Don't worry about having it all figured out at 20. Your grandmother was still finding herself at 50, and she was the happiest person I knew.",
    category: 'Advice',
    date: 'April 18, 2026',
    color: 'lavender',
    likes: 89,
    comments: []
  }
];

const StoryContext = createContext<StoryContextType | undefined>(undefined);

// Migrate old localStorage data (stories without comments field)
const migrateStories = (raw: Story[]): Story[] =>
  raw.map(s => ({ comments: [], ...s }));

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAuthorId] = useState<string>(() => {
    try {
      let id = localStorage.getItem('gb_author_id');
      if (!id) {
        id = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('gb_author_id', id);
      }
      return id;
    } catch {
      return Math.random().toString(36).substr(2, 9);
    }
  });
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);

  useEffect(() => {
    if (!db) {
      // fallback: use localStorage if Firebase not connected
      const saved = localStorage.getItem('generational_stories');
      if (saved) setStories(migrateStories(JSON.parse(saved)));
      return;
    }

    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedStories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Story[];

      setStories([...fetchedStories, ...INITIAL_STORIES]);
    }, (error) => {
      console.error("Error fetching stories:", error);
    });

    return () => unsubscribe();
  }, []);

  const addStory = async (newStory: Omit<Story, 'id' | 'likes' | 'date' | 'comments' | 'authorId'>) => {
    const storyData = {
      ...newStory,
      authorId: currentAuthorId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      likes: 0,
      comments: [],
      createdAt: Date.now()
    };

    if (db) {
      await addDoc(collection(db, 'stories'), storyData);
    } else {
      const story: Story = {
        ...storyData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setStories(prev => [story, ...prev]);
    }
  };

  const likeStory = async (id: string) => {
    if (db) {
      const storyRef = doc(db, 'stories', id);
      const storyToUpdate = stories.find(s => s.id === id);
      if (storyToUpdate) {
        await updateDoc(storyRef, { likes: storyToUpdate.likes + 1 });
      }
    } else {
      setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
    }
  };

  const addComment = async (storyId: string, text: string) => {
    if (!text.trim()) return;
    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    if (db) {
      const storyRef = doc(db, 'stories', storyId);
      const storyToUpdate = stories.find(s => s.id === storyId);
      if (storyToUpdate) {
        await updateDoc(storyRef, { comments: [...storyToUpdate.comments, comment] });
      }
    } else {
      setStories(prev =>
        prev.map(s => s.id === storyId ? { ...s, comments: [...s.comments, comment] } : s)
      );
    }
  };

  const deleteStory = async (id: string) => {
    if (db) {
      try {
        await deleteDoc(doc(db, 'stories', id));
      } catch (e) {
        console.error("Error deleting story:", e);
      }
    } else {
      setStories(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <StoryContext.Provider value={{ stories, addStory, likeStory, addComment, deleteStory, currentAuthorId }}>
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
