import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BackArrowIcon } from "@/components/auth/AuthIcons";
import { CheckIcon, SearchIcon } from "@/components/language/LanguageIcons";
import { languages } from "@/data/language";
import type { LanguageId } from "@/types/learning";

export default function LanguageSelection() {
  const router = useRouter();
  const availableLanguages = useMemo(() => languages.filter((language) => language.isAvailable), []);

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<LanguageId | null>(availableLanguages[0]?.id ?? null);

  const filteredLanguages = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return availableLanguages;
    return availableLanguages.filter(
      (language) =>
        language.name.toLowerCase().includes(normalized) || language.nativeName.toLowerCase().includes(normalized),
    );
  }, [availableLanguages, query]);

  const handleConfirm = () => {
    if (!selectedId) return;
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <View className="flex-1 bg-background px-6">
        {/* Header */}
        <View className="flex-row items-center pt-2">
          <Pressable className="h-10 w-10 items-center justify-center" onPress={() => router.back()} hitSlop={8}>
            <BackArrowIcon />
          </Pressable>
          <Text className="flex-1 text-center text-h3 font-poppins-bold text-ink">Choose a language</Text>
          <View className="w-10" />
        </View>

        {/* Search */}
        <View className="mt-5 h-12 flex-row items-center gap-2 rounded-full bg-surface px-4">
          <SearchIcon />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search languages"
            placeholderTextColor="#9AA1AF"
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 p-0 text-[15px] text-ink"
            style={{ height: 20 }}
          />
        </View>

        {/* Popular */}
        <Text className="mt-6 text-h3 font-poppins-bold text-ink">Popular</Text>

        <View className="mt-5 gap-3">
          {filteredLanguages.map((language) => {
            const selected = language.id === selectedId;
            return (
              <Pressable
                key={language.id}
                onPress={() => setSelectedId(language.id)}
                className={`flex-row items-center rounded-2xl border px-4 py-3 ${
                  selected ? "border-primary bg-[#E0F7F4]" : "border-border bg-white"
                }`}
              >
                <View className="h-11 w-11 items-center justify-center rounded-full bg-surface">
                  <Text className="text-xl">{language.flagEmoji}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-poppins-semibold text-[15px] text-ink">{language.name}</Text>
                  <Text className="text-[13px] text-ink-muted">{language.nativeName}</Text>
                </View>
                {selected && (
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
                    <CheckIcon />
                  </View>
                )}
              </Pressable>
            );
          })}

          {filteredLanguages.length === 0 && <Text className="text-body-sm text-ink-muted">No languages found.</Text>}
        </View>

        <View className="flex-1" />

        {/* Confirm */}
        <Pressable
          className={`h-14 items-center justify-center rounded-2xl bg-primary ${selectedId ? "" : "opacity-50"}`}
          onPress={handleConfirm}
          disabled={!selectedId}
        >
          <Text className="text-[16px] font-poppins-bold text-white">Confirm</Text>
        </Pressable>

        {/* Earth illustration */}
        <View className="items-center overflow-hidden pt-10">
          <Image
            source={require("../../assets/earth.png")}
            style={{ width: 260, height: 260, marginBottom: -40 }}
            contentFit="contain"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
