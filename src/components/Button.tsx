import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ icon, text, className, onClick }) => (
  <button
    onClick={onClick}
    className={`${className} flex items-center justify-center gap-1`}
  >
    <>
      {icon}
      {text}
    </>
  </button>
);

export default Button;
