import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { getLikedFeed } from "../firebase/functions";
import ImageGrid from "../components/ImageGrid";
import { Timestamp } from "firebase/firestore";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

const Liked = () => {
  const [posts, setPosts] = useState<
    | []
    | {
        comments: { comment: string; uid: string }[];
        createdAt: Timestamp;
        description: string;
        likes: string[];
        uid: string;
        url: string;
        id: string;
      }[]
    | { [x: string]: any }[]
  >([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      const handleLiked = async () => {
        const response = await getLikedFeed(user.uid);
        setPosts(response);
      };
      handleLiked();
    }
  }, []);

  const feedElements = posts.map((post) => (
    <div key={post.id} className="aspect-square w-full">
      <Link to={post.id}>
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
      <ImageGrid>{feedElements}</ImageGrid>
    </Wrapper>
  );
};

export default Liked;
