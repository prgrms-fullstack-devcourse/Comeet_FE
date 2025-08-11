export interface Developer {
  id: number;
  nickname: string;
  distance: string;
  position: string;
  stacks: string[];
  experience: string;
  image: string;
  category: "nearby" | "popular" | "favorite";
}

export interface NearbyUser {
  location: {
    lng: number;
    lat: number;
  };
  distance: number;
  nickname: string;
  avatar: string;
  age: number;
  experience: number;
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
  nSubscribers: number;
}

export interface NearbyUsersResponse {
  results: NearbyUser[];
}

export interface NearbyUsersParams {
  radius: number;
  age?: string;
  experience?: string;
  positionIds?: number[];
  techIds?: number[];
  interestIds?: number[];
}
