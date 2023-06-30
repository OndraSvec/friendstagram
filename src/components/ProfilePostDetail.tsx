import { useLoaderData, useParams } from "react-router-dom";
import { getDocument } from "../firebase/functions";
import PostComponent from "./PostComponent";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Timestamp } from "firebase/firestore";

export function loader({ params }) {
  return getDocument(params.postID);
}

const ProfilePostDetail = () => {
  const post: {
    comments: {
      comment: string;
      uid: string;
    }[];
    createdAt: Timestamp;
    description: string;
    likes: string[];
    uid: string;
    url: string;
  } = useLoaderData();
  const { user } = useContext(AppContext);
  const { postID } = useParams();
  if (postID) {
    return (
      <PostComponent
        comments={post.comments}
        likes={post.likes}
        description={post.description}
        uid={post.uid}
        currentUserID={user.uid}
        postID={postID}
        key={postID}
        className="lg:px-36"
      >
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={post.url}
            className="block aspect-square w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </PostComponent>
    );
  }
};

export default ProfilePostDetail;
