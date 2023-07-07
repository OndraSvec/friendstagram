import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { getUser } from "../firebase/functions";
import { Link } from "react-router-dom";

interface CommentProps {
  comment: {
    uid: string;
    comment: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [commentedBy, setCommentedBy] = useState<null | { [x: string]: any }>(
    null
  );
  useEffect(() => {
    const handleUser = async () => {
      const response = await getUser(comment.uid);
      setCommentedBy(response);
    };
    handleUser();
  }, []);

  return (
    <p key={nanoid()}>
      <Link
        to={`/feed/search/${comment.uid}`}
        className="font-medium text-rose-700"
      >
        {commentedBy?.name ? commentedBy?.name : commentedBy?.email}
      </Link>{" "}
      {comment.comment}
    </p>
  );
};

export default Comment;
