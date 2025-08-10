export interface GetProfileResponse {
  nickname: string;
  avatar: string;
  age: number;
  experience: number;
  bio: string;
  position: {
    id: number;
    field: string;
    role: string;
  };
  techStack: Array<{
    id: number;
    value: string;
  }>;
  interests: Array<{
    id: number;
    value: string;
  }>;
  location: {
    lng: number;
    lat: number;
  };
  github?: string;
  email?: string;
  instagram?: string;
  linkedIn?: string;
  blog?: string;
  nSubscribers: number;
  subscribing: boolean;
}

export interface UpdateProfileRequest {
  nickname?: string;
  experience?: number;
  bio?: string;
  positionId?: number;
  techIds?: number[];
  interestIds?: number[];
  github?: string;
  email?: string;
  instagram?: string;
  linkedIn?: string;
  blog?: string;
}
