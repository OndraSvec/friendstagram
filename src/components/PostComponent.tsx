import { ReactNode, useEffect, useState } from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiChatNewLine } from "react-icons/ri";
import {
  getLikes,
  getUser,
  isLiked,
  switchLikedPost,
} from "../firebase/functions";

interface PostComponentProps {
  children: ReactNode;
  likes: string[] | [];
  comments: { comment: string; uid: string }[] | [];
  description: string;
  uid: string;
  postID: string;
  currentUserID: string;
}

const PostComponent: React.FC<PostComponentProps> = ({
  comments,
  likes,
  description,
  uid,
  currentUserID,
  postID,
  children,
}) => {
  const [user, setUser] = useState<null | { [x: string]: any }>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(likes.length);

  useEffect(() => {
    const unsub = getUser(uid).then((res) => setUser(res));

    return () => unsub;
  }, [uid]);

  useEffect(() => {
    const unsub = isLiked(postID, currentUserID).then((res) => setLiked(!res));

    return () => unsub;
  }, [currentUserID, postID]);

  useEffect(() => {
    const unsub = getLikes(postID).then((res) => setLikeNum(res));

    return () => unsub;
  }, [liked, postID]);

  const handleLike = async (uid: string, postID: string) => {
    await switchLikedPost(postID, uid);
    if (await isLiked(postID, uid)) setLiked(false);
    else setLiked(true);
  };

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
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center gap-2 text-base">
          <Button
            onClick={() => handleLike(currentUserID, postID)}
            icon={
              liked ? <BsHeartFill className="text-rose-600" /> : <BsHeart />
            }
          />
          <Button icon={<RiChatNewLine />} />
        </div>
        <div>{`${likeNum} like${likeNum === 1 ? "" : "s"}`}</div>
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
