// Ellengo design system — color tokens (prompt_material/01-design-system.svg)
export const colors = {
  // Brand
  primary: "#3BBFAD", // Ellengo Teal
  primaryDark: "#1A8C7D", // Deep Teal
  sky: "#4DB8E8", // Sky Blue
  amber: "#F5A623", // Warm Amber

  // Semantic
  success: "#27AE60",
  warning: "#F5A623",
  streak: "#FF8C42",
  error: "#E74C3C",
  info: "#4DB8E8",

  // Neutrals
  ink: "#0D1B4B", // Text / Primary
  inkMuted: "#6B7280", // Text / Secondary
  border: "#E0E4EC",
  surface: "#F0F4F8",
  background: "#FAFAFA",
} as const;

export type ColorToken = keyof typeof colors;
