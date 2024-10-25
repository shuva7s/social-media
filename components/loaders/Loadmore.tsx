// "use client";

// import { getPosts } from "@/lib/actions/post.actions";
// import { Loader } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import PostCard from "../shared/Cards/PostCard";

// const Loadmore = () => {
//   const { ref, inView } = useInView({
//     rootMargin: "100px",
//   });
//   const [posts, setPosts] = useState<any[]>([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(2);

//   useEffect(() => {
//     if (inView && hasMore) {
//       getPosts("normal", page).then((res) => {
//         setPosts((prevData) => [...prevData, ...res.posts]);
//         setHasMore(res.hasMore);
//         setPage((prevPage) => prevPage + 1);
//       });
//     }
//   }, [inView, posts, page]);

//   return (
//     <>
//       {posts.length > 0 &&
//         posts.map((post: any) => <PostCard key={post._id} post={post} />)}
//       {hasMore && (
//         <div
//           ref={ref}
//           className="flex justify-center items-center py-4 absolute bottom-0 left-0 w-full translate-y-full z-10"
//         >
//           <Loader className="h-10 w-10 animate-spin text-primary" />
//         </div>
//       )}
//     </>
//   );
// };

// export default Loadmore;


"use client";

import { getPosts } from "@/lib/actions/post.actions";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "../shared/Cards/PostCard";

interface GetPostsResponse {
  success: boolean;
  posts: any[]; // Update with your actual post type
  hasMore: boolean;
  error?: string; // Optional error message
}

const Loadmore = () => {
  const { ref, inView } = useInView({
    rootMargin: "100px",
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res: any = await getPosts("normal", page);

        // Check if the response is valid and successful
        if (res && res.success) {
          setPosts((prevData) => [...prevData, ...res.posts]);
          setHasMore(res.hasMore !== undefined ? res.hasMore : false); // Ensure hasMore is boolean
          setPage((prevPage) => prevPage + 1);
        } else {
          console.error("Failed to fetch posts:", res?.error || "Unknown error");
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      }
    };

    if (inView && hasMore) {
      fetchPosts();
    }
  }, [inView, page, hasMore]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post: any) => <PostCard key={post._id} post={post} />)}
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

