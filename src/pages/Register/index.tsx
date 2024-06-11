import { Form } from 'react-router-dom'
import { useRegisterViewModel } from './useRegisterViewModel.ts'

export const Register = () => {
  const { errors, state, dispatch, isLoading } = useRegisterViewModel()
  
  return (
    <div>
      <div>
        <h1>This is the register page</h1>
        <Form method="post">
          <input
            type="email" name="email" placeholder="Email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'change_email', value: e.target.value })}
          />
          {errors?.email && <span>{errors.email.message}</span>}

          <input
            type="password" name="password" placeholder="Password"
            value={state.password}
            onChange={(e) => dispatch({ type: 'change_password', value: e.target.value })}
          />
          {errors?.password && <span>{errors.password.message}</span>}

          <button type="submit" disabled={isLoading}>Sign Up</button>
        </Form>
      </div>
      <div>
        <h3>Register with Google</h3>
        <Form method="post">
          <input type="hidden" name="type" value="google" />
          <button type="submit">Sign Up With Google</button>
        </Form>
      </div>
    </div>
  )
}
