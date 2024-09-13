import { getLatestPosts } from "@/lib/actions/post.actions";
import PostCard from "./PostCard";

const PostsContainer = async ({
  userObjectId,
}: {
  userObjectId: string | null;
}) => {
  const posts = await getLatestPosts();
  if (posts && posts.length) {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 space-y-3 gap-3 my-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    );
  }
};

export default PostsContainer;
