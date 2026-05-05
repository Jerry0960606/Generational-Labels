/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Version: 1.0.1 - Final Deployment with Unified Styles
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Explorer } from './pages/Explorer';
import { Comparison } from './pages/Comparison';
import { SlangDictionary } from './pages/SlangDictionary';
import { FamilyRoom } from './pages/FamilyRoom';
import { ActionGuide } from './pages/ActionGuide';
import { Quiz } from './pages/Quiz';
import { SubmitStory } from './pages/SubmitStory';
import { LanguageProvider } from './contexts/LanguageContext';
import { StoryProvider } from './contexts/StoryContext';

export default function App() {
  return (
    <LanguageProvider>
      <StoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explorer" element={<Explorer />} />
              <Route path="comparison" element={<Comparison />} />
              <Route path="dictionary" element={<SlangDictionary />} />
              <Route path="family-room" element={<FamilyRoom />} />
              <Route path="action-guide" element={<ActionGuide />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="submit" element={<SubmitStory />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoryProvider>
    </LanguageProvider>
  );
}
