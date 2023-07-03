import { useLoaderData } from "react-router-dom";
import { getChatByID } from "../firebase/functions";
import Wrapper from "../components/Wrapper";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export function loader({ params }) {
  return getChatByID(params.chatID);
}

const ChatDetail = () => {
  const chat = useLoaderData();

  const { user } = useContext(AppContext);

  const messages = chat.messages.map((item) => (
    <div
      className={`${item.senderIDID === user.uid ? "text-right" : "text-left"}`}
    ></div>
  ));

  return <Wrapper className="w-full">{messages}</Wrapper>;
};

export default ChatDetail;
