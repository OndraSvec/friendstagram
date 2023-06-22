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
    className={`${className} flex cursor-not-allowed items-center justify-center gap-1 disabled:bg-gray-300`}
    disabled={disabled}
  >
    <>
      {icon}
      {text}
    </>
  </button>
);

export default Button;
