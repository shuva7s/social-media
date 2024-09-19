import { getPosts } from "@/lib/actions/post.actions";
import PostCard from "./Cards/PostCard";
import Loadmore from "../loaders/Loadmore";
import { PostData } from "@/lib/database/models/post.model";

const PostsContainer = async ({ type }: { type: "normal" | "users" }) => {
  const { posts, hasMore } = await getPosts(type);
  if (posts && posts.length > 0) {
    return (
      <div className="columns-1 md:columns-2 xl:columns-3 space-y-2 gap-2">
        {posts.map((post: PostData) => (
          <PostCard key={post._id} post={post} />
        ))}
        {hasMore && <Loadmore />}
      </div>
    );
  } else {
    return <p className="text-muted-foreground">No posts to show</p>;
  }
};

export default PostsContainer;