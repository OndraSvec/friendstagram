import { ChangeEvent, FormEvent, useState, useRef, useContext } from "react";
import Button from "./Button";
import { AppContext } from "../AppContext";

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
  const { loading } = useContext(AppContext);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col items-center gap-2"
    >
      <input
        type="email"
        name="email"
        placeholder="Email"
        className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
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
        className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
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
          className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}
      <Button
        text={buttonText}
        className="w-full rounded-md bg-sky-400 p-1 text-sm font-medium text-white"
        disabled={!formValid || loading}
      />
    </form>
  );
};

export default Form;
