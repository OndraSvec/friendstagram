import { useContext, useEffect, useState } from "react";
import { getAllUserChats } from "../firebase/functions";
import { AppContext } from "../AppContext";
import { Timestamp } from "firebase/firestore";
import ChatElement from "../components/ChatElement";
import Wrapper from "../components/Wrapper";

const Chat = () => {
  const [chats, setChats] = useState<
    | {
        id: string;
        senderID: string;
        receiverID: string;
        message: {
          createdAt: Timestamp;
          value: string;
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
    <Wrapper className="w-full p-2">
      <div className="flex w-full flex-col gap-1">{chatElements}</div>
    </Wrapper>
  );
};

export default Chat;
