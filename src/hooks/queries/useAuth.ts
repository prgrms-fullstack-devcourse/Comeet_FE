import { useMutation } from "@tanstack/react-query";
import { fetchLogin, fetchSignUp } from "@/lib/api/auth";
import type { FetchLoginResponse, SignUpRequest } from "@/types/auth.types";

export const useLogin = () => {
  return useMutation<FetchLoginResponse, Error, string>({
    mutationFn: async (code: string) => {
      const result = await fetchLogin(code);
      return result;
    },
    retry: false,
  });
};

export const useSignUp = () => {
  return useMutation<void, Error, { sessionId: string; data: SignUpRequest }>({
    mutationFn: async ({ sessionId, data }) => {
      await fetchSignUp(sessionId, data);
    },
    retry: false,
  });
};
