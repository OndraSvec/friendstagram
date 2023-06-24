import { BsChatLeft } from "react-icons/bs";
import Button from "./Button";

const Header = () => {
  return (
    <div className="grid grid-cols-3 items-center px-3 py-2">
      <div></div>
      <div>
        <h1 className="text-center font-brush text-lg">Friendstagram</h1>
      </div>
      <div className="flex justify-end">
        <Button icon={<BsChatLeft />} />
      </div>
    </div>
  );
};

export default Header;
