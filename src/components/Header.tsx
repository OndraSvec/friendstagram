import { BsChatLeft } from "react-icons/bs";
import Button from "./Button";

const Header = () => {
  return (
    <header className="grid grid-cols-3 items-center border-b border-solid border-gray-300 px-3 py-2">
      <div></div>
      <div>
        <h1 className="text-center font-brush text-lg">Friendstagram</h1>
      </div>
      <div className="flex justify-end">
        <Button icon={<BsChatLeft className="text-base text-black" />} />
      </div>
    </header>
  );
};

export default Header;
