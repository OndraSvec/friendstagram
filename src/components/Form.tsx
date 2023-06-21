import { ChangeEvent, FormEvent, useState } from "react";
import Button from "./Button";

interface FormProps {
  buttonText: string;
  submitFunc: () => void;
}

interface FormData {
  email: string;
  password: string;
}

const Form: React.FC<FormProps> = ({ buttonText, submitFunc }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button text={buttonText} />
    </form>
  );
};

export default Form;
