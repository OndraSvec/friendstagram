import { useLoaderData } from "react-router-dom";
import { addChatMessage, getChatByID } from "../firebase/functions";
import Wrapper from "../components/Wrapper";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppContext } from "../AppContext";
import Button from "../components/Button";
import { AiOutlineSend } from "react-icons/ai";
import { nanoid } from "nanoid";

export function loader({ params }) {
  return getChatByID(params.chatID);
}

const ChatDetail = () => {
  const chat = useLoaderData();
  const [inputMessage, setInputMessage] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<
    { message: string; senderID: string }[] | []
  >(chat.messages);

  const { user } = useContext(AppContext);

  const messages = chatMessages.map((item) => (
    <div
      className={`${
        item.senderID === user.uid ? "self-end" : "self-start"
      } w-fit border border-solid border-red-200`}
      key={nanoid()}
    >
      {item.message}
    </div>
  ));

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputMessage(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await addChatMessage(chat.id, user.uid, inputMessage);
    setInputMessage("");
    setLoading(false);
    const response = await getChatByID(chat.id);
    setChatMessages(response.messages);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Wrapper className="w-full p-2">
      <div className="flex w-full flex-grow flex-col">{messages}</div>
      <div ref={scrollRef}></div>
      <form className="flex w-full items-center gap-1" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="border-1 w-full rounded-sm border border-gray-300 p-1 text-gray-400 outline-gray-300  sm:p-2 md:border-2 md:p-3"
          type="text"
          onChange={handleInputChange}
          value={inputMessage}
        />
        <Button
          className="text-2xl text-gray-400"
          icon={<AiOutlineSend />}
          disabled={loading}
        />
      </form>
    </Wrapper>
  );
};

export default ChatDetail;
