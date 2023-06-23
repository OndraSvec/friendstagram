import { ReactNode, useContext } from "react";
import { AppContext } from "../AppContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
