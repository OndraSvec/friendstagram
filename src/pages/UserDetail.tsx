import {
  createChat,
  getChat,
  getProfileFeed,
  getUser,
} from "../firebase/functions";
import ImageGrid from "../components/ImageGrid";
import { Timestamp } from "firebase/firestore";
import Wrapper from "../components/Wrapper";
import {
  Link,
  useLoaderData,
  useParams,
  useNavigate,
  redirect,
  Navigate,
} from "react-router-dom";
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
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(userID).then((res) => setDisplayedUser(res));
  }, []);

  const totalComments = posts.reduce(
    (acc, current) => acc + current.comments.length,
    0
  );
  const totalLikes = posts.reduce(
    (acc, current) => acc + current.likes.length,
    0
  );

  const handleOutgoingMessage = async () => {
    setLoading(true);
    if (!(await getChat(user.uid, displayedUser.uid))) {
      await createChat(user.uid, displayedUser.uid);
    }
    setLoading(false);
    navigate("/feed/chat/");
  };

  const userInfo = (
    <div className="mb-2 flex w-full flex-col gap-2 px-1 py-2 text-xs sm:gap-3 sm:text-sm md:gap-4 md:text-base lg:w-3/4 lg:gap-6 lg:text-lg">
      <div className="flex w-5/6 items-end justify-between self-center sm:w-2/3 lg:w-1/2">
        <div>
          {displayedUser?.photo ? (
            <img
              src={displayedUser?.photo}
              className="w-9 rounded-full sm:w-12 md:w-[75px] lg:w-[90px]"
            />
          ) : (
            <FaUserCircle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
          )}
          {displayedUser?.name ? (
            <p>{displayedUser?.name}</p>
          ) : (
            <p>{displayedUser?.email}</p>
          )}
        </div>
        <div className="text-right">
          <p>Posts: {posts.length}</p>
          <p>Likes: {totalLikes}</p>
          <p>Comments: {totalComments}</p>
        </div>
      </div>
      {user.uid !== displayedUser?.uid && (
        <Button
          text="Start chatting"
          className="w-5/6 self-center rounded-md bg-sky-400 p-1 text-xs font-medium text-white disabled:bg-gray-300 sm:w-2/3 sm:p-2 sm:text-sm md:p-3 md:text-base lg:w-1/2 lg:text-lg"
          onClick={handleOutgoingMessage}
          disabled={loading}
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
