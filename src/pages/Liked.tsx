import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { getLikedFeed, getProfileFeed } from "../firebase/functions";
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
  >([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const unsub = getLikedFeed(user.uid).then((res) => setPosts(res));

    return () => unsub;
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
