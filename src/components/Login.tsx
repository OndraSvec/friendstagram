import { ReactNode } from "react";

interface LoginProps {
  children: ReactNode;
}

const Login: React.FC<LoginProps> = ({ children }) => (
  <div className="grid flex-grow place-items-center">
    <h1 className="font-brush">Friendstagram</h1>
    {children}
  </div>
);

export default Login;
