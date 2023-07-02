import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => (
  <div className="flex flex-grow flex-col">
    <Header />
    <main className="mb-10 mt-12 flex flex-grow flex-col items-center justify-center overflow-hidden">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
