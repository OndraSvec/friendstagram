import { Link } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Form from "../components/Form";
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
  const { signUpWithPassword } = useContext(AppContext);
  return (
    <Wrapper>
      <div className="grid w-full  grid-cols-3 items-center border-b border-solid border-gray-300 p-2">
        <Link to="/">
          <MdOutlineArrowBackIosNew className="text-lg" />
        </Link>
        <h1 className="text-center text-sm font-medium">Register</h1>
        <div></div>
      </div>
      <Wrapper className="w-full justify-center p-10">
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
