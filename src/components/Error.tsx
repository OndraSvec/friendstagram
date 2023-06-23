import { useContext } from "react";
import { AppContext } from "../AppContext";

const Error = () => {
  const { error } = useContext(AppContext);
  return (
    <div className="w-fit bg-rose-500 p-2 text-justify text-sm font-medium text-white sm:text-lg md:text-2xl">
      <p>Sorry, something went wrong: {error}</p>
    </div>
  );
};

export default Error;
