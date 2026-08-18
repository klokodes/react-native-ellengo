import Svg, { Circle, Ellipse, Line, Path } from "react-native-svg";

type IconProps = {
  size?: number;
};

// Coordinates copied directly from prompt_material/03-auth-screen.png's source paths.
export function GoogleIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="44 637 28 28">
      <Circle cx={58} cy={651} r={14} fill="white" />
      <Path
        d="M71.6 651c0-.8-.1-1.6-.2-2.4H58v4.5h7.6c-.3 1.7-1.4 3.1-2.9 4v3.3h4.7c2.8-2.5 4.2-6.3 4.2-9.4z"
        fill="#4285F4"
      />
      <Path
        d="M58 665c3.8 0 7-1.3 9.4-3.5l-4.7-3.3c-1.3.9-2.9 1.4-4.7 1.4-3.6 0-6.7-2.4-7.8-5.7h-4.8v3.4C47.6 662.1 52.5 665 58 665z"
        fill="#34A853"
      />
      <Path
        d="M50.2 653.9c-.3-.9-.4-1.8-.4-2.9s.1-2 .4-2.9v-3.4h-4.8c-1 2-1.6 4.2-1.6 6.3s.6 4.3 1.6 6.3l4.8-3.4z"
        fill="#FBBC05"
      />
      <Path
        d="M58 643.4c2 0 3.8.7 5.2 2.1l3.9-3.9C64.9 639.3 61.7 638 58 638c-5.5 0-10.4 2.9-12.8 7.7l4.8 3.4c1.1-3.3 4.2-5.7 8-5.7z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export function FacebookIcon({ size = 28 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="44 703 28 28">
      <Circle cx={58} cy={717} r={14} fill="#1877F2" />
      <Path
        d="M61.5 717h-2.8v9h-3.8v-9h-2v-3.2h2v-2c0-2.7 1.1-4.3 4.2-4.3h2.6v3.2h-1.6c-1.2 0-1.3.5-1.3 1.3v1.8h2.9l-.2 3.2z"
        fill="white"
      />
    </Svg>
  );
}

export function AppleIcon({ size = 24, color = "#0D1B4B" }: IconProps & { color?: string }) {
  return (
    <Svg width={size} height={(size * 512) / 384} viewBox="0 0 384 512">
      <Path
        fill={color}
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </Svg>
  );
}

export function EyeIcon({ size = 22, color = "#6B7280" }: IconProps & { color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="325 459 26 26">
      <Circle cx={338} cy={472} r={11} fill="none" stroke={color} strokeWidth={1.5} />
      <Ellipse cx={338} cy={472} rx={5} ry={3.5} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={338} cy={472} r={2} fill={color} />
    </Svg>
  );
}

export function EyeOffIcon({ size = 22, color = "#6B7280" }: IconProps & { color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="325 459 26 26">
      <Circle cx={338} cy={472} r={11} fill="none" stroke={color} strokeWidth={1.5} />
      <Ellipse cx={338} cy={472} rx={5} ry={3.5} fill="none" stroke={color} strokeWidth={1.5} />
      <Circle cx={338} cy={472} r={2} fill={color} />
      <Line x1={328} y1={462} x2={348} y2={482} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function BackArrowIcon({ size = 24, color = "#0D1B4B" }: IconProps & { color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
