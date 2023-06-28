import { ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiChatNewLine } from "react-icons/ri";
import { getUser } from "../firebase/functions";

interface PostComponentProps {
  children: ReactNode;
  likes: string[] | [];
  comments: { comment: string; uid: string }[] | [];
  description: string;
  uid: string;
}

const PostComponent: React.FC<PostComponentProps> = ({
  comments,
  likes,
  description,
  uid,
  children,
}) => {
  const [user, setUser] = useState<null | { [x: string]: any }>(null);

  useEffect(() => {
    const unsub = getUser(uid).then((res) => setUser(res));

    return () => unsub;
  }, []);

  return (
    <div className="mb-2 text-xs">
      <div className="flex items-center gap-1 p-1">
        {user?.photo ? (
          <img src={user.photo} className="w-1/12 rounded-full" />
        ) : (
          <FaUserCircle className="text-2xl" />
        )}
        {user?.name ? <p>{user.name}</p> : <p>{user?.email}</p>}
      </div>
      {children}
      <div className="p-2">
        <div className="flex items-center gap-2">
          <Button icon={<BsHeart />} />
          <Button icon={<RiChatNewLine />} />
        </div>
        <div>{`${likes.length} like${likes.length === 1 ? "" : "s"}`}</div>
        <p>
          {user?.name ? (
            <span className="font-medium text-blue-700">{user?.name}</span>
          ) : (
            <span className="font-medium text-blue-700">{user?.email}</span>
          )}{" "}
          {description}
        </p>
      </div>
    </div>
  );
};

export default PostComponent;
