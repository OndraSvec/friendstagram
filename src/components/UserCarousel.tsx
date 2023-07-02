import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import UserCarouselItem from "./UserCarouselItem";
import { getUsers } from "../firebase/functions";

const UserCarousel: React.FC = () => {
  const [users, setUsers] = useState<
    | {
        email: string;
        name: string | null;
        photo: string | null;
        uid: string;
      }[]
    | []
  >([]);
  const [width, setWidth] = useState<number>();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsub = getUsers().then((res) => setUsers(res));

    return () => unsub;
  }, []);

  useEffect(() => {
    setWidth(
      carouselRef.current?.scrollWidth - carouselRef.current?.offsetWidth
    );
  }, []);

  return (
    <motion.div
      ref={carouselRef}
      whileTap={{ cursor: "grabbing" }}
      className="h-fit w-full cursor-grab overflow-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="flex items-center gap-2 px-1 py-4"
      >
        {users.map((user) => (
          <motion.div key={user.uid}>
            <UserCarouselItem user={user} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UserCarousel;
