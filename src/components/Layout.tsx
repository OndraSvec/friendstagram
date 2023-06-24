import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex flex-grow flex-col">
    <header>hi</header>
    <main className="flex flex-grow flex-col items-center justify-center">
      <Outlet />
    </main>
    <footer>hello</footer>
  </div>
);

export default Layout;
