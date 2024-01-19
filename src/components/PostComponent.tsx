import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill, BsSendCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiChatNewLine } from "react-icons/ri";
import {
  addComment,
  getComments,
  getLikes,
  getUser,
  isLiked,
  switchLikedPost,
} from "../firebase/functions";
import Comment from "./Comment";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { ChatUser } from "../firebase/types";

interface PostComponentProps {
  children: ReactNode;
  likes: string[] | [];
  comments: { comment: string; uid: string }[] | [];
  description: string;
  uid: string;
  postID: string;
  currentUserID: string | undefined;
  className?: string;
}

const PostComponent: React.FC<PostComponentProps> = ({
  comments,
  likes,
  description,
  uid,
  currentUserID,
  postID,
  className,
  children,
}) => {
  const [postedBy, setPostedBy] = useState<ChatUser>();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeNum, setLikeNum] = useState<number>(likes.length);
  const [commentToAdd, setCommentToAdd] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [commentsExpanded, setCommentsExpanded] = useState<boolean>(false);
  const [allComments, setAllComments] =
    useState<{ uid: string; comment: string }[]>(comments);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleUser = async () => {
      const response = await getUser(uid);
      setPostedBy(response);
    };

    handleUser();
  }, [uid]);

  useEffect(() => {
    if (currentUserID) {
      const handleLike = async () => {
        const response = await isLiked(postID, currentUserID);
        setLiked(!response);
      };
      handleLike();
    }
  }, [currentUserID, postID]);

  const handleLike = async (uid: string, postID: string) => {
    await switchLikedPost(postID, uid);
    if (await isLiked(postID, uid)) setLiked(false);
    else setLiked(true);
    const likes = await getLikes(postID);
    setLikeNum(likes);
  };

  const handleComment = async () => {
    await setCommentToAdd((prevState) => !prevState);
    if (!commentToAdd) inputRef.current?.focus();
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewComment(e.target.value);

  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentUserID) await addComment(postID, currentUserID, newComment);
    setNewComment("");
    setCommentToAdd(false);
    setLoading(false);
    const commentsRes = await getComments(postID);
    setAllComments(commentsRes);
    setCommentsExpanded(true);
  };

  const switchCommentsExpanded = () =>
    setCommentsExpanded((prevState) => !prevState);

  const commentElements = allComments.map((comment) => (
    <Comment comment={comment} key={nanoid()} />
  ));

  return (
    <div
      className={`mb-2 text-xs sm:text-sm md:text-base lg:text-lg ${className}`}
    >
      <div className="flex items-center gap-1 p-1">
        {postedBy?.photo ? (
          <img
            src={postedBy.photo}
            referrerPolicy="no-referrer"
            className="w-6 rounded-full sm:w-7 md:w-9 lg:w-12"
          />
        ) : (
          <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        )}
        {postedBy?.name ? (
          <Link to={`/feed/search/${uid}`}>{postedBy.name}</Link>
        ) : (
          <Link to={`/feed/search/${uid}`}>{postedBy?.email}</Link>
        )}
      </div>
      {children}
      <div className="flex flex-col gap-1 p-2">
        <div className="flex items-center gap-2 text-base sm:text-2xl md:text-3xl lg:text-4xl">
          <Button
            onClick={() => currentUserID && handleLike(currentUserID, postID)}
            icon={
              liked ? <BsHeartFill className="text-rose-600" /> : <BsHeart />
            }
          />
          <Button
            icon={<RiChatNewLine />}
            onClick={handleComment}
            disabled={loading}
          />
        </div>
        <div>{`${likeNum} like${likeNum === 1 ? "" : "s"}`}</div>
        <p>
          {postedBy?.name ? (
            <span className="font-medium text-blue-700">{postedBy?.name}</span>
          ) : (
            <span className="font-medium text-blue-700">{postedBy?.email}</span>
          )}{" "}
          {description}
        </p>
        {commentToAdd && (
          <form onSubmit={handleAddComment}>
            <label htmlFor="commentInput">
              <i>Add new comment:</i>
            </label>
            <div className="flex items-center gap-1 pr-3">
              <input
                className="border-1 w-full rounded-sm border border-black pl-1  text-black outline-black"
                type="text"
                id="commentInput"
                autoComplete="off"
                ref={inputRef}
                onChange={handleCommentChange}
                value={newComment}
              />
              <Button icon={<BsSendCheck />} />
            </div>
          </form>
        )}
        {comments.length > 0 && (
          <div>
            {comments.length > 1 && (
              <button className="text-black" onClick={switchCommentsExpanded}>
                <i>
                  {commentsExpanded ? "Show me just one" : "See all comments"}
                </i>
              </button>
            )}
            {commentsExpanded ? commentElements : commentElements[0]}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
