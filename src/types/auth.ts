export interface ExistingUserResponse {
  status: 200;
  token: string;
}

export interface NewUserResponse {
  status: 210;
  githubId: string;
}

export type FetchLoginResponse = ExistingUserResponse | NewUserResponse;