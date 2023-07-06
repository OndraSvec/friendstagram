import { useNavigate, useRouteError } from "react-router-dom";
import Wrapper from "./Wrapper";
import Button from "./Button";

const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Wrapper className="justify-center gap-2 text-sm font-medium text-rose-700 sm:text-base md:gap-4 md:text-lg lg:gap-6 lg:text-xl">
      <h1>Oops, something went wrong..</h1>
      {error ? <h2>Error: {error.message}</h2> : ""}
      <Button
        className="rounded-md bg-sky-400 p-2 text-white sm:p-3 md:p-4"
        text="Go back to your feed"
        onClick={() => navigate("/feed/")}
      />
    </Wrapper>
  );
};

export default ErrorElement;
