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
        item.senderID === user.uid
          ? "self-end rounded-ee-none bg-gradient-to-b from-sky-500 to-sky-300"
          : "self-start rounded-es-none bg-gradient-to-b from-black to-gray-600"
      } w-fit max-w-[60%] rounded-md p-3 text-sm font-medium text-white shadow-md sm:text-base md:text-lg lg:text-xl`}
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
    <Wrapper className="w-full p-2 text-sm sm:text-base md:text-lg lg:text-xl">
      <div className="flex w-full flex-grow flex-col gap-4">{messages}</div>
      <form
        className="mt-8 flex w-full items-center gap-1"
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className="border-1 w-full rounded-sm border border-gray-300 p-1 text-gray-400 outline-gray-300  sm:p-2 md:border-2 md:p-3"
          type="text"
          onChange={handleInputChange}
          value={inputMessage}
        />
        <Button
          className="text-2xl text-gray-400 sm:text-3xl md:text-4xl lg:text-5xl"
          icon={<AiOutlineSend />}
          disabled={loading}
        />
      </form>
      <div ref={scrollRef}></div>
    </Wrapper>
  );
};

export default ChatDetail;
