import { Timestamp } from "firebase/firestore";
import { getUser } from "../firebase/functions";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { User } from "firebase/auth";

interface ChatElementProps {
  chat: {
    id: string;
    senderID: string;
    receiverID: string;
    messages: {
      senderID: string;
      message: {
        createdAt: Timestamp;
        value: string;
      };
    }[];
  };
  user: User;
}

const ChatElement: React.FC<ChatElementProps> = ({ chat, user }) => {
  const [chatUser, setChatUser] = useState<{
    email: string;
    name: string | null;
    photo: string | null;
    uid: string;
  } | null>(null);

  const chatUsers = [chat.receiverID, chat.senderID];

  const userID = chatUsers.filter((item) => item !== user.uid)[0];

  useEffect(() => {
    const unsub = getUser(userID).then((res) => setChatUser(res));
  }, []);

  return (
    <>
      {chatUser && (
        <Link to={`${chat.id}`} className="w-full">
          <div className="flex w-full justify-between gap-1 whitespace-nowrap p-2 text-xs sm:text-sm md:text-base lg:text-lg">
            {chatUser.photo ? (
              <img
                src={chatUser.photo}
                className="w-9 rounded-full sm:w-12 md:w-[75px] lg:w-[90px]"
              />
            ) : (
              <FaUserCircle className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
            )}
            <div className="flex flex-grow flex-col items-center">
              {chatUser.name ? (
                <p className="font-medium">{chatUser.name}</p>
              ) : (
                <p className="font-medium">{chatUser.email}</p>
              )}
              {chat.messages.length > 0 ? (
                <p>
                  {chat.messages.at(-1)?.message.value}{" "}
                  {chat.messages.at(-1)?.message.createdAt.toDate().toString()}
                </p>
              ) : (
                <p className="text-gray-500">No messages yet</p>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ChatElement;
