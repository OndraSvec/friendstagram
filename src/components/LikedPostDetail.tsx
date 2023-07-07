import { useLoaderData, useParams, LoaderFunction } from "react-router-dom";
import { getDocument } from "../firebase/functions";
import PostComponent from "./PostComponent";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const loader = (async ({ params }) => {
  if (params.postID) return getDocument(params.postID);
}) satisfies LoaderFunction;

const LikedPostDetail = () => {
  const post = useLoaderData() as {
    comments: { uid: string; comment: string }[] | [];
    likes: [] | string[];
    description: string;
    uid: string;
    url: string;
    createdAt: { nanoseconds: number; seconds: number };
    tags: string[] | [];
  };
  const { user } = useContext(AppContext);
  const { postID } = useParams();
  if (postID) {
    return (
      <PostComponent
        comments={post.comments}
        likes={post.likes}
        description={post.description}
        uid={post.uid}
        currentUserID={user?.uid}
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

export default LikedPostDetail;
