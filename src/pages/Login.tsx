import { useContext } from "react";
import { AppContext } from "../AppContext";
import Form from "../components/Form";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Wrapper from "../components/Wrapper";

const Login = () => {
  const {
    error,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    signInWithPassword,
  } = useContext(AppContext);
  return (
    <Wrapper className="gap-10 p-10">
      <h1 className="font-brush text-3xl">Friendstagram</h1>
      <Form
        state={{ email: "", password: "" }}
        buttonText="Log in"
        submitFunc={signInWithPassword}
        signUpForm={false}
      />
      <div className="flex w-full items-center">
        <div className="w-full border-b-2"></div>
        <p className="mx-4 font-medium text-gray-500">OR</p>
        <div className="w-full border-b-2"></div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button
          icon={<AiFillFacebook className="text-xl" />}
          text="Log in with Facebook"
          onClick={signInWithFacebook}
          disabled={loading}
          className="w-full p-1 text-sm font-medium text-blue-900"
        />
        <Button
          icon={<FcGoogle className="text-xl" />}
          text="Log in with Google"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full p-1 text-sm font-medium text-rose-700"
        />
      </div>
      <div className="flex w-full justify-center gap-1 text-xs">
        <p>Don't have an account?</p>
        <Link to="/signup" className="font-medium text-sky-400">
          Sign Up
        </Link>
      </div>
      {error && <p>Sorry, something went wrong: {error}</p>}
    </Wrapper>
  );
};

export default Login;
