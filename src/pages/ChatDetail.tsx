import { useLoaderData, LoaderFunction } from "react-router-dom";
import {
  addChatMessage,
  getChatByID,
  getChatMessages,
} from "../firebase/functions";
import Wrapper from "../components/Wrapper";
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../components/Button";
import { AiOutlineSend } from "react-icons/ai";
import { nanoid } from "nanoid";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { AppContext } from "../AppContext";
import { db } from "../firebase/setup";
import { ChatMessage } from "../firebase/types";

export const loader = (async ({ params }) => {
  if (params.chatID) return getChatByID(params.chatID);
}) satisfies LoaderFunction;

const ChatDetail = () => {
  const chat = useLoaderData() as {
    id: string;
    receiverID: string;
    senderID: string;
    updatedAt: { nanoseconds: number; seconds: number };
  };
  const { user } = useContext(AppContext);
  const [inputMessage, setInputMessage] = useState<string>("");
  const inputRef = useRef<null | HTMLInputElement>(null);
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handleChatMessages = async () => {
      if (chat) {
        const response = await getChatMessages(chat.id);
        setChatMessages(response);
      }
    };
    handleChatMessages();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chat.id, "messages"),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents: DocumentData = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
      setChatMessages(documents as ChatMessage[]);
    });

    return (): void => unsubscribe();
  }, []);

  const messages = chatMessages.map((item) => (
    <div
      className={`${
        item.senderID === user?.uid
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
    if (user)
      await addChatMessage(chat.id, user.uid, chat.receiverID, inputMessage);
    setInputMessage("");
    setLoading(false);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Wrapper className="w-full p-2 text-sm sm:text-base md:text-lg lg:px-80 lg:text-xl">
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
