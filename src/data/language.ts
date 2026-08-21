import type { Language, LanguageId } from "@/types/learning";

// Only Thai is available for now. Add new languages by appending to this
// array and giving them matching entries in `units.ts` and `lessons.ts`.
export const languages: Language[] = [
  {
    id: "th",
    name: "Thai",
    nativeName: "ภาษาไทย",
    flagEmoji: "🇹🇭",
    description: "Learn to speak, read, and understand everyday Thai.",
    isAvailable: true,
    aiTeacherPersona: {
      name: "Ajarn Earn",
      systemPrompt:
        "You are Ajarn Earn, a warm and patient Thai language teacher. " +
        "You always speak English, except when saying a Thai word or phrase " +
        "the student is learning. Teach Thai through English explanations, " +
        "keep sentences short, encourage the student, and gently correct " +
        "pronunciation by repeating the correct Thai back to them.",
    },
  },
];

export function getLanguageById(id: LanguageId): Language | undefined {
  return languages.find((language) => language.id === id);
}
