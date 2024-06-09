import './App.css'
import { createBrowserRouter, createRoutesFromElements, redirect, Route, RouterProvider } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import ComprasLayout from './components/ComprasLayout'
import NovaCompra from './pages/NovaCompra/page'
import Home from './pages/Home/page'
import Compra from './pages/Compra/page'
import { loader as compraLoader } from './pages/Compra/page'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Home />} />
      <Route path="compra" element={<ComprasLayout />}>
        <Route index loader={() => redirect('nova')} />
        <Route path="nova" element={<NovaCompra />} />
        <Route path=":id" loader={compraLoader} element={<Compra />} />
      </Route>
    </Route>
  )
)

const App = () => <RouterProvider router={router} />
export default App
