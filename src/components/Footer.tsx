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
    <footer className="fixed bottom-0 z-10 grid h-10 w-full grid-cols-5 items-center border-t border-solid border-gray-300 bg-white px-3 py-2">
      <div className="grid place-items-center">
        <NavLink to="." end className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <HiHome className="text-lg text-black sm:text-xl md:text-2xl" />
            ) : (
              <HiOutlineHome className="text-lg text-black sm:text-xl md:text-2xl" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="search" className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <RiSearchFill className="text-lg text-black sm:text-xl md:text-2xl" />
            ) : (
              <BiSearch className="text-lg text-black sm:text-xl md:text-2xl" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="post" className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <BsPlusSquareFill className="text-lg text-black sm:text-xl md:text-2xl" />
            ) : (
              <BsPlusSquare className="text-lg text-black sm:text-xl md:text-2xl" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="liked" className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <BsHeartFill className="text-lg text-black sm:text-xl md:text-2xl" />
            ) : (
              <BsHeart className="text-lg text-black sm:text-xl md:text-2xl" />
            )
          }
        </NavLink>
      </div>
      <div className="grid place-items-center">
        <NavLink to="profile" className="focus:outline-none">
          {({ isActive }) =>
            isActive ? (
              <FaUserCircle className="text-lg text-black sm:text-xl md:text-2xl" />
            ) : (
              <FaRegUserCircle className="text-lg text-black sm:text-xl md:text-2xl" />
            )
          }
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
