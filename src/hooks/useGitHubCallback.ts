import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@/lib/api";
import type { FetchLoginResponse } from "@/types/auth";

export const useGitHubCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const signInMutation = useMutation<FetchLoginResponse, Error, string>({
    mutationFn: fetchLogin,
    retry: false,
    onSuccess: (result) => {
      sessionStorage.removeItem("github_oauth_state");

      if (result.status === 200 && result.accessToken) {
        sessionStorage.setItem("sessionId", result.accessToken);
        navigate("/", { replace: true });
      } else if (result.status === 210 && result.sessionId) {
        sessionStorage.setItem("signUpSessionId", result.sessionId);
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    },
    onError: () => {
      navigate("/login", { replace: true });
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state || hasFetched.current) {
      return;
    }

    const storedState = sessionStorage.getItem("github_oauth_state");
    if (state !== storedState) {
      navigate("/login", { replace: true });
      return;
    }

    hasFetched.current = true;
    signInMutation.mutate(code);
  }, [searchParams, navigate, signInMutation.mutate]);

  return {
    isPending: signInMutation.isPending,
    isError: signInMutation.isError,
    error: signInMutation.error,
  };
};
