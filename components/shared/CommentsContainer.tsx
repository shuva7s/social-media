import { getComments } from "@/lib/actions/post.actions";
import CommentCard from "./Cards/CommentCard";
import LoadMoreComments from "../loaders/LoadMoreComments";

const CommentsContainer = async ({
  postIdString,
  postCreatorUsername,
}: {
  postIdString: string;
  postCreatorUsername: string;
}) => {
  const { comments, hasMore } = await getComments(postIdString);
  if (comments && comments.length > 0) {
    return (
      <div className="flex flex-col gap-2">
        {comments.map((comm: any) => (
          <CommentCard key={comm._id} comm={comm} postCreatorUsername={postCreatorUsername}/>
        ))}
        {hasMore && <LoadMoreComments postIdString={postIdString} postCreatorUsername={postCreatorUsername}/>}
      </div>
    );
  } else {
    return <p className="text-muted-foreground">No comments to show</p>;
  }
};

export default CommentsContainer;
