import { User, UserCredential } from 'firebase/auth';
import { createContext } from "react";

type AuthType = {
  user: User | null
  isLoading?: boolean
  register?: (email: string, password: string) => Promise<UserCredential>
  login?: (email: string, password: string) => Promise<UserCredential>
  loginWithGoogle?: () => Promise<UserCredential>
  logout?: () => Promise<void>
  linkWithGoogle?: () => Promise<void>
  resetPassword?: (email: string) => Promise<void>
  changePassword?: (password: string) => Promise<void>
}

export const AuthContext = createContext<AuthType>({ user: null });
