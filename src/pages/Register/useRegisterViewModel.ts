import { useEffect, useReducer } from "react";
import { useNavigate, useActionData } from "react-router-dom";
import { useAuth } from '../../hooks/auth';
import { z } from 'zod';
import { schema } from './consts';

type UserState = z.infer<typeof schema>

interface UserAction {
  type: 'change_email' | 'change_password' | undefined
  value: string
}

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case 'change_email': {
      return {
        ...state,
        email: action.value,
      }
    }
    case 'change_password': {
      return {
        ...state,
        password: action.value,
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export const useRegisterViewModel = () => {
  const { user, isLoading, register, loginWithGoogle } = useAuth()
  const [state, dispatch] = useReducer(reducer, { email: '', password: '' })
  const errors = useActionData() as { [Property in keyof typeof schema.shape]?: { message: string } } | null
  const navigate = useNavigate()
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  return {
    user,
    isLoading,
    state,
    dispatch,
    register,
    loginWithGoogle,
    errors,
  }
}
