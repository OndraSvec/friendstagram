import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import { AppContextProvider } from "./AppContext";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Login />} />)
);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);

export default App;
