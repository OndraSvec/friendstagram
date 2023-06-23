import {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import Button from "./Button";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

interface FormProps {
  state: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
  submitFunc: (...args: string[]) => void;
  buttonText: string;
  signUpForm: boolean;
}

interface FormData {
  email: string;
  password: string;
}

interface FormDataExpanded {
  email: string;
  password: string;
  confirmPassword: string;
}

const Form: React.FC<FormProps> = ({
  state,
  buttonText,
  submitFunc,
  signUpForm,
}) => {
  const [formData, setFormData] = useState<FormData | FormDataExpanded>(state);
  const [formValid, setFormValid] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPassRef = useRef<HTMLInputElement | null>(null);
  const { user, loading } = useContext(AppContext);
  const navigate = useNavigate();

  const checkFormValidity = () => {
    if (signUpForm) {
      const invalid =
        !emailRef.current?.value ||
        !passwordRef.current?.value ||
        !confirmPassRef.current?.value ||
        passwordRef.current.value !== confirmPassRef.current.value;
      if (invalid) setFormValid(false);
      else setFormValid(true);
    } else {
      const invalid = !emailRef.current?.value || !passwordRef.current?.value;
      if (invalid) setFormValid(false);
      else setFormValid(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataVals = Object.values(formData);
    if (!formValid) return;
    submitFunc(...formDataVals);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    checkFormValidity();
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      const unsub = navigate("/feed", { replace: true });
      return () => unsub;
    }
  }, [user, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-4/5 flex-col items-center gap-2 text-sm sm:gap-4 sm:text-lg md:gap-6 md:text-2xl lg:w-3/5"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        className=" border-1 w-full rounded-sm border border-gray-300 p-1  text-gray-400 outline-gray-300 sm:p-2 md:border-2 md:p-3"
        ref={emailRef}
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        title="At least 8 characters with one or more lowercase, one or more uppercase, one or more numbers and one or more special characters."
        className=" border-1 w-full rounded-sm border border-gray-300 p-1  text-gray-400 outline-gray-300 sm:p-2 md:border-2 md:p-3"
        ref={passwordRef}
        value={formData.password}
        onChange={handleChange}
      />
      {signUpForm && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          title="At least 8 characters with one or more lowercase, one or more uppercase, one or more numbers and one or more special characters."
          ref={confirmPassRef}
          className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-gray-400 outline-gray-300  sm:p-2 md:border-2 md:p-3"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}
      <Button
        text={buttonText}
        className="w-full rounded-md bg-sky-400 p-1 font-medium text-white disabled:bg-gray-300 sm:p-2 md:p-3"
        disabled={!formValid || loading}
      />
    </form>
  );
};

export default Form;
