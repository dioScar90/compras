import { schema } from './consts';
import { ZodError } from 'zod';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { ActionFunctionArgs, redirect } from 'react-router-dom';

export const actionFormRegister = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  try {
    let registeredUser

    if (data?.type === 'google') {
      const provider = new GoogleAuthProvider()
      registeredUser = await signInWithPopup(auth, provider)
    } else {
      const { email, password } = await schema.parseAsync(data)
      registeredUser = await createUserWithEmailAndPassword(auth, email, password)
    }
    
    console.log('registeredUser', registeredUser);
    return redirect('/dashboard')
  } catch (err) {
    if (err instanceof ZodError) {
      console.log('ZodError', err)
      return err.issues.reduce((acc, { message, path }) => ({ ...acc, [path[0]]: { message } }), {})
    }

    console.log('Error', err)
    return null
  }
}