import { getChatMessages, getUser } from "../firebase/functions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User } from "firebase/auth";
import { IoArrowRedoSharp } from "react-icons/io5";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Timestamp } from "firebase/firestore";

interface ChatElementProps {
  chat: {
    id: string;
    senderID: string;
    receiverID: string;
  };
  user: User;
}

const ChatElement: React.FC<ChatElementProps> = ({ chat, user }) => {
  const [chatUser, setChatUser] = useState<
    | {
        email: string;
        name: string | null;
        photo: string | null;
        uid: string;
      }
    | null
    | { [x: string]: any }
  >(null);

  const [chatMessages, setChatMessages] = useState<
    | {
        createdAt: Timestamp;
        senderID: string;
        receiverID: string;
        message: string;
      }[]
    | []
    | { [x: string]: any }
  >([]);

  const chatUsers = [chat.receiverID, chat.senderID];

  const userID = chatUsers.filter((item) => item !== user.uid)[0];

  useEffect(() => {
    const handleUser = async () => {
      const response = await getUser(userID);
      setChatUser(response);
    };
    handleUser();
  }, [userID]);

  useEffect(() => {
    const handleChatMessages = async () => {
      const response = await getChatMessages(chat.id);
      setChatMessages(response);
    };
    handleChatMessages();
  }, [chat.id]);
  return (
    <>
      {chatUser && (
        <Link to={`${chat.id}`} className="w-full">
          <div className="flex w-full items-center justify-between gap-1 overflow-hidden whitespace-nowrap p-2 text-xs sm:text-sm md:text-base lg:text-lg">
            {chatUser.photo ? (
              <img
                src={chatUser.photo}
                className="w-9 flex-shrink-0 rounded-full sm:w-12 md:w-[75px] lg:w-[90px]"
              />
            ) : (
              <FaUserCircle className="flex-shrink-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
            )}
            <div className="flex w-full flex-grow flex-col">
              <div className="flex w-5/6 flex-col items-center overflow-hidden sm:w-full">
                {chatUser.name ? (
                  <p className="font-medium">{chatUser.name}</p>
                ) : (
                  <p className="font-medium">{chatUser.email}</p>
                )}
                {chatMessages.length > 0 ? (
                  <>
                    <div className="flex w-full items-center justify-center gap-1 text-gray-500">
                      {chatMessages.at(-1)?.senderID === userID ? (
                        <IoArrowUndoSharp className="flex-shrink-0" />
                      ) : (
                        <IoArrowRedoSharp className="flex-shrink-0" />
                      )}
                      <p className="overflow-hidden text-ellipsis">
                        {chatMessages.at(-1)?.message}
                      </p>
                    </div>
                    <p className="text-gray-500">
                      {chatMessages.at(-1)?.createdAt.toDate().toUTCString()}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500">No messages yet</p>
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ChatElement;
