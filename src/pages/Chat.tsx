import { useContext, useEffect, useState } from "react";
import { getAllUserChats } from "../firebase/functions";
import { AppContext } from "../AppContext";
import ChatElement from "../components/ChatElement";
import Wrapper from "../components/Wrapper";
import { Timestamp } from "firebase/firestore";

const Chat = () => {
  const [chats, setChats] = useState<
    | {
        id: string;
        senderID: string;
        receiverID: string;
        updatedAt: Timestamp;
        messages: {
          senderID: string;
          message: string;
        };
      }[]
    | []
  >([]);
  const { user } = useContext(AppContext);
  useEffect(() => {
    const unsub = getAllUserChats(user.uid).then((res) => setChats(res));

    return () => unsub;
  }, []);

  const chatElements = chats.map((chat) => (
    <ChatElement chat={chat} key={chat.id} user={user} />
  ));

  return (
    <Wrapper className="w-full p-2 lg:px-96">
      <div className="flex w-full flex-col gap-1 sm:gap-2 md:gap-4 lg:gap-8">
        {chatElements}
      </div>
    </Wrapper>
  );
};

export default Chat;
