import { Timestamp } from "firebase/firestore";
import { getFirestoreFeed } from "../firebase/functions";
import { useLoaderData } from "react-router-dom";
import Wrapper from "../components/Wrapper";

export async function loader() {
  return getFirestoreFeed("posts");
}

const Feed = () => {
  const docs: {
    createdAt: Timestamp;
    description: string;
    id: string;
    url: string;
  }[] = useLoaderData();
  const feedElements = docs.map((item) => (
    <div className="aspect-square w-full overflow-hidden" key={item.id}>
      <img
        src={item.url}
        className="block aspect-square w-full object-cover object-center"
      />
    </div>
  ));
  return <Wrapper>{feedElements}</Wrapper>;
};

export default Feed;
