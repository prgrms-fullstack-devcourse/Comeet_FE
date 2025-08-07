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

export interface ExistingUserResponse {
  status: 200;
  accessToken: string;
  sessionId: string;
  user: User;
}

export interface NewUserResponse {
  status: 210;
  githubId: string;
  sessionId: string;
  user: User;
}

export type FetchLoginResponse = ExistingUserResponse | NewUserResponse;
