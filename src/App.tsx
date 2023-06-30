import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import { AppContextProvider } from "./AppContext";
import SignUp from "./pages/SignUp";
import Feed, { loader as feedLoader } from "./pages/Feed";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Search from "./pages/Search";
import Post from "./pages/Post";
import Liked from "./pages/Liked";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import ProfilePostDetail, {
  loader as postDetailLoader,
} from "./components/ProfilePostDetail";
import LikedPostDetail, {
  loader as likedPostLoader,
} from "./components/LikedPostDetail";

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
        <Route index element={<Feed />} loader={feedLoader} />
        <Route path="chat" element={<Chat />} />
        <Route path="search" element={<Search />} />
        <Route path="post" element={<Post />} />
        <Route path="liked" element={<Liked />} />
        <Route
          path="liked/:postID"
          element={<LikedPostDetail />}
          loader={likedPostLoader}
        />
        <Route path="profile" element={<Profile />} />
        <Route
          path="profile/:postID"
          element={<ProfilePostDetail />}
          loader={postDetailLoader}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App = () => (
  <AppContextProvider>
    <RouterProvider router={router} />
  </AppContextProvider>
);

export default App;
