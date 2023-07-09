import { useContext } from "react";
import { AppContext } from "../AppContext";

const Notification = () => {
  const { notification } = useContext(AppContext);
  return (
    <div className="w-fit bg-sky-400 p-2 text-justify text-sm font-medium text-white sm:text-lg md:text-2xl">
      <p>{notification}</p>
    </div>
  );
};

export default Notification;
