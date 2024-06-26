import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth/AuthContext'

export const useAuth = () => {
  return useContext(AuthContext)
}
