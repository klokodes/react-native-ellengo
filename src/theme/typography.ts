// Ellengo design system — typography tokens (prompt_material/01-design-system.svg)
export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// Sizes/weights/line-heights match the TYPOGRAPHY panel of the design system.
export const textStyles = {
  h1: { fontFamily: fontFamily.bold, fontSize: 32, lineHeight: 32 * 1.2 }, // Page / Screen Title
  h2: { fontFamily: fontFamily.semibold, fontSize: 24, lineHeight: 24 * 1.3 }, // Section Title
  h3: { fontFamily: fontFamily.semibold, fontSize: 20, lineHeight: 20 * 1.3 }, // Card / Module Title
  h4: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 16 * 1.4 }, // Subheading
  bodyLarge: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 16 * 1.6 }, // Important content
  body: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 14 * 1.6 }, // Body text
  bodySmall: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 13 * 1.6 }, // Supporting text
  caption: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 11 * 1.4 }, // Labels, meta text
} as const;

export type FontWeightToken = keyof typeof fontFamily;
export type TextStyleToken = keyof typeof textStyles;
