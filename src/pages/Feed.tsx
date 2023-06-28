import { Timestamp } from "firebase/firestore";
import { getFirestoreFeed } from "../firebase/functions";
import { useLoaderData } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import PostComponent from "../components/PostComponent";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export async function loader() {
  return getFirestoreFeed("posts");
}

const Feed = () => {
  const docs: {
    createdAt: Timestamp;
    description: string;
    id: string;
    url: string;
    uid: string;
    likes: string[] | [];
    comments: { comment: string; uid: string }[] | [];
  }[] = useLoaderData();

  const { user } = useContext(AppContext);

  const feedElements = docs.map((item) => (
    <PostComponent
      comments={item.comments}
      likes={item.likes}
      description={item.description}
      uid={item.uid}
      currentUserID={user.uid}
      postID={item.id}
      key={item.id}
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={item.url}
          className="block aspect-square w-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </PostComponent>
  ));
  return <Wrapper>{feedElements}</Wrapper>;
};

export default Feed;
