export interface Position {
  id: number;
  field: string;
  role: string;
}

export interface Interest {
  id: number;
  value: string;
}

export interface Stack {
  id: number;
  value: string;
}

export interface PositionsInterestsResponse {
  positions: Position[];
  interests: Interest[];
}
