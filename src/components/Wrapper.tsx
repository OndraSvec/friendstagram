import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => (
  <div className={`flex flex-grow flex-col items-center ${className}`}>
    {children}
  </div>
);

export default Wrapper;
