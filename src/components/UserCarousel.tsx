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
    | { [x: string]: any }[]
    | []
  >([]);
  const [width, setWidth] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleUsers = async () => {
      const response = await getUsers();
      setUsers(
        response.sort((a, b) =>
          a.email <= b.email ? -1 : a.email == b.email ? 0 : 1
        )
      );
    };
    handleUsers();
  }, []);

  useEffect(() => {
    const unsub = setWidth(
      carouselRef.current
        ? carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
        : null
    );
    return () => unsub;
  });

  return (
    <motion.div
      ref={carouselRef}
      whileTap={{ cursor: "grabbing" }}
      className="h-fit w-full cursor-grab overflow-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: width ? -width : 0 }}
        className="flex items-center gap-2 px-1 py-4 sm:gap-3 md:gap-4 lg:gap-6"
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
