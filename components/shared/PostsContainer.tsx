import { getPosts } from "@/lib/actions/post.actions";
import PostCard from "./Cards/PostCard";
import Loadmore from "../loaders/Loadmore";

const PostsContainer = async ({ type }: { type: "normal" | "users" }) => {
  const { success, error, posts, hasMore } = await getPosts(type);
  if (success && posts) {
    if (posts.length > 0) {
      return (
        <div className="columns-1 md:columns-2 xl:columns-3 space-y-2 gap-2 relative">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
          {hasMore && <Loadmore />}
        </div>
      );
    } else {
      return <p>No posts to show</p>;
    }
  }
  return <p className="text-red-500">{error}</p>;
};

export default PostsContainer;
