import { useContext } from "react";
import { AppContext } from "../AppContext";
import Form from "../components/Form";
import Button from "../components/Button";

const Login = () => {
  const {
    user,
    error,
    signInWithGoogle,
    signInWithFacebook,
    signInWithPassword,
  } = useContext(AppContext);
  return (
    <div className="grid flex-grow place-items-center">
      <h1 className="font-brush">Friendstagram</h1>
      <Form buttonText="Log in" submitFunc={signInWithPassword} />
      <Button text="Log in with Facebook" onClick={signInWithFacebook} />
      <Button text="Log in with Google" onClick={signInWithGoogle} />
      {user && <p>{user.displayName}</p>}
      {error && <p>Sorry, something went wrong: {error}</p>}
    </div>
  );
};

export default Login;
