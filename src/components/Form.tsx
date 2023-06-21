import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";

interface FormProps {
  state: {
    email: string;
    password: string;
    confirmPassword?: string;
  };
  submitFunc: () => void;
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFunc();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        type="text"
        name="email"
        placeholder="Email"
        className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
        value={formData.password}
        onChange={handleChange}
      />
      {signUpForm && (
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className=" border-1 w-full rounded-sm border border-gray-300 p-1 text-sm text-gray-400 outline-gray-300"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      )}
      <Button
        text={buttonText}
        className="w-full rounded-md bg-sky-400 p-1 text-sm font-medium text-white"
      />
    </form>
  );
};

export default Form;
