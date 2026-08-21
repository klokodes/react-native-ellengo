import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from "react-native";

import { showAlert } from "@/lib/alert";

const CODE_LENGTH = 6;

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  email?: string;
  onSubmitCode: (code: string) => Promise<{ success: boolean; message?: string }>;
};

export function VerificationModal({ visible, onClose, email, onSubmitCode }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setCode("");
      setIsVerifying(false);
    }
  }, [visible]);

  const handleChangeCode = async (value: string) => {
    const digits = value.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digits);
    if (digits.length === CODE_LENGTH) {
      setIsVerifying(true);
      const result = await onSubmitCode(digits);
      setIsVerifying(false);
      if (!result.success) {
        showAlert("Incorrect code", result.message ?? "Please try again.");
        setCode("");
      }
    }
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 justify-end bg-black/40">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
          <View className="rounded-t-[28px] bg-white px-6 pb-10 pt-6">
            <View className="mb-5 h-1 w-10 self-center rounded-full bg-border" />

            <Text className="text-center text-[22px] font-poppins-bold text-ink">Check your email</Text>
            <Text className="mt-2 text-center text-[14px] leading-[20px] text-ink-muted">
              {email ? `We sent a 6-digit code to ${email}.` : "We sent a 6-digit verification code to your email."}
              {"\n"}Enter it below to continue.
            </Text>

            <Pressable className="mt-8 flex-row justify-center gap-2.5" onPress={() => inputRef.current?.focus()}>
              {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                <View
                  key={index}
                  className={`h-14 w-11 items-center justify-center rounded-[14px] border ${
                    index === code.length ? "border-primary" : "border-border"
                  } bg-[#F6F8FA]`}
                >
                  <Text className="text-[20px] font-poppins-semibold text-ink">{code[index] ?? ""}</Text>
                </View>
              ))}
            </Pressable>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleChangeCode}
              editable={!isVerifying}
              keyboardType="number-pad"
              autoFocus
              maxLength={CODE_LENGTH}
              className="absolute h-px w-px opacity-0"
            />

            <Pressable className="mt-8 items-center" onPress={handleClose}>
              <Text className="text-[14px] font-poppins-semibold text-primary">Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
