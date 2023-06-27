import { ReactNode } from "react";
import Button from "./Button";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";

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
  return (
    <div>
      <div></div>
      {children}
      <div className="p-2">
        <div className="flex items-center gap-2">
          <Button icon={<BsHeart />} />
          <Button icon={<RiChatNewLine />} />
        </div>
        <div>{`${likes.length} like${likes.length === 1 ? "" : "s"}`}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default PostComponent;
