import { useFirestore } from "../firebase/functions";

const Feed = () => {
  const { docs } = useFirestore("posts");
  const feedElements = docs.map((item) => (
    <div className="aspect-square w-40 overflow-hidden" key={item.id}>
      <img
        src={item.url}
        className="block aspect-square w-full object-cover object-center"
      />
    </div>
  ));
  return <>{feedElements}</>;
};

export default Feed;
