import { useLoaderData } from "react-router-dom";
import { getChatByID } from "../firebase/functions";

export function loader({ params }) {
  return getChatByID(params.chatID);
}

const ChatDetail = () => {
  const chat = useLoaderData();
  console.log(chat);
  return <h1>hello</h1>;
};

export default ChatDetail;
