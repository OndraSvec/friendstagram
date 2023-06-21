import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, className, onClick }) => (
  <button onClick={onClick} className={className}>
    {icon}
    {text}
  </button>
);

export default Button;
