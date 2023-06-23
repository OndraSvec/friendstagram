import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import { AppContextProvider } from "./AppContext";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route
        path="signup"
        element={
          <SignUp
            initialState={{ email: "", password: "", confirmPassword: "" }}
          />
        }
      />
      <Route
        path="feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);

export default App;
