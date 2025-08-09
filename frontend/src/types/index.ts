export interface User{
    id: string;
    name: string;
};

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
};

// Auth
export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
};

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

//Theme
export type ThemeMode = 'light' | 'dark';


export interface ThemeState {
  mode: ThemeMode;
};