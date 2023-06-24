import { NavLink } from "react-router-dom";
import {
  BsPlusSquare,
  BsPlusSquareFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="grid grid-cols-5 items-center border-t border-solid border-gray-300 px-3 py-2">
      <div className="grid place-items-center">
        <NavLink to="." end>
          {({ isActive }) =>
            isActive ? (
              <HiHome className="text-lg text-black" />
            ) : (
              <HiOutlineHome className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="search">
          {({ isActive }) =>
            isActive ? (
              <RiSearchFill className="text-lg text-black" />
            ) : (
              <BiSearch className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="post">
          {({ isActive }) =>
            isActive ? (
              <BsPlusSquareFill className="text-lg text-black" />
            ) : (
              <BsPlusSquare className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="liked">
          {({ isActive }) =>
            isActive ? (
              <BsHeartFill className="text-lg text-black" />
            ) : (
              <BsHeart className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="profile">
          {({ isActive }) =>
            isActive ? (
              <FaUserCircle className="text-lg text-black" />
            ) : (
              <FaRegUserCircle className="text-lg text-black" />
            )
          }
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
