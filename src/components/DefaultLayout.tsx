import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

const DefaultLayout = () => {
  return (
    <>
      <Header />

      <main>
        <div className="container">
          <Outlet />
        </div>

        <Footer />
      </main>
    </>
  )
}

export default DefaultLayout
