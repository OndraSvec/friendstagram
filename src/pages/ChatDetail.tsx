export function loader({ params }) {
  return getChat(params.chatID);
}

const ChatDetail = () => {
  return <h1>hello</h1>;
};

export default ChatDetail;
