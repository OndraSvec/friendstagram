import {
  BsPlusSquare,
  BsPlusSquareFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import {
  BiSearch,
  BiSolidSearch,
  BiUserCircle,
  BiSolidUserCircle,
} from "react-icons/bi";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="grid grid-cols-5 border-t border-solid border-gray-300 px-3 py-2">
      <div className="grid place-items-center">
        <Button icon={<HiHome className="text-lg text-black" />} />
      </div>
      <div className="grid place-items-center">
        <Button icon={<BiSearch className="text-lg text-black" />} />
      </div>
      <div className="grid place-items-center">
        <Button icon={<BsPlusSquare className="text-lg text-black" />} />
      </div>
      <div className="grid place-items-center">
        <Button icon={<BsHeart className="text-lg text-black" />} />
      </div>
      <div className="grid place-items-center">
        <Button icon={<BiUserCircle className="text-lg text-black" />} />
      </div>
    </footer>
  );
};

export default Footer;
