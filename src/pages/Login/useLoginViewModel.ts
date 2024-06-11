import { useState } from "react";
import { useAuth } from '../../hooks/auth';

export const useLoginViewModel = () => {
  const { user, isLoading, login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const errors = useActionData()
  
  return {
    user,
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    login,
    loginWithGoogle,
    errors,
  }
};
