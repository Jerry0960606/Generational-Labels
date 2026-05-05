export interface Generation {
  id: string;
  name: string;
  years: string;
  description: string;
  keyValues: string[];
  slang: { word: string; meaning: string }[];
  popCulture: { label: string; example: string }[];
  communication: string;
  workplace: string;
  context: string;
  color: 'primary' | 'secondary' | 'lavender' | 'outline';
}

export const getGenerations = (t: (key: string) => string, language: string): Generation[] => {
  const en = language === 'en';
  
  return [
    {
      id: 'silent',
      name: t('gen_silent'),
      years: '1928 – 1945',
      description: t('gen_silent_desc'),
      keyValues: [
        en ? 'Stability' : '穩定',
        en ? 'Dedication' : '奉獻',
        en ? 'Sacrifice' : '犧牲',
        en ? 'Discipline' : '紀律',
        en ? 'Patriotism' : '愛國情操',
      ],
      slang: [
        { word: 'G-Man', meaning: en ? 'A federal agent' : '聯邦調查員' },
        { word: 'Cooking with gas', meaning: en ? 'Doing something right or fast' : '進展順利' },
        { word: 'Copacetic', meaning: en ? 'Everything is fine, satisfactory' : '一切都很好' },
        { word: 'Hep cat', meaning: en ? 'A hip, jazz-savvy person' : '時髦、懂爵士樂的人' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Big Band, Glenn Miller, Frank Sinatra' : '大樂隊音樂、法蘭克·辛納屈' },
        { label: en ? 'Film' : '電影', example: en ? 'Casablanca, Gone with the Wind' : '《北非諜影》、《亂世佳人》' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'WWII, Great Depression, Radio era' : '二次世界大戰、大蕭條、廣播時代' },
      ],
      communication: en ? 'Formal, handwritten letters, and face-to-face meetings.' : '正式且重禮節，偏好手寫信件與面對面交談。',
      workplace: en ? 'Loyalty to institutions, hierarchy, and job security.' : '對組織高度忠誠，重視階級制度與工作的穩定性。',
      context: en ? 'The Great Depression, World War II, and the Golden Age of Radio.' : '經歷過大蕭條與二戰，是在廣播黃金年代成長的群體。',
      color: 'outline'
    },
    {
      id: 'boomers',
      name: t('gen_boomers'),
      years: '1946 – 1964',
      description: t('gen_boomers_desc'),
      keyValues: [
        en ? 'Ambition' : '野心',
        en ? 'Community' : '社群',
        en ? 'Fairness' : '公平',
        en ? 'Security' : '安全',
        en ? 'Hard Work' : '努力工作',
      ],
      slang: [
        { word: 'Groovy', meaning: en ? 'Excellent, fashionable' : '極好的、時髦的' },
        { word: 'Right on', meaning: en ? 'I agree completely' : '完全同意' },
        { word: 'Far out', meaning: en ? 'Extremely unusual or excellent' : '太棒了、超厲害' },
        { word: 'Dig it', meaning: en ? 'Understand or appreciate something' : '明白、欣賞' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'The Beatles, Woodstock, Rock \'n\' Roll' : '披頭四、伍茲塔克音樂節、搖滾樂' },
        { label: en ? 'TV' : '電視', example: en ? 'Moon landing live broadcast, I Love Lucy' : '月球登陸直播、情境喜劇' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'Civil Rights Movement, Vietnam War' : '民權運動、越戰' },
      ],
      communication: en ? 'Telephone calls and personal touch. Values direct talk.' : '偏好電話溝通，重視人際間的溫暖與直接對話。',
      workplace: en ? 'Competitive, career-defined, and values professional growth.' : '具競爭力，以事業定義自我，重視職涯成長與升遷。',
      context: en ? 'The Space Race, Civil Rights Movement, and the Rise of TV.' : '見證太空競賽、民權運動興起以及電視的普及。',
      color: 'secondary'
    },
    {
      id: 'genx',
      name: t('gen_genx'),
      years: '1965 – 1980',
      description: t('gen_genx_desc'),
      keyValues: [
        en ? 'Independence' : '獨立',
        en ? 'Pragmatism' : '務實',
        en ? 'Authenticity' : '真實',
        en ? 'Flexibility' : '靈活',
        en ? 'Self-reliance' : '自力更生',
      ],
      slang: [
        { word: 'Whatever', meaning: en ? 'Indifference or dismissal' : '隨便、無所謂' },
        { word: 'As if!', meaning: en ? 'I don\'t believe you' : '怎麼可能！' },
        { word: 'Dude', meaning: en ? 'A general address term' : '夥伴、老兄（通用稱呼）' },
        { word: 'Bogus', meaning: en ? 'Fake or unfair' : '假的、不公平的' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Nirvana, Grunge, MTV, Michael Jackson' : '涅槃樂隊、油漬搖滾、MTV、麥可·傑克遜' },
        { label: en ? 'Film' : '電影', example: en ? 'Ferris Bueller, The Breakfast Club' : '《蹺課天才》、《早餐俱樂部》' },
        { label: en ? 'Tech' : '科技', example: en ? 'Walkman, Atari, NES, VHS' : '隨身聽、電玩（雅達利/FC紅白機）' },
      ],
      communication: en ? 'Direct and efficient. Prefers email or brief calls.' : '直接且講求效率，偏好電子郵件或簡短明確的電話。',
      workplace: en ? 'Invented work-life balance. Skeptical of authority, values autonomy.' : '追求生活與工作平衡，對權威持懷疑態度，重視自主權。',
      context: en ? 'The Fall of the Berlin Wall, the Cold War, and the PC Revolution.' : '經歷柏林圍牆倒塌與冷戰，是個人電腦革命的見證者。',
      color: 'primary'
    },
    {
      id: 'millennials',
      name: t('gen_millennials'),
      years: '1981 – 1996',
      description: t('gen_millennials_desc'),
      keyValues: [
        en ? 'Purpose' : '目標',
        en ? 'Collaboration' : '協作',
        en ? 'Inclusion' : '包容',
        en ? 'Diversity' : '多元',
        en ? 'Work-Life Balance' : '生活平衡',
      ],
      slang: [
        { word: 'On fleek', meaning: en ? 'Perfectly styled' : '完美極了' },
        { word: 'Ghosting', meaning: en ? 'Ending contact suddenly' : '不告而別、已讀不回' },
        { word: 'FOMO', meaning: en ? 'Fear Of Missing Out' : '害怕錯過（FOMO 症）' },
        { word: 'Basic', meaning: en ? 'Mainstream, unoriginal' : '普通、沒有個性' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Britney Spears, Eminem, Indie Rock' : '小甜甜布蘭妮、阿姆、獨立搖滾' },
        { label: en ? 'Tech' : '科技', example: en ? 'AIM, MySpace, iPod, early smartphones' : 'MSN 即時通、MySpace、iPod' },
        { label: en ? 'Events' : '歷史大事', example: en ? '9/11, 2008 Financial Crisis, Social Media rise' : '911事件、2008金融危機、社群媒體興起' },
      ],
      communication: en ? 'Instant messaging and texts. Values authenticity and "the why".' : '偏好即時通訊與簡訊，重視真實感，想知道事情背後的意義。',
      workplace: en ? 'Mission-driven, seeks constant feedback and growth flexibility.' : '目標導向，尋求回饋並渴望工作模式的靈活性。',
      context: en ? 'The 9/11 Era, the 2008 Recession, and the Birth of the iPhone.' : '成長於 911 事件後與金融海嘯期，見證智慧型手機誕生。',
      color: 'lavender'
    },
    {
      id: 'genz',
      name: t('gen_genz'),
      years: '1997 – 2012',
      description: t('gen_genz_desc'),
      keyValues: [
        en ? 'Privacy' : '隱私',
        en ? 'Individuality' : '個性化',
        en ? 'Stability' : '穩定',
        en ? 'Activism' : '行動力',
        en ? 'Mental Health' : '心理健康',
      ],
      slang: [
        { word: 'No cap', meaning: en ? 'I\'m not lying / For real' : '沒騙你、真的' },
        { word: 'Slay', meaning: en ? 'Doing something exceptionally well' : '太殺了、做得好' },
        { word: 'It\'s giving', meaning: en ? 'It gives off a certain vibe' : '這很有……的感覺' },
        { word: 'Understood the assignment', meaning: en ? 'Did exactly what was needed, perfectly' : '完全掌握狀況、做到位了' },
      ],
      popCulture: [
        { label: en ? 'Music' : '音樂', example: en ? 'Billie Eilish, BTS, Olivia Rodrigo, TikTok hits' : '碧梨、防彈少年團、TikTok 神曲' },
        { label: en ? 'Tech' : '科技', example: en ? 'TikTok, Snapchat, YouTube, Streaming' : 'TikTok、Snapchat、YouTube 直播' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'COVID-19, Climate activism, BLM movement' : '新冠疫情、氣候行動、BLM 運動' },
      ],
      communication: en ? 'Video-first, memes, and emoji-heavy. Values digital privacy.' : '視訊優先，擅長使用梗圖與表情符號，極度重視數位隱私。',
      workplace: en ? 'Values mental health, diversity, and social impact above all.' : '重視心理健康與多元化，追求對社會有正面影響力的工作。',
      context: en ? 'The Global Pandemic, Social Media Saturation, and Climate Crisis.' : '成長於疫情時期與社群媒體飽和年代，關注氣候變遷危機。',
      color: 'primary'
    },
    {
      id: 'alpha',
      name: t('gen_alpha'),
      years: '2013 – 2025',
      description: t('gen_alpha_desc'),
      keyValues: [
        en ? 'Adaptability' : '適應力',
        en ? 'Global Citizenship' : '世界公民',
        en ? 'Tech-fluency' : '科技流利度',
        en ? 'Creativity' : '創造性',
        en ? 'AI-native' : 'AI 原住民',
      ],
      slang: [
        { word: 'Skibidi', meaning: en ? 'Absurdist meme slang; cool or weird' : '無厘頭梗語，表示酷或奇怪' },
        { word: 'Rizz', meaning: en ? 'Charisma, the ability to attract others' : '魅力、吸引人的特質' },
        { word: 'Sigma', meaning: en ? 'Self-reliant, lone-wolf archetype' : '獨立自主、不依賴他人的類型' },
        { word: 'Delulu', meaning: en ? 'Delusional, used humorously' : '妄望、不切實際（幽默用法）' },
      ],
      popCulture: [
        { label: en ? 'Tech' : '科技', example: en ? 'AI tools, iPads from birth, smart devices' : '從小接觸 AI、iPad、智慧裝置' },
        { label: en ? 'Media' : '媒體', example: en ? 'YouTube Kids, Roblox, Minecraft' : 'YouTube Kids、Roblox、Minecraft' },
        { label: en ? 'Events' : '歷史大事', example: en ? 'Post-COVID world, AI revolution, remote school' : '後疫情世界、AI 革命、遠距教學' },
      ],
      communication: en ? 'Visual, interactive, and AI-assisted. Comfortable with voice commands.' : '高度視覺化且具互動性，習慣與 AI 協作並使用語音指令。',
      workplace: en ? 'Likely entrepreneurial, tech-integrated, and highly adaptable.' : '預期將展現高度創業精神與科技融合力，適應力極強。',
      context: en ? 'The AI Revolution, Metaverses, and the Post-Pandemic World.' : '身處 AI 革命與元宇宙萌芽期，成長於後疫情的新常態。',
      color: 'secondary'
    }
  ];
};
