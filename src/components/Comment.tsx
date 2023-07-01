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
    const unsub = getUser(comment.uid).then((res) => setCommentedBy(res));
    return () => unsub;
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
