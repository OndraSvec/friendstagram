import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { BsChatLeft, BsChatLeftFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import Button from "./Button";

const Header = () => {
  const { signOut } = useContext(AppContext);
  return (
    <header className="fixed z-10 grid h-12 w-full grid-cols-3 items-center border-b border-solid border-gray-300 bg-white px-3 py-2 sm:px-5 md:px-8">
      <div>
        <Button
          icon={
            <RxExit className="rotate-180 text-base text-black sm:text-lg md:text-xl" />
          }
          onClick={signOut}
        />
      </div>
      <div>
        <h1 className="text-center font-brush text-lg sm:text-xl md:text-2xl">
          Friendstagram
        </h1>
      </div>
      <div className="flex justify-end">
        <NavLink to="chat" className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <BsChatLeftFill className="text-base text-black sm:text-lg md:text-xl" />
            ) : (
              <BsChatLeft className="text-base text-black sm:text-lg md:text-xl" />
            )
          }
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
