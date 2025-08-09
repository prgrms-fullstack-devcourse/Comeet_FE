import type { FetchLoginResponse, SignUpRequest } from "@/types/auth.types";
import { createApiUrl, defaultHeaders } from "./config";

export const fetchLogin = async (code: string): Promise<FetchLoginResponse> => {
  const response = await fetch(
    `${createApiUrl("/auth/sign-in")}?code=${encodeURIComponent(code)}`,
    {
      method: "GET",
      headers: defaultHeaders,
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub 로그인 실패: ${response.status}`);
  }

  const data = await response.json();

  if (response.status === 200) {
    return {
      accessToken: data.accessToken,
      sessionId: data.sessionId,
      result: data.result,
    };
  } else {
    throw new Error(`GitHub 로그인 실패: ${response.status}`);
  }
};

export const fetchSignUp = async (
  sessionId: string,
  data: SignUpRequest
): Promise<void> => {
  const url = `${createApiUrl("/auth/sign-up")}?sessionId=${encodeURIComponent(
    sessionId
  )}`;

  const response = await fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`회원가입 실패: ${response.status} - ${errorText}`);
  }
};
