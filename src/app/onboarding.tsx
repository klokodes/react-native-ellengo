import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View className="flex-1 bg-background px-6">
        {/* Logo */}
        <View className="flex-row items-center gap-2 pt-2">
          <Image
            source={require("../../assets/mascot-logo.png")}
            style={{ width: 36, height: 36 }}
            contentFit="contain"
          />
          <Text className="text-[21px] font-poppins-bold text-ink">ellengo</Text>
        </View>

        {/* Hero text */}
        <View className="mt-6">
          <Text className="text-[33px] leading-[38px] font-poppins-bold text-ink">Your AI language</Text>
          <Text className="text-[33px] leading-[38px] font-poppins-bold text-primary">teacher.</Text>
          <Text className="mt-3 text-[14.5px] leading-[20px] text-ink-muted">
            Real conversations, personalized{"\n"}lessons, anytime, anywhere.
          </Text>
        </View>

        {/* Mascot + speech bubbles */}
        <View className="flex-1 items-center justify-center">
          <View className="relative h-[260px] w-full items-center justify-center">
            <Image
              source={require("../../assets/mascot-welcome.png")}
              style={{ width: 200, height: 200 }}
              contentFit="contain"
            />

            <View className="absolute left-0 top-4 rounded-2xl bg-[#E0F7F4] px-4 py-2.5">
              <Text className="font-poppins-semibold text-[15px] text-[#1A8C7D]">Hello!</Text>
            </View>
            <View className="absolute right-0 top-0 rounded-2xl bg-[#FEF3E2] px-4 py-2.5">
              <Text className="font-poppins-semibold text-[15px] text-[#D4860A]">你好!</Text>
            </View>
            <View className="absolute bottom-8 right-2 rounded-2xl bg-[#E3F4FD] px-4 py-2">
              <Text className="font-poppins-semibold text-sm text-[#1A7AB5]">สวัสดี!</Text>
            </View>
          </View>
        </View>

        {/* Get Started button */}
        <Pressable
          className="mb-6 h-[62px] flex-row items-center justify-center rounded-[20px] bg-primary px-6"
          onPress={() => router.push("/sign-up")}
        >
          <Text className="font-poppins-bold text-lg text-white">Get Started</Text>
          <View className="absolute right-3 h-10 w-10 items-center justify-center rounded-full bg-[#2AAFA0]">
            <Text className="text-xl font-poppins-bold text-white">›</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
