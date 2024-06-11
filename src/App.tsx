// import './App.css'
import { createBrowserRouter, createRoutesFromElements, Navigate, redirect, Route, RouterProvider } from 'react-router-dom'
import { DefaultLayout } from './components/DefaultLayout'
import ComprasLayout from './components/ComprasLayout'
import { action as novaCompraAction, NovaCompra } from './pages/NovaCompra'
import { loader as compraLoader, Compra } from './pages/Compra'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import { Login } from './pages/Login'
// import { AuthProvider } from './providers/AuthProvider'
// import { useAuth } from './hooks/auth'

// const RedirectIfHasUser = () => {
//   const { user } = useAuth()
//   return user ? <Navigate to="/dashboard" replace /> : <Outlet />
// }

// const Protected = () => {
//   const { user } = useAuth()
//   return !user ? <Navigate to="/login" replace /> : <Outlet />
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Home />} />

      <Route
        path="login"
        action={() => onAuthStateChanged(auth, (user) => !!user && redirect('dashboard'))}
        element={<Login />}
      />
      
      <Route
        path="register"
        action={() => onAuthStateChanged(auth, (user) => !!user && redirect('dashboard'))}
        element={<Register />}
      />

      <Route path="compra" element={<ComprasLayout />}>
        <Route index element={<Navigate to="nova" replace />} />
        <Route path="nova" element={<NovaCompra />} action={novaCompraAction} />
        <Route path=":id" loader={compraLoader} element={<Compra />} />
      </Route>
    </Route>
  )
)

const App = () => {
  return (
    // <AuthProvider>
      <RouterProvider router={router} />
    // </AuthProvider>
  )
}

export default App
