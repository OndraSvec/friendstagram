import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => (
  <div className="flex flex-grow flex-col">
    <Header />
    <main className="flex flex-grow flex-col items-center justify-center">
      <Outlet />
    </main>
    <footer>hello</footer>
  </div>
);

export default Layout;
