import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import { getProfileFeed } from "../firebase/functions";
import ImageGrid from "../components/ImageGrid";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";
import { Post } from "../firebase/types";

const Profile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      const handleProfile = async () => {
        const response = await getProfileFeed(user.uid);
        setPosts(response);
      };
      handleProfile();
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
    <Wrapper className="w-full">
      <ImageGrid>{feedElements}</ImageGrid>
    </Wrapper>
  );
};

export default Profile;
