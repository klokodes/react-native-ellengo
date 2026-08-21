import type {
  Activity,
  Lesson,
  LanguageId,
  Phrase,
  Vocabulary,
} from "@/types/learning";

export const vocabulary: Vocabulary[] = [
  // Unit 1 — Greetings & Basics
  {
    id: "th-v-hello",
    languageId: "th",
    word: "สวัสดี",
    transliteration: "sawatdee",
    translation: "hello",
  },
  {
    id: "th-v-thankyou",
    languageId: "th",
    word: "ขอบคุณ",
    transliteration: "khop khun",
    translation: "thank you",
  },
  {
    id: "th-v-yes",
    languageId: "th",
    word: "ใช่",
    transliteration: "chai",
    translation: "yes",
  },
  {
    id: "th-v-no",
    languageId: "th",
    word: "ไม่",
    transliteration: "mai",
    translation: "no",
  },
  {
    id: "th-v-name",
    languageId: "th",
    word: "ชื่อ",
    transliteration: "cheu",
    translation: "name",
    exampleSentence: "ฉันชื่อแคท",
    exampleTranslation: "My name is Kate.",
  },
  {
    id: "th-v-country",
    languageId: "th",
    word: "ประเทศ",
    transliteration: "prathet",
    translation: "country",
  },
  // Unit 2 — Numbers & Everyday Life
  {
    id: "th-v-one",
    languageId: "th",
    word: "หนึ่ง",
    transliteration: "neung",
    translation: "one",
  },
  {
    id: "th-v-two",
    languageId: "th",
    word: "สอง",
    transliteration: "song",
    translation: "two",
  },
  {
    id: "th-v-three",
    languageId: "th",
    word: "สาม",
    transliteration: "saam",
    translation: "three",
  },
  {
    id: "th-v-water",
    languageId: "th",
    word: "น้ำ",
    transliteration: "naam",
    translation: "water",
  },
  {
    id: "th-v-rice",
    languageId: "th",
    word: "ข้าว",
    transliteration: "khao",
    translation: "rice",
  },
  {
    id: "th-v-delicious",
    languageId: "th",
    word: "อร่อย",
    transliteration: "aroi",
    translation: "delicious",
  },
];

export const phrases: Phrase[] = [
  // Unit 1 — Greetings & Basics
  {
    id: "th-p-hello-polite",
    languageId: "th",
    phrase: "สวัสดีค่ะ/ครับ",
    transliteration: "sawatdee kha / sawatdee khrap",
    translation: "hello (polite)",
    context: "Add kha if you're female, khrap if you're male.",
  },
  {
    id: "th-p-how-are-you",
    languageId: "th",
    phrase: "สบายดีไหม",
    transliteration: "sabai dee mai",
    translation: "how are you?",
  },
  {
    id: "th-p-whats-your-name",
    languageId: "th",
    phrase: "คุณชื่ออะไร",
    transliteration: "khun cheu arai",
    translation: "what's your name?",
  },
  {
    id: "th-p-my-name-is",
    languageId: "th",
    phrase: "ฉันชื่อ...",
    transliteration: "chan cheu...",
    translation: "my name is...",
  },
  // Unit 2 — Numbers & Everyday Life
  {
    id: "th-p-how-much",
    languageId: "th",
    phrase: "ราคาเท่าไหร่",
    transliteration: "raka tao rai",
    translation: "how much does it cost?",
  },
  {
    id: "th-p-id-like",
    languageId: "th",
    phrase: "ขอ...หน่อย",
    transliteration: "kho...noi",
    translation: "may I have...",
    context: "Used to politely order or ask for something.",
  },
  {
    id: "th-p-not-spicy",
    languageId: "th",
    phrase: "ไม่เผ็ด",
    transliteration: "mai phet",
    translation: "not spicy",
  },
];

function activitiesFor(lessonId: string, activities: Omit<Activity, "id" | "lessonId">[]): Activity[] {
  return activities.map((activity, index) => ({
    ...activity,
    id: `${lessonId}-a${index + 1}`,
    lessonId,
  }));
}

export const lessons: Lesson[] = [
  {
    id: "th-u1-l1",
    unitId: "th-u1",
    languageId: "th",
    order: 1,
    title: "Saying Hello",
    description: "Greet people and say thank you in Thai.",
    xp: 10,
    imageKey: "greetings",
    goals: [
      { id: "g1", description: "Greet someone politely" },
      { id: "g2", description: "Say thank you and yes/no" },
    ],
    vocabularyIds: ["th-v-hello", "th-v-thankyou", "th-v-yes", "th-v-no"],
    phraseIds: ["th-p-hello-polite", "th-p-how-are-you"],
    activities: activitiesFor("th-u1-l1", [
      {
        type: "vocabulary",
        order: 1,
        prompt: "Match each Thai word to its English meaning.",
        vocabularyIds: ["th-v-hello", "th-v-thankyou", "th-v-yes", "th-v-no"],
      },
      {
        type: "phrase",
        order: 2,
        prompt: "Practice greeting someone politely.",
        phraseIds: ["th-p-hello-polite"],
      },
      {
        type: "speaking",
        order: 3,
        prompt: "Say \"sawatdee\" and \"khop khun\" out loud.",
        vocabularyIds: ["th-v-hello", "th-v-thankyou"],
      },
    ]),
    aiTeacherPrompt: {
      systemPrompt:
        "This lesson is the student's first: teach basic greetings (sawatdee, " +
        "khop khun) and yes/no (chai, mai). Have the student repeat each word " +
        "after you before moving on.",
      openingLine:
        "Sawatdee ka! I'm Ajarn Mali. Today we'll learn how to say hello and thank you in Thai.",
      focusPoints: ["hello", "thank you", "yes", "no"],
    },
  },
  {
    id: "th-u1-l2",
    unitId: "th-u1",
    languageId: "th",
    order: 2,
    title: "Introducing Yourself",
    description: "Ask and answer someone's name in Thai.",
    xp: 10,
    imageKey: "introductions",
    goals: [
      { id: "g1", description: "Ask someone's name" },
      { id: "g2", description: "Say your own name" },
    ],
    vocabularyIds: ["th-v-name", "th-v-country"],
    phraseIds: ["th-p-whats-your-name", "th-p-my-name-is"],
    activities: activitiesFor("th-u1-l2", [
      {
        type: "vocabulary",
        order: 1,
        prompt: "Learn the words for \"name\" and \"country\".",
        vocabularyIds: ["th-v-name", "th-v-country"],
      },
      {
        type: "conversation",
        order: 2,
        prompt: "Practice asking and answering \"what's your name?\".",
        phraseIds: ["th-p-whats-your-name", "th-p-my-name-is"],
      },
    ]),
    aiTeacherPrompt: {
      systemPrompt:
        "Teach the student how to ask \"khun cheu arai\" (what's your name) and " +
        "answer with \"chan cheu...\" (my name is). Role-play a short introduction " +
        "with them.",
      openingLine:
        "Let's practice introducing ourselves. Ready? Khun cheu arai — what's your name?",
      focusPoints: ["what's your name?", "my name is..."],
    },
  },
  {
    id: "th-u2-l1",
    unitId: "th-u2",
    languageId: "th",
    order: 1,
    title: "Counting 1-3",
    description: "Learn to count from one to three in Thai.",
    xp: 10,
    imageKey: "numbers",
    goals: [{ id: "g1", description: "Count from one to three" }],
    vocabularyIds: ["th-v-one", "th-v-two", "th-v-three"],
    phraseIds: ["th-p-how-much"],
    activities: activitiesFor("th-u2-l1", [
      {
        type: "vocabulary",
        order: 1,
        prompt: "Match the Thai numbers one through three.",
        vocabularyIds: ["th-v-one", "th-v-two", "th-v-three"],
      },
      {
        type: "listening",
        order: 2,
        prompt: "Listen and pick the number you hear.",
        vocabularyIds: ["th-v-one", "th-v-two", "th-v-three"],
      },
    ]),
    aiTeacherPrompt: {
      systemPrompt:
        "Teach the numbers neung, song, and saam (1-3). Ask the student to count " +
        "objects out loud using these numbers.",
      openingLine:
        "Time to count in Thai! Let's start with neung, song, saam — one, two, three.",
      focusPoints: ["one", "two", "three", "how much does it cost?"],
    },
  },
  {
    id: "th-u2-l2",
    unitId: "th-u2",
    languageId: "th",
    order: 2,
    title: "Ordering Food",
    description: "Order food and drinks politely in Thai.",
    xp: 10,
    imageKey: "food",
    goals: [
      { id: "g1", description: "Order food or drink" },
      { id: "g2", description: "Ask for something not spicy" },
    ],
    vocabularyIds: ["th-v-water", "th-v-rice", "th-v-delicious"],
    phraseIds: ["th-p-id-like", "th-p-not-spicy"],
    activities: activitiesFor("th-u2-l2", [
      {
        type: "vocabulary",
        order: 1,
        prompt: "Learn words for water, rice, and delicious.",
        vocabularyIds: ["th-v-water", "th-v-rice", "th-v-delicious"],
      },
      {
        type: "conversation",
        order: 2,
        prompt: "Order water and rice, and ask for it not spicy.",
        phraseIds: ["th-p-id-like", "th-p-not-spicy"],
      },
    ]),
    aiTeacherPrompt: {
      systemPrompt:
        "Teach the student to order food politely using \"kho...noi\" (may I have) " +
        "and how to ask for something \"mai phet\" (not spicy). Practice ordering " +
        "water and rice.",
      openingLine:
        "Let's order some food! I'll teach you how to politely ask for what you want.",
      focusPoints: ["water", "rice", "delicious", "may I have...", "not spicy"],
    },
  },
];

export function getLessonsByUnit(unitId: string): Lesson[] {
  return lessons
    .filter((lesson) => lesson.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLessonsByLanguage(languageId: LanguageId): Lesson[] {
  return lessons.filter((lesson) => lesson.languageId === languageId);
}

export function getLessonById(id: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === id);
}

export function getVocabularyById(id: string): Vocabulary | undefined {
  return vocabulary.find((word) => word.id === id);
}

export function getPhraseById(id: string): Phrase | undefined {
  return phrases.find((phrase) => phrase.id === id);
}
