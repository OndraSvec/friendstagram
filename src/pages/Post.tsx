import Wrapper from "../components/Wrapper";
import Button from "../components/Button";

const Post = () => {
  return (
    <Wrapper className="w-full py-3">
      <form className="flex  w-4/5 flex-grow flex-col items-center gap-2 lg:w-3/5">
        <input
          type="file"
          name="file"
          className="border-1 w-full rounded-s border border-gray-300 p-0 text-gray-400 outline-gray-300 file:rounded file:border-none file:bg-sky-400 file:p-1 file:font-medium file:text-white file:outline-none"
        />
        <textarea
          name="textarea"
          className="border-1 w-full flex-grow  resize-none rounded-sm border border-gray-300 p-1 text-gray-400 outline-gray-300"
        />
        <Button
          text="Add post"
          className="w-full rounded-md bg-sky-400 p-1 text-sm font-medium text-white disabled:bg-gray-300 sm:p-2 sm:text-base md:p-3 md:text-lg lg:text-xl"
        />
      </form>
    </Wrapper>
  );
};

export default Post;
