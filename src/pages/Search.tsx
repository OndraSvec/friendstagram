import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Wrapper from "../components/Wrapper";
import PostComponent from "../components/PostComponent";
import { Timestamp } from "firebase/firestore";
import { AppContext } from "../AppContext";
import { getSearchFeed } from "../firebase/functions";

const Search = () => {
  const [searchField, setSearchField] = useState<string>("");
  const [posts, setPosts] = useState<
    | {
        createdAt: Timestamp;
        description: string;
        id: string;
        url: string;
        uid: string;
        likes: string[] | [];
        comments: { comment: string; uid: string }[] | [];
        tags: string[];
      }[]
    | []
    | { [x: string]: any }[]
  >([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { user } = useContext(AppContext);

  const searchFieldElements = posts.map((item) => (
    <PostComponent
      comments={item.comments}
      likes={item.likes}
      description={item.description}
      uid={item.uid}
      currentUserID={user?.uid}
      postID={item.id}
      key={item.id}
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={item.url}
          className="block aspect-square w-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </PostComponent>
  ));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchField(e.target.value.toLowerCase().replace(/[^\w]/g, ""));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const getPosts = setTimeout(() => {
      getSearchFeed(searchField).then((res) => setPosts(res));
    }, 500);

    return () => clearTimeout(getPosts);
  }, [searchField]);

  return (
    <Wrapper className="w-full lg:px-36">
      <form
        className="w-full px-3 pb-2 pt-1 text-sm sm:px-4 sm:text-base md:px-5 md:text-lg lg:px-0 lg:text-xl"
        onSubmit={handleFormSubmit}
      >
        <input
          className="border-1 w-full rounded-sm border border-gray-300 p-1  text-gray-400 outline-gray-300 sm:p-2 md:border-2 md:p-3"
          id="searchInput"
          type="text"
          autoComplete="off"
          placeholder="Search posts by tag.."
          value={searchField}
          onChange={handleInputChange}
          ref={inputRef}
        />
      </form>
      {searchField && searchFieldElements}
    </Wrapper>
  );
};

export default Search;
