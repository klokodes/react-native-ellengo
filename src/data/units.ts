import type { LanguageId, Unit } from "@/types/learning";
import { colors } from "@/theme";

export const units: Unit[] = [
  {
    id: "th-u1",
    languageId: "th",
    order: 1,
    title: "Greetings & Basics",
    description: "Say hello, introduce yourself, and be polite in Thai.",
    color: colors.primary,
    icon: "👋",
  },
  {
    id: "th-u2",
    languageId: "th",
    order: 2,
    title: "Numbers & Everyday Life",
    description: "Count, tell time, and order food in Thai.",
    color: colors.sky,
    icon: "🔢",
  },
];

export function getUnitsByLanguage(languageId: LanguageId): Unit[] {
  return units
    .filter((unit) => unit.languageId === languageId)
    .sort((a, b) => a.order - b.order);
}

export function getUnitById(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}
