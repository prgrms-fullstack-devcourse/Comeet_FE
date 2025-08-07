export interface Position {
  id: number;
  name: string;
  description: string;
}

export interface PositionCategory {
  category: string;
  positions: readonly Position[];
}

export interface Stack {
  id: number;
  label: string;
}
