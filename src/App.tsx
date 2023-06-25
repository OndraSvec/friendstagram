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
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Liked from "./pages/Liked";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

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
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Feed />} />
        <Route path="chat" element={<Chat />} />
        <Route path="search" element={<Search />} />
        <Route path="post" element={<Post />} />
        <Route path="liked" element={<Liked />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);

export default App;
