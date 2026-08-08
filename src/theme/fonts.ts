import { fontFamily } from "./typography";

// Font map for expo-font's useFonts — single source of truth consumed by the root layout.
export const fontAssets = {
  [fontFamily.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
  [fontFamily.medium]: require("../../assets/fonts/Poppins-Medium.ttf"),
  [fontFamily.semibold]: require("../../assets/fonts/Poppins-SemiBold.ttf"),
  [fontFamily.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
};
