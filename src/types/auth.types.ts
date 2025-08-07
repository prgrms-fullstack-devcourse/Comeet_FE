export interface User {
  nickname: string;
  age: number;
  experience: number;
  bio: string;
  position: number;
  techStack: number[];
  interests: number[];
  location: [number, number];
  email?: string;
  linkedin?: string;
  instagram?: string;
  blog?: string;
}

export interface LoginResponse {
  accessToken: string;
  sessionId: string;
}

export type FetchLoginResponse = LoginResponse;
