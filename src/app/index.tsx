import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-h1 font-poppins-bold text-primary">ellengo</Text>
      <Text className="text-body-lg text-ink text-center">Welcome to Ellengo!</Text>
      <Text className="text-body-sm text-ink-muted text-center">Learn Thai, the fun way.</Text>
      <Link href="/onboarding" className="text-body font-poppins-semibold text-primary mt-4">
        Go to onboarding →
      </Link>
    </View>
  );
}
