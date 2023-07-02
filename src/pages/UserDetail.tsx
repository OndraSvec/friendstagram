import { getProfileFeed, getUser } from "../firebase/functions";
import ImageGrid from "../components/ImageGrid";
import { Timestamp } from "firebase/firestore";
import Wrapper from "../components/Wrapper";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import Button from "../components/Button";
import { FaUserCircle } from "react-icons/fa";

export function loader({ params }) {
  return getProfileFeed(params.userID);
}

const UserDetail = () => {
  const posts: {
    comments: { comment: string; uid: string }[];
    createdAt: Timestamp;
    description: string;
    likes: string[];
    uid: string;
    url: string;
    id: string;
  }[] = useLoaderData();
  const { userID } = useParams();
  const [displayedUser, setDisplayedUser] = useState<{
    email: string;
    name: string | null;
    photo: string | null;
    uid: string;
  } | null>(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    getUser(userID).then((res) => setDisplayedUser(res));
  }, []);

  const userInfo = (
    <div className="mb-2 flex w-full flex-col gap-2 px-1 py-2 sm:gap-3 md:gap-4 lg:w-3/4 lg:gap-6">
      <div className="flex w-2/3 items-end justify-between self-center sm:w-1/2">
        <div className="flex flex-col items-center">
          {displayedUser?.photo ? (
            <img
              src={displayedUser?.photo}
              className="w-9 rounded-full sm:w-12 md:w-[75px] lg:w-[90px]"
            />
          ) : (
            <FaUserCircle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
          )}
          {displayedUser?.name ? (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              {displayedUser?.name}
            </p>
          ) : (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              {displayedUser?.email}
            </p>
          )}
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg">
          Posts: {posts.length}
        </p>
      </div>
      {user.uid !== userID && (
        <Button
          text="Send message"
          className="w-2/3 self-center rounded-md bg-sky-400 p-1 text-xs font-medium text-white disabled:bg-gray-300 sm:w-1/2 sm:p-2 sm:text-sm md:p-3 md:text-base lg:text-lg"
        />
      )}
    </div>
  );

  const feedElements = posts.map((post) => (
    <div key={post.id} className="aspect-square w-full">
      <Link to={`/feed/search/user/${post.id}`}>
        <img
          src={post.url}
          loading="lazy"
          className="aspect-square w-full object-cover object-center"
        />
      </Link>
    </div>
  ));
  return (
    <Wrapper>
      {userInfo}
      <ImageGrid>{feedElements}</ImageGrid>
    </Wrapper>
  );
};

export default UserDetail;
