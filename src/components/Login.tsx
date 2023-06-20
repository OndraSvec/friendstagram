import { useContext } from "react";
import { AppContext } from "../AppContext";

const Login = () => {
  const { user, error, signInWithGoogle, signInWithFacebook, signOut } =
    useContext(AppContext);
  return (
    <div className="grid flex-grow place-items-center">
      <h1 className="font-brush">Friendstagram</h1>
      <button onClick={() => signInWithGoogle()}>Google</button>
      <button onClick={() => signInWithFacebook()}>Facebook</button>
      <button onClick={() => signOut()}>Out</button>
      {user && <p>{user.displayName}</p>}
      {error && <p>Sorry, something went wrong: {error}</p>}
    </div>
  );
};

export default Login;
