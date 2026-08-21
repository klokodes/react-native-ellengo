import { useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { Image } from "expo-image";
import { Link, useRouter, type Href } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showAlert } from "@/lib/alert";

import { AppleIcon, BackArrowIcon, EyeIcon, EyeOffIcon, FacebookIcon, GoogleIcon } from "./AuthIcons";
import { VerificationModal } from "./VerificationModal";

export type AuthMode = "sign-up" | "sign-in";

type NavigateParams = {
  session?: { currentTask?: unknown } | null;
  decorateUrl: (path: string) => string;
};

function getErrorMessage(error: { message?: string; longMessage?: string } | null | undefined, fallback: string) {
  return error?.longMessage || error?.message || fallback;
}

type AuthScreenProps = {
  mode: AuthMode;
};

const copy = {
  "sign-up": {
    heading: "Create your account",
    subtitle: "Start your language journey today ✦",
    submitLabel: "Sign Up",
    footerPrompt: "Already have an account? ",
    footerLink: "Log In",
    footerHref: "/sign-in" as const,
  },
  "sign-in": {
    heading: "Welcome back",
    subtitle: "Continue your language journey ✦",
    submitLabel: "Log In",
    footerPrompt: "Don't have an account? ",
    footerLink: "Sign Up",
    footerHref: "/sign-up" as const,
  },
};

export function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const isSignUp = mode === "sign-up";
  const { heading, subtitle, submitLabel, footerPrompt, footerLink, footerHref } = copy[mode];

  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const isBusy = (isSignUp ? signUpFetchStatus : signInFetchStatus) === "fetching" || isGoogleLoading;

  const navigateAfterAuth = ({ session, decorateUrl }: NavigateParams) => {
    if (session?.currentTask) return;
    const url = decorateUrl("/");
    if (url.startsWith("http")) {
      if (typeof window !== "undefined") window.location.href = url;
    } else {
      router.replace(url as Href);
    }
  };

  const handleSubmit = async () => {
    if (isBusy) return;
    if (!email) {
      showAlert("Enter your email", "Please enter your email address to continue.");
      return;
    }

    if (isSignUp) {
      if (!password) {
        showAlert("Enter a password", "Please choose a password to continue.");
        return;
      }
      const { error } = await signUp.password({ emailAddress: email, password });
      if (error) {
        showAlert("Couldn't create account", getErrorMessage(error, "Please check your details and try again."));
        return;
      }
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        showAlert("Couldn't send code", getErrorMessage(sendError, "Please try again."));
        return;
      }
    } else {
      const { error } = await signIn.emailCode.sendCode({ emailAddress: email });
      if (error) {
        showAlert("Couldn't sign in", getErrorMessage(error, "Please check your email and try again."));
        return;
      }
    }

    setVerificationVisible(true);
  };

  const handleVerifyCode = async (code: string): Promise<{ success: boolean; message?: string }> => {
    if (isSignUp) {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) {
        return { success: false, message: getErrorMessage(error, "That code didn't work. Please try again.") };
      }
      if (signUp.status === "complete") {
        await signUp.finalize({ navigate: navigateAfterAuth });
      }
    } else {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        return { success: false, message: getErrorMessage(error, "That code didn't work. Please try again.") };
      }
      if (signIn.status === "complete") {
        await signIn.finalize({ navigate: navigateAfterAuth });
      }
    }
    return { success: true };
  };

  const handleGoogleSignIn = async () => {
    if (isBusy) return;
    setIsGoogleLoading(true);
    try {
      const { createdSessionId } = await startSSOFlow({ strategy: "oauth_google" });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (err) {
      showAlert("Google sign-in failed", "Please try again.");
      console.error(err);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6">
          {/* Back button */}
          <Pressable
            className="h-10 w-10 -ml-2 items-center justify-center"
            onPress={() => router.back()}
            hitSlop={8}
          >
            <BackArrowIcon />
          </Pressable>

          {/* Heading */}
          <View className="mt-2">
            <Text className="text-[28px] leading-[34px] font-poppins-bold text-ink">{heading}</Text>
            <Text className="mt-1.5 text-[15px] text-primary">{subtitle}</Text>
          </View>

          {/* Mascot */}
          <View className="items-center py-6">
            <Image
              source={require("../../../assets/mascot-welcome.png")}
              style={{ width: 130, height: 130 }}
              contentFit="contain"
            />
          </View>

          {/* Email field */}
          <View className="h-16 justify-center rounded-2xl border border-border bg-[#F6F8FA] px-4">
            <Text className="text-[12px] text-ink-muted">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="alex@gmail.com"
              placeholderTextColor="#9AA1AF"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              className="p-0 text-[15px] font-poppins-medium text-ink"
              style={{ height: 20 }}
            />
          </View>

          {/* Password field (sign up only) */}
          {isSignUp && (
            <View className="mt-3 h-16 justify-center rounded-2xl border border-border bg-[#F6F8FA] px-4">
              <Text className="text-[12px] text-ink-muted">Password</Text>
              <View className="flex-row items-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••"
                  placeholderTextColor="#9AA1AF"
                  secureTextEntry={!showPassword}
                  textContentType="newPassword"
                  className="flex-1 p-0 text-[15px] font-poppins-medium text-ink"
                  style={{ height: 20 }}
                />
                <Pressable onPress={() => setShowPassword((prev) => !prev)} hitSlop={8}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Pressable>
              </View>
            </View>
          )}

          {/* Submit button */}
          <Pressable
            className="mt-6 h-[58px] items-center justify-center rounded-[18px] bg-primary"
            onPress={handleSubmit}
            disabled={isBusy}
          >
            <Text className="text-[18px] font-poppins-bold text-white">{submitLabel}</Text>
          </Pressable>

          {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
          {isSignUp && <View nativeID="clerk-captcha" />}

          {/* Divider */}
          <View className="mt-5 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border" />
            <Text className="text-[13px] text-ink-muted">or continue with</Text>
            <View className="h-px flex-1 bg-border" />
          </View>

          {/* Social buttons */}
          <View className="mt-5 gap-3">
            <Pressable
              className="h-[54px] flex-row items-center justify-between rounded-[14px] border border-border bg-white px-4"
              onPress={handleGoogleSignIn}
              disabled={isBusy}
            >
              <GoogleIcon />
              <Text className="flex-1 text-center text-[15px] font-poppins-semibold text-ink">
                Continue with Google
              </Text>
              <View className="w-7" />
            </Pressable>

            <Pressable className="h-[54px] flex-row items-center justify-between rounded-[14px] border border-border bg-white px-4">
              <FacebookIcon />
              <Text className="flex-1 text-center text-[15px] font-poppins-semibold text-ink">
                Continue with Facebook
              </Text>
              <View className="w-7" />
            </Pressable>

            <Pressable className="h-[54px] flex-row items-center justify-between rounded-[14px] border border-border bg-white px-4">
              <AppleIcon />
              <Text className="flex-1 text-center text-[15px] font-poppins-semibold text-ink">
                Continue with Apple
              </Text>
              <View className="w-7" />
            </Pressable>
          </View>

          <View className="flex-1" />

          {/* Footer link */}
          <View className="items-center pb-6 pt-6">
            <Text className="text-[14px] text-ink-muted">
              {footerPrompt}
              <Link href={footerHref} className="text-[14px] font-poppins-semibold text-primary">
                {footerLink}
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>

      <VerificationModal
        visible={verificationVisible}
        onClose={() => setVerificationVisible(false)}
        email={email}
        onSubmitCode={handleVerifyCode}
      />
    </SafeAreaView>
  );
}
