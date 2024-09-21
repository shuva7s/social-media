import { getComments } from "@/lib/actions/post.actions";
import { PostData } from "@/lib/database/models/post.model";
import CommentCard from "./Cards/CommentCard";
import LoadMoreComments from "../loaders/LoadMoreComments";

const CommentsContainer = async ({
  postIdString,
}: {
  postIdString: string;
}) => {
  const { comments, hasMore } = await getComments(postIdString);
  if (comments && comments.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        {comments.map((comm: PostData) => (
          <CommentCard key={comm._id} comm={comm} />
        ))}
        {hasMore && <LoadMoreComments postIdString={postIdString} />}
      </div>
    );
  } else {
    return <p className="text-muted-foreground">No comments to show</p>;
  }
};

export default CommentsContainer;
