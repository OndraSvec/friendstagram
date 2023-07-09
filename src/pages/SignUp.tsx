import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Form from "../components/Form";
import Error from "../components/Error";
import Notification from "../components/Notification";
import { useContext } from "react";
import { AppContext } from "../AppContext";

interface SignUpProps {
  initialState: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const SignUp: React.FC<SignUpProps> = ({ initialState }) => {
  const { error, notification, signUpWithPassword } = useContext(AppContext);
  return (
    <Wrapper>
      <div className="grid w-full  grid-cols-3 items-center border-b border-solid border-gray-300 p-2 sm:p-3 md:border-b-2 md:p-4">
        <Link to="/" className="focus:outline-none">
          <MdOutlineArrowBackIosNew className="text-lg sm:text-2xl md:text-3xl" />
        </Link>
        <h1 className="text-center text-sm font-medium sm:text-lg md:text-2xl">
          Register
        </h1>
        <div></div>
      </div>
      <Wrapper className="w-full justify-center gap-2 p-10 md:gap-6">
        {error && <Error />}
        {notification && <Notification />}
        <Form
          state={initialState}
          buttonText="Create Account"
          submitFunc={signUpWithPassword}
          signUpForm={true}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default SignUp;
