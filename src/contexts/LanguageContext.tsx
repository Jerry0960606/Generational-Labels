import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}

export const translations: Translations = {
  // Header & Nav
  home: { en: 'Home', zh: '首頁' },
  explorer: { en: 'Generations', zh: '認識世代' },
  familyRoom: { en: 'Stories', zh: '故事牆' },
  actionGuide: { en: 'Tips', zh: '溝通技巧' },
  bridgeQuiz: { en: 'Quiz', zh: '測驗' },
  shareStory: { en: 'Write Story', zh: '分享故事' },

  // Home Page
  heroTitle: { en: 'Connecting', zh: '跨越' },
  heroTitleItalic: { en: 'Generations.', zh: '世代距離。' },
  heroDesc: { en: 'A space to understand how different ages think, share family memories, and learn how to talk to each other better.', zh: '在這裡，你可以了解不同年齡層的想法，分享珍貴的家族回憶，並學習如何更輕鬆地與長輩或青少年溝通。' },
  enterExplorer: { en: 'Learn about Generations', zh: '認識不同世代' },
  visitFamilyRoom: { en: 'Read Stories', zh: '看看大家的故事' },

  // Page Shared
  explorerTitle: { en: 'Generation Guide', zh: '世代圖鑑' },
  explorerDesc: { en: 'A study of the unique cultures, values, and languages that shape us.', zh: '了解各個世代獨有的文化、價值觀以及溝通語言。' },
  familyRoomTitle: { en: 'The Story Wall', zh: '故事牆' },
  familyRoomDesc: { en: 'A warm corner to share memories and advice that transcend time.', zh: '一個溫暖的小角落，用來分享跨越時光的記憶與建議。' },
  actionGuideTitle: { en: 'Communication Tips', zh: '溝通小技巧' },
  actionGuideDesc: { en: 'Practical tools for meaningful cross-generational dialogue.', zh: '幫助你與不同世代開啟有意義對話的實用工具。' },
  quizPageTitle: { en: 'The Culture Quiz', zh: '世代文化測驗' },
  quizPageDesc: { en: 'Discover your generational empathy and bridge-building style.', zh: '測測看你對不同世代的共情能力，以及你的溝通風格。' },
  submitTitle: { en: 'Add a Memory', zh: '留下一段回憶' },
  submitDesc: { en: 'A piece of advice or a simple observation. Your contribution keeps the bridge alive.', zh: '一句建議或一個簡單的觀察，你的分享能讓世代間的橋樑更穩固。' },

  // Home Cards
  fieldGuideTitle: { en: 'Generation Guide', zh: '世代圖鑑' },
  fieldGuideDesc: { en: 'Learn the slang and values of everyone from your grandparents to your grandkids.', zh: '一次搞懂從阿公阿嬤到 Z 世代、Alpha 世代都在想什麼，還有他們的流行語。' },
  convBridgeTitle: { en: 'How to Talk', zh: '怎麼好好聊天？' },
  convBridgeDesc: { en: "Practical tips to help you start conversations that don't end in awkward silence.", zh: '提供實用的聊天主題，讓你與家人聚餐時不再尷尬沒話聊。' },
  quizTitle: { en: 'Culture Check', zh: '你是哪個世代的人？' },
  quizDesc: { en: 'Take a quick test to see how well you navigate different generational cultures.', zh: '測測看你的思維更偏向哪個世代，以及你與其他世代溝通的契合度。' },

  // Onboarding
  onboardingWelcome: { en: 'Welcome!', zh: '歡迎！' },
  onboardingIntro: { en: "This site helps you connect with family across different ages. Here's how it works:", zh: '這個網站是為了幫助你和不同年齡的家人聊天而設計的。簡單介紹一下功能：' },
  onboardingStep1: { en: 'Generation Guide: Learn about the values and slang of different eras.', zh: '1. 世代圖鑑：了解阿公阿嬤或孫子孫女那個年代的價值觀和流行語。' },
  onboardingStep2: { en: 'Stories: Read real family memories and share your own pieces.', zh: '2. 故事牆：在這裡看大家分享的人生故事，你也可以寫下自己的。' },
  onboardingStep3: { en: 'Tips & Quiz: Get ideas on how to start a talk and test your skills.', zh: '3. 溝通與測驗：找不到話題嗎？這裡有實用的聊天技巧和趣味測驗。' },
  onboardingGotIt: { en: "Got it, let's go!", zh: '了解，開始體驗吧！' },

  // Quiz Questions (7 questions)
  q1Text: { en: "You hear a younger person use a term you've never heard (e.g., 'Skibidi'). What's your instinct?", zh: '當你聽到年輕人說一些你聽不懂的流行語（例如：Skibidi）時，你的反應是？' },
  q1o1: { en: 'Google it immediately and try to use it later.', zh: '立刻去 Google，然後試著在下次聊天時用用看。' },
  q1o2: { en: "Ask them to explain it and why it's popular.", zh: '直接請他們解釋那是什麼意思，還有為什麼會流行。' },
  q1o3: { en: 'Roll your eyes and complain about the slang.', zh: '翻個白眼，覺得現在年輕人的用語真讓人搞不懂。' },
  q1o4: { en: 'Ignore it and hope it goes away.', zh: '裝沒聽到，反正過陣子就不流行了吧。' },

  q2Text: { en: "You see a family member doing something 'the old fashioned way'. How do you react?", zh: '當你看到家人用「老派」的方式做事（比如手寫支票）時，你會？' },
  q2o1: { en: "Offer to show them a 'better' digital way immediately.", zh: '立刻掏出手機示範什麼是更方便的「數位化」方式。' },
  q2o2: { en: 'Watch for a moment and ask about the satisfaction of physical tasks.', zh: '觀察一下，並詢問親手操作是否有一種特別的踏實感。' },
  q2o3: { en: 'Post a funny photo of it on social media.', zh: '覺得太奇特了，拍張照傳到社群軟體上當笑話。' },
  q2o4: { en: "Let them be; people have their own rhythms.", zh: '隨他們去吧，每個人都有自己的步調。' },

  q3Text: { en: 'A younger person corrects you on a sensitive social topic. How do you feel?', zh: '當年輕人在某個敏感的社會議題上糾正你時，你感覺如何？' },
  q3o1: { en: 'Defensive. I have more life experience.', zh: '防衛。我的社會經驗比他們豐富多了。' },
  q3o2: { en: 'Interested. I want to hear their perspective.', zh: '感興趣。我想聽聽他們的觀點。' },
  q3o3: { en: "Confused. I don't understand why it matters so much.", zh: '困惑。我不懂為什麼這件事這麼重要。' },
  q3o4: { en: "Dismissive. It's just a phase.", zh: '不屑。這只是一個階段性的流行罷了。' },

  q4Text: { en: "Your grandparent tells a story you've heard ten times already. You:", zh: '長輩又在講那個你聽過十次的陳年往事時，你會：' },
  q4o1: { en: 'Listen intently and ask a new question about a detail.', zh: '專心聽，並針對細節問一個以前沒問過的問題。' },
  q4o2: { en: 'Finish the story for them to save time.', zh: '幫他們把故事講完，比較省時間。' },
  q4o3: { en: 'Look at your phone while they talk.', zh: '邊聽邊滑手機。' },
  q4o4: { en: 'Politely interrupt and change the subject.', zh: '禮貌地打斷並換個話題。' },

  q5Text: { en: 'Everyone is on their phones during a family meal. What do you do?', zh: '家庭聚餐時大家都在滑手機，你會怎麼做？' },
  q5o1: { en: 'Share a fun fact or photo from your phone to start a conversation.', zh: '在手機上分享一個有趣的冷知識或照片來開啟對話。' },
  q5o2: { en: 'Eat in silence and feel annoyed.', zh: '安靜吃我的飯，心裡默默覺得很煩。' },
  q5o3: { en: 'Join them and browse social media too.', zh: '加入他們，也開始滑我的社群軟體。' },
  q5o4: { en: 'Politely ask everyone to put phones away for 10 minutes.', zh: '客氣地請大家暫時放下手機 10 分鐘。' },

  q6Text: { en: 'You find a piece of technology (like a rotary phone or a VR headset) alien. You:', zh: '你發現一件讓你感到陌生的科技產品（如轉盤電話或 VR 頭盔）時，你會：' },
  q6o1: { en: 'Ask someone from that era to teach you how to use it.', zh: '請那個世代的人教你怎麼使用它。' },
  q6o2: { en: "Assume it's obsolete anyway.", zh: '反正這東西遲早會過時。' },
  q6o3: { en: 'Try to figure it out yourself but give up quickly.', zh: '試著自己摸索，但很快就放棄。' },
  q6o4: { en: 'Avoid it completely.', zh: '完全避開它。' },

  q7Text: { en: "A family member wants to share 'their' music with you. Your reaction?", zh: '家人想跟你分享「他們那個年代」的音樂時，你的反應是？' },
  q7o1: { en: 'Listen and try to find a similar artist you like.', zh: '聽聽看，並試著找一個你喜歡的類似風格歌手。' },
  q7o2: { en: "Compliment them but say 'it's not for me'.", zh: "稱讚他們，但說「這不是我的菜」。" },
  q7o3: { en: 'Wear headphones and listen to your own.', zh: '戴上耳機聽自己的音樂。' },
  q7o4: { en: 'Ask about the memory associated with that song.', zh: '詢問這首歌與他們之間的特別回憶。' },

  // Detailed Quiz Results
  resultWallBuilder: { en: 'The Legacy Guardian (Wall Builder)', zh: '傳統守護者 (築牆者)' },
  resultWallTraits: { en: 'Core Mindset: You value the "tried and true." You believe in the wisdom of experience and the importance of preserving cultural and familial roots.', zh: '核心思維：你重視「經得起時間考驗」的事物。你相信經驗的智慧，並認為保存文化與家族根源至關重要。' },
  resultWallWatchOut: { en: 'Blind Spots: By prioritizing tradition, you might inadvertently signal that new ideas are unwelcome. This can lead to a communication block.', zh: '潛在盲點：過於重視傳統可能會無意中傳遞出「不歡迎新思想」的訊號。這可能導致溝通停滯。' },
  resultWallGrow: { en: 'Next Step: Practice "Active curiosity." Tomorrow, ask a younger person to explain one trend they love without offering a counter-opinion.', zh: '行動建議：練習「主動好奇」。明天請一位年輕人解釋一個他們熱愛的流行趨勢，且不要發表反對意見。' },

  resultCuriousObserver: { en: 'The Empathetic Observer', zh: '感性觀察員' },
  resultCuriousTraits: { en: 'Core Mindset: You are a "Generational Tourist." You enjoy learning about other eras, but you often keep a respectful distance.', zh: '核心思維：你是個「世代觀光客」。你喜歡了解其他時代，但你通常會保持禮貌的距離。' },
  resultCuriousWatchOut: { en: "Blind Spots: Being a spectator is safe, but it can feel like you're watching an exhibit rather than connecting. True connection requires vulnerability.", zh: '潛在盲點：當個觀眾很安全，但這會讓人覺得你是在看展覽而不是在連結。真實的連結需要展現脆弱面。' },
  resultCuriousGrow: { en: 'Next Step: Move from watching to joining. Ask a family member to teach you a skill they love (like playing a game or a hobby).', zh: '行動建議：從旁觀轉向參與。請家人教你一項他們熱愛的技能（例如玩遊戲或某種嗜好）。' },

  resultBridgeArtisan: { en: 'The Cultural Translator', zh: '文化轉譯者' },
  resultBridgeTraits: { en: 'Core Mindset: You are the "Family Glue." You naturally find ways to bridge gaps and explain different perspectives to each generation.', zh: '核心思維：你是「家族黏著劑」。你能自然地找到跨越鴻溝的方法，並向不同世代解釋彼此的觀點。' },
  resultBridgeWatchOut: { en: '"The Middle Man" often gets exhausted. Don\'t forget to build your own direct bridges and share your own needs.', zh: '潛在盲點：「中間人」往往會精力耗竭。別忘了也要建立屬於自己的直接連結並分享自己的需求。' },
  resultBridgeGrow: { en: 'Next Step: Step back from being the "fixer." Facilitate an activity where others have to communicate directly with each other.', zh: '行動建議：從「修復者」抽離。舉辦一個活動，讓其他人必須直接與彼此溝通。' },

  resultMasterConnector: { en: 'The Arch Architect (Master)', zh: '大師級串連者' },
  resultMasterTraits: { en: 'Core Mindset: You see time as a circle. You find universal human experiences in every age, connecting seemingly opposite generations.', zh: '核心思維：你將時間看作一個圓。你在每個年齡層中都能找到普世的人類經驗，連結看似對立的世代。' },
  resultMasterWatchOut: { en: 'Blind Spots: You may expect others to be as open as you. Be patient with those still building their "first bricks."', zh: '潛在盲點：你可能期望別人也像你一樣開放。請對那些還在「打基礎」的人保持耐心。' },
  resultMasterGrow: { en: 'Next Step: Legacy Projects. Start an oral history project. You can draw out stories that might otherwise be lost.', zh: '行動建議：傳承計畫。開始一個口述歷史計畫。你能挖掘出那些可能會遺失的故事。' },

  // Quiz UI strings
  resultsTitle: { en: 'Result', zh: '測驗結果' },
  qCountPrefix: { en: 'Question', zh: '問題' },
  qCountOf: { en: '/', zh: '/' },
  takeAgain: { en: 'Take it Again', zh: '再測一次' },
  quizFooter: { en: 'The quiz is just a start. True bridges are built in person.', zh: '測驗只是開始，真正的連結是在實體對話中產生的。' },

  // Generations
  gen_silent: { en: 'Silent Generation', zh: '沉默世代' },
  gen_silent_desc: { en: 'Value hard work, loyalty, and tradition. Grew up in world of radio and letters.', zh: '重視勤奮、忠誠與傳統。成長於廣播與手寫信件的年代。' },
  gen_boomers: { en: 'Baby Boomers', zh: '嬰兒潮' },
  gen_boomers_desc: { en: 'Idealistic and competitive. Witnessed the TV era and social change.', zh: '理想主義且具競爭力。見證了電視普及與社會劇變的時期。' },
  gen_genx: { en: 'Gen X', zh: 'X 世代' },
  gen_genx_desc: { en: 'The "Latchkey" generation. Independent, skeptical, and pragmatic.', zh: '「鑰匙兒」世代。獨立、帶有一點懷疑精神，且非常務實。' },
  gen_millennials: { en: 'Millennials', zh: '千禧世代' },
  gen_millennials_desc: { en: 'Digital pioneers. Value purpose, collaboration, and work-life balance.', zh: '數位先驅。重視工作的意義、團隊協作與生活平衡。' },
  gen_genz: { en: 'Gen Z', zh: 'Z 世代' },
  gen_genz_desc: { en: 'Digital natives. Truth-seeking, inclusive, and fluid with identity.', zh: '數位原住民。追求真實、包容多樣性，對自我認同非常靈活。' },
  gen_alpha: { en: 'Gen Alpha', zh: 'Alpha 世代' },
  gen_alpha_desc: { en: 'The remote-first generation. Fully integrated with AI and touchscreens.', zh: '遠端優先的世代。與 AI 和觸控螢幕生活完全整合。' },

  // Action Guide
  step1: { en: 'Icebreakers', zh: '打破冰山' },
  step1_desc: { en: 'Start with something light, like a favorite food or a childhood game.', zh: '從輕鬆的話題開始，例如最愛的食物或小時候玩過的遊戲。' },
  step2: { en: 'Active Listening', zh: '深度的傾聽' },
  step2_desc: { en: 'Give your full attention. Put the phone down and make eye contact.', zh: '給予百分之百的專注。放下手機，保持眼神交流。' },
  step3: { en: 'Find Commonalities', zh: '尋找共通點' },
  step3_desc: { en: 'You might both love the same music or have similar family values.', zh: '你們可能會發現大家都愛同一種音樂，或是有相似的家庭觀。' },

  // Story / FamilyRoom
  comments: { en: 'Comments', zh: '留言' },
  addComment: { en: 'Add a comment...', zh: '留下你的想法...' },
  post: { en: 'Post', zh: '送出' },
  memory: { en: 'Memory', zh: '回憶' },
  advice: { en: 'Advice', zh: '建議' },
  observation: { en: 'Observation', zh: '觀察' },

  // Submit Story Form
  namePlaceholder: { en: 'e.g. Elena', zh: '例如：小明' },
  roleLabel: { en: 'Your Role', zh: '你的身份' },
  categoryLabel: { en: 'Story Type', zh: '故事類型' },
  storyPlaceholder: { en: 'Start with a small moment — a phrase your grandparent always said, a smell that takes you back...', zh: '從一個小片刻開始——長輩常說的一句話，一個讓你瞬間回到過去的氣味……' },
  attachPhoto: { en: 'Attach a Photo', zh: '附上一張照片' },
  addIllustration: { en: 'Add Illustration (Coming Soon)', zh: '加入插圖（即將推出）' },
  sendStory: { en: 'Send to the Story Wall', zh: '送到故事牆' },

  // Roles
  parent: { en: 'Parent', zh: '家長' },
  child: { en: 'Child', zh: '孩子' },
  grandparent: { en: 'Grandparent', zh: '祖父母' },
  grandchild: { en: 'Grandchild', zh: '孫子女' },

  // Footer
  missionLabel: { en: 'Our Mission', zh: '我們的使命' },
  missionQuote: { en: '"Every story shared is a brick in the bridge between us."', zh: '「每一個分享的故事，都是連結我們的橋墩上的一塊磚。」' },

  // AI Conversation Starter (ActionGuide)
  aiStarterTitle: { en: 'AI Conversation Spark', zh: 'AI 對話啟動器' },
  aiStarterDesc: { en: 'Pick two generations, and our AI will craft a personalised opening line for your next family conversation.', zh: '選擇兩個世代，AI 將為你量身打造一句開啟家族對話的引言。' },
  aiStarterYourGen: { en: 'Your Generation', zh: '你的世代' },
  aiStarterTheirGen: { en: 'Their Generation', zh: '對方的世代' },
  aiStarterGenerate: { en: 'Generate Spark', zh: '產生對話引言' },
  aiStarterGenerating: { en: 'Sparking...', zh: '思考中...' },
  aiStarterResult: { en: 'Your Conversation Starter', zh: '你的對話引言' },
  aiStarterTryAnother: { en: 'Try Another', zh: '再試一次' },
  aiStarterError: { en: 'Could not generate a spark right now. Please try again.', zh: '目前無法產生引言，請稍後再試。' },
  aiStarterNeedKey: { en: 'Add your GEMINI_API_KEY to .env to enable AI features.', zh: '請在 .env 中設定 GEMINI_API_KEY 以啟用 AI 功能。' },

  // Quiz share card
  quizShareCopy: { en: 'Copy Result', zh: '複製結果' },
  quizShareCopied: { en: 'Copied!', zh: '已複製！' },
  quizShareTitle: { en: 'Share Your Bridge Style', zh: '分享你的溝通風格' },
  quizGoToStories: { en: 'Read Stories', zh: '看看大家的故事' },

  // Explorer search & detail labels
  explorerSearch: { en: 'Search generations or slang...', zh: '搜尋世代或流行語...' },
  explorerNoResults: { en: 'No generations match your search.', zh: '找不到符合的世代。' },
  explorerPopCulture: { en: 'Pop Culture Touchstones', zh: '代表性流行文化' },
  explorerKeyPhilosophy: { en: 'Key Philosophy', zh: '核心價值觀' },
  explorerSlangBox: { en: 'The Slang Box', zh: '流行語速查' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
