import { getProfileFeed } from "../firebase/functions";
import ImageGrid from "../components/ImageGrid";
import { Timestamp } from "firebase/firestore";
import Wrapper from "../components/Wrapper";
import { Link, useLoaderData } from "react-router-dom";

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
      <ImageGrid>{feedElements}</ImageGrid>
    </Wrapper>
  );
};

export default UserDetail;
