export interface User {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
