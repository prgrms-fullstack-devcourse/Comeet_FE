export interface LoginResponse {
  accessToken?: string;
  sessionId?: string;
  result?: {
    nickname: string;
    avatar: string;
    accessToken: string;
  };
}

export type FetchLoginResponse = LoginResponse;

export interface SignUpRequest {
  nickname: string;
  age: number;
  experience: number;
  bio: string;
  location: {
    lng: number;
    lat: number;
  };
  positionId: number;
  techIds: number[];
  interestIds: number[];
  email?: string;
  instagram?: string;
  linkedIn?: string;
  blog?: string;
}
