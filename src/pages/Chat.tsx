import { useContext, useEffect, useState } from "react";
import { getAllUserChats } from "../firebase/functions";
import { AppContext } from "../AppContext";
import ChatElement from "../components/ChatElement";
import Wrapper from "../components/Wrapper";

const Chat = () => {
  const [chats, setChats] = useState<
    | {
        id: string;
        senderID: string;
        receiverID: string;
      }[]
    | []
    | { id: string }[]
  >([]);

  const { user } = useContext(AppContext);
  useEffect(() => {
    const handleUsers = async () => {
      if (user) {
        const response = await getAllUserChats(user.uid);
        setChats(response);
      }
    };

    handleUsers();
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
