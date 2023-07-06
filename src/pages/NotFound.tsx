import Wrapper from "../components/Wrapper";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrapper className="justify-center gap-2 p-10 text-center text-sm font-medium text-rose-700 sm:gap-4 sm:text-base md:gap-6 md:text-lg lg:gap-8 lg:text-xl">
      <h1>Oops, the page you are looking for does not exist..</h1>
      <Button
        className="rounded-md bg-sky-400 p-2 text-white sm:p-3 md:p-4"
        text="Refresh the app"
        onClick={() => navigate("/")}
      />
    </Wrapper>
  );
};

export default NotFound;
