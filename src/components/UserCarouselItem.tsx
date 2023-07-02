import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface UserCarouselItemProps {
  user: {
    email: string;
    name: string | null;
    photo: string | null;
    uid: string;
  };
}

const UserCarouselItem: React.FC<UserCarouselItemProps> = ({ user }) => (
  <Link to={`/feed/search/${user.uid}`}>
    <div className="flex flex-col items-center gap-1">
      {user.photo ? (
        <img
          src={user.photo}
          className="md:w-18 w-12 rounded-full sm:w-14 lg:w-24"
        />
      ) : (
        <FaUserCircle className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl" />
      )}

      {user.name ? <p>{user.name}</p> : <p>{user.email}</p>}
    </div>
  </Link>
);

export default UserCarouselItem;
