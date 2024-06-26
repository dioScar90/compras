import { Footer } from "../Footer";
import { Header } from "../Header";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
