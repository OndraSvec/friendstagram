import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, onClick }) => (
  <button onClick={onClick}>
    {icon}
    {text}
  </button>
);

export default Button;
