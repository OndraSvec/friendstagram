import { getFirestoreFeed } from "../firebase/functions";
import { useLoaderData, defer, Await, LoaderFunction } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import PostComponent from "../components/PostComponent";
import { Suspense, useContext } from "react";
import { AppContext } from "../AppContext";
import UserCarousel from "../components/UserCarousel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const loader = (async () => {
  return defer({ posts: getFirestoreFeed("posts") });
}) satisfies LoaderFunction;

const Feed = () => {
  const { posts } = useLoaderData() as Awaited<
    Promise<{
      posts: {
        comments: { uid: string; comment: string }[] | [];
        likes: [] | string[];
        description: string;
        uid: string;
        url: string;
        createdAt: { nanoseconds: number; seconds: number };
        tags: string[] | [];
        id: string;
      }[];
    }>
  >;

  const { user } = useContext(AppContext);

  return (
    <Wrapper className="w-full gap-2 sm:gap-3 md:gap-4 lg:gap-5 lg:px-36">
      <UserCarousel />
      <Suspense
        fallback={
          <div className="flex flex-grow flex-col items-center justify-center gap-2 text-sm font-medium sm:text-base md:gap-4 md:text-lg lg:gap-6 lg:text-xl">
            <AiOutlineLoading3Quarters className="aspect-square animate-spin text-4xl md:text-5xl lg:text-9xl" />
            <h2>Loading your feed..</h2>
          </div>
        }
      >
        <Await resolve={posts}>
          {(posts) =>
            posts.map(
              (item: {
                comments: { uid: string; comment: string }[] | [];
                likes: [] | string[];
                description: string;
                uid: string;
                url: string;
                createdAt: { nanoseconds: number; seconds: number };
                tags: string[] | [];
                id: string;
              }) => (
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
              )
            )
          }
        </Await>
      </Suspense>
    </Wrapper>
  );
};

export default Feed;
