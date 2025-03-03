export interface AuthResponse {
  ok: boolean;
  msg?: string;
  uid?: string;
  name?: string;
  email?: string;
  token?: string;
  newToken?: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
}
