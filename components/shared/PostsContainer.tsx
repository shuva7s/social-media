import { getPosts } from "@/lib/actions/post.actions";
import PostCard from "./Cards/PostCard";

const PostsContainer = async ({ type }: { type: "normal" | "users" }) => {
  const posts = await getPosts(type);
  if (posts && posts.length > 0) {
    return (
      <div className="columns-1 md:columns-2 xl:columns-3 space-y-2 gap-2 mt-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  }else{
    return <p className="text-muted-foreground">No posts to show</p>
  }
};

export default PostsContainer;
