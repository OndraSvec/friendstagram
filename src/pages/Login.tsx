import { useContext } from "react";
import { AppContext } from "../AppContext";
import Form from "../components/Form";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Wrapper from "../components/Wrapper";
import Error from "../components/Error";

const Login = () => {
  const { error, loading, signInWithGoogle, signInWithPassword } =
    useContext(AppContext);
  return (
    <Wrapper className="justify-center gap-10 p-2 sm:gap-16">
      <h1 className="font-brush text-3xl sm:text-4xl md:text-5xl">
        Friendstagram
      </h1>
      {error && <Error />}
      <Form
        state={{ email: "", password: "" }}
        buttonText="Log in"
        submitFunc={signInWithPassword}
        signUpForm={false}
      />
      <div className="flex w-4/5 items-center lg:w-3/5">
        <div className="w-full border-b-2"></div>
        <p className="mx-4 text-sm font-medium text-gray-500 sm:text-lg md:text-2xl">
          OR
        </p>
        <div className="w-full border-b-2"></div>
      </div>
      <div className="w-4/5">
        <Button
          icon={<FcGoogle className="text-xl sm:text-3xl md:text-4xl" />}
          text="Log in with Google"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full p-1 text-sm font-medium text-rose-700 sm:text-lg md:text-2xl"
        />
      </div>
      <div className="flex w-4/5 justify-center gap-1 text-xs sm:text-base md:text-lg lg:w-3/5">
        <p>Don't have an account?</p>
        <Link
          to="/signup"
          className="font-medium text-sky-400 focus:outline-none"
        >
          Sign Up
        </Link>
      </div>
    </Wrapper>
  );
};

export default Login;
