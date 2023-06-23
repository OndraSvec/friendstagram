import { useContext } from "react";
import { AppContext } from "../AppContext";
import Button from "../components/Button";

const Feed = () => {
  const { signOut } = useContext(AppContext);
  return (
    <>
      <h1>feed</h1>
      <Button text="Log out" className="bg-red-100" onClick={() => signOut()} />
    </>
  );
};

export default Feed;
