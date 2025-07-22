export interface Developer {
  id: number;
  nickname: string;
  distance: string;
  position: string;
  skills: string[];
  experience: string;
  image: string;
  category: "nearby" | "popular" | "favorite";
}
