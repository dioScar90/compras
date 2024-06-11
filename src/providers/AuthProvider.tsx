import {
  createUserWithEmailAndPassword,
  linkWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updatePassword,
  User,
} from 'firebase/auth'
import { AuthContext } from '../contexts/auth/AuthContext'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const register = useCallback(async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth, provider)
  }, [])

  const linkWithGoogle = useCallback(async () => {
    if (!auth.currentUser) {
      return
    }

    try {
      const provider = new GoogleAuthProvider()
      await linkWithPopup(auth.currentUser, provider)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const logout = useCallback(async () => {
    console.log("saindo...")
    auth.signOut()
  }, [])

  const resetPassword = useCallback((email: string) => {
    return sendPasswordResetEmail(auth, email)
  }, [])

  const changePassword = useCallback((password: string) => {
    return updatePassword(auth.currentUser!, password)
  }, [])
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ ...user })
      } else {
        setUser(null)
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe()
  }, [])
  
  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      register,
      login,
      loginWithGoogle,
      logout,
      linkWithGoogle,
      resetPassword,
      changePassword,
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
