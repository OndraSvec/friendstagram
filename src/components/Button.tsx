import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  text: string;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  className,
  onClick,
  disabled,
}) => (
  <button
    onClick={onClick}
    className={`${className} flex items-center justify-center gap-1 disabled:cursor-not-allowed`}
    disabled={disabled}
  >
    <>
      {icon}
      {text}
    </>
  </button>
);

export default Button;
