import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { BsChatLeft, BsChatLeftFill } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import Button from "./Button";

const Header = () => {
  const { signOut } = useContext(AppContext);
  return (
    <header className="grid grid-cols-3 items-center border-b border-solid border-gray-300 px-3 py-2">
      <div>
        <Button
          icon={<RxExit className="rotate-180 text-base text-black" />}
          onClick={signOut}
        />
      </div>
      <div>
        <h1 className="text-center font-brush text-lg">Friendstagram</h1>
      </div>
      <div className="flex justify-end">
        <NavLink to="chat">
          {({ isActive }) =>
            isActive ? (
              <BsChatLeftFill className="text-lg text-black" />
            ) : (
              <BsChatLeft className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
