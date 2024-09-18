"use client";

import { getPosts } from "@/lib/actions/post.actions";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../shared/Cards/PostCard";
import { PostData } from "@/lib/database/models/post.model";

const Loadmore = () => {
  const { ref, inView } = useInView({
    rootMargin: "100px",
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (inView && hasMore) {
      getPosts("normal", page).then((res) => {
        setPosts((prevData) => [...prevData, ...res.posts]);
        setHasMore(res.hasMore);
        setPage((prevPage) => prevPage + 1);
      });
    }
  }, [inView]);

  return (
    <>
      {posts.map((post: PostData) => (
        <PostCard key={post._id} post={post} />
      ))}
      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center py-4 absolute bottom-0 left-0 w-full translate-y-full z-10"
        >
          <Loader className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </>
  );
};

export default Loadmore;
