// Learning content types shared by the hardcoded data in `src/data/`.
// Add a new language by extending `LanguageId` and adding matching entries
// to `data/language.ts`, `data/units.ts`, and `data/lessons.ts`.

export type LanguageId = "th";

export interface AiTeacherPersona {
  name: string;
  /** Base system prompt for the Vision Agent teacher, always speaking English. */
  systemPrompt: string;
}

export interface Language {
  id: LanguageId;
  /** English name, e.g. "Thai". */
  name: string;
  /** Name in the language's own script, e.g. "ภาษาไทย". */
  nativeName: string;
  flagEmoji: string;
  description: string;
  isAvailable: boolean;
  aiTeacherPersona: AiTeacherPersona;
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  /** Hex color used for the unit's card/icon in the UI. */
  color: string;
  icon: string;
}

export interface Vocabulary {
  id: string;
  languageId: LanguageId;
  /** Word written in the language's own script. */
  word: string;
  /** Romanized pronunciation, e.g. "sawatdee". */
  transliteration: string;
  translation: string;
  partOfSpeech?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface Phrase {
  id: string;
  languageId: LanguageId;
  phrase: string;
  transliteration: string;
  translation: string;
  /** Short note on when/how the phrase is used. */
  context?: string;
}

export interface LessonGoal {
  id: string;
  description: string;
}

export type ActivityType =
  | "vocabulary"
  | "phrase"
  | "listening"
  | "speaking"
  | "conversation";

export interface Activity {
  id: string;
  lessonId: string;
  type: ActivityType;
  order: number;
  /** Instruction shown to the learner for this activity. */
  prompt: string;
  vocabularyIds?: string[];
  phraseIds?: string[];
}

export interface AiTeacherPrompt {
  /** Lesson-specific addition appended to the language's base persona prompt. */
  systemPrompt: string;
  openingLine: string;
  focusPoints: string[];
}

export interface Lesson {
  id: string;
  unitId: string;
  languageId: LanguageId;
  order: number;
  title: string;
  description: string;
  xp: number;
  /** Key used by the UI to look up an image/asset; not a URL itself. */
  imageKey: string;
  goals: LessonGoal[];
  vocabularyIds: string[];
  phraseIds: string[];
  activities: Activity[];
  aiTeacherPrompt: AiTeacherPrompt;
}
