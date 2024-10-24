import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Like from "../../action-buttons/Like";
import { PostData } from "@/lib/database/models/post.model";
import Create_Update_Post_Comment from "@/components/action-buttons/Create_Update_Post_Comment";
import DeletePostButton from "@/components/action-buttons/Delete_post_comment_button";
import Delete_post_comment_button from "@/components/action-buttons/Delete_post_comment_button";

const CommentCard = ({
  comm,
  postCreatorUsername,
}: {
  comm: PostData;
  postCreatorUsername: string;
}) => {
  return (
    <Card className="bg-accent/40 break-inside-avoid relative">
      <CardHeader className="p-3 flex flex-row gap-3 flex-wrap">
        <Link href={`/${comm.creator.username}`}>
          <Image
            src={comm.creator.photo}
            alt="creator dp"
            className="rounded-full"
            width={40}
            height={40}
          />
        </Link>
        <Link href={`/${comm.creator.username}`}>
          <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all break-inside-avoid">
            @{comm.creator.username}
          </p>
        </Link>
      </CardHeader>
      <CardContent className="px-3 py-0 pb-3">
        {comm.message !== "" && <p>{comm.message}</p>}
        {comm.postImage !== "" && (
          <Image
            src={comm.postImage}
            alt="image"
            width={300}
            height={300}
            priority={true}
            className="w-full"
          />
        )}
      </CardContent>

      <div className="absolute z-10 right-3 top-3">
        {comm.editable && (
          <>
            {/* update comment */}
            <Create_Update_Post_Comment
              isPost={false}
              isCommunityPost={false}
              type="update"
              previousId={comm._id}
              previousPhoto={comm.postImage}
              previousMessage={comm.message}
              parentPostId={comm.parentPost as string}
              username={postCreatorUsername}
            />
            <Delete_post_comment_button postId={comm._id} isPost={false} />
          </>
        )}

        <Like isliked={comm.isLiked} postId={comm._id} />
      </div>
    </Card>
  );
};

export default CommentCard;
