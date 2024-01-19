import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChatUser } from "../firebase/types";

interface UserCarouselItemProps {
  user: ChatUser
}

const UserCarouselItem: React.FC<UserCarouselItemProps> = ({ user }) => (
  <Link to={`/feed/search/${user.uid}`}>
    <div className="flex flex-col items-center gap-1 whitespace-nowrap">
      {user.photo ? (
        <img
          src={user.photo}
          referrerPolicy="no-referrer"
          className="w-9 rounded-full sm:w-12 md:w-[75px] lg:w-[90px]"
        />
      ) : (
        <FaUserCircle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
      )}

      {user.name ? (
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          {user.name}
        </p>
      ) : (
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          {user.email}
        </p>
      )}
    </div>
  </Link>
);

export default UserCarouselItem;
