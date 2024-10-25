import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Like from "../../action-buttons/Like";
import { SignedIn } from "@clerk/nextjs";
import Create_Update_Post_Comment from "@/components/action-buttons/Create_Update_Post_Comment";

const PostCard = ({ post }: { post: any }) => {
  return (
    <Card className="border-border/50 shadow-none hover:border-border bg-background dark:bg-accent/30 break-inside-avoid relative postCard">
      <CardHeader className="p-3 flex flex-row gap-3 flex-wrap items-center justify-between">
        <div className="flex flow-row items-center gap-2">
          <Link href={`/${post.creator.username}`}>
            <Image
              src={post.creator.photo}
              alt="creator dp"
              className="rounded-full"
              width={40}
              height={40}
            />
          </Link>
          <Link href={`/${post.creator.username}`}>
            <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all break-inside-avoid">
              {post.editable ? "You" : `@${post.creator.username}`}
            </p>
          </Link>
        </div>

        {post.communityId && (
          <Link
            className="text-sm text-primary/80 hover:text-primary transition-colors border border-primary rounded-full px-2 py-1 max-w-24 overflow-hidden whitespace-nowrap text-ellipsis"
            href={`/communities/${post.communityId._id}`}
          >
            {post.communityId.name}
          </Link>
        )}
      </CardHeader>
      <CardContent className="px-2 py-0">
        <Link
          href={`${post.creator.username}/post/${post._id}`}
          className="flex flex-col"
        >
          {post.message !== "" && <p className="px-1">{post.message}</p>}
          {post.postImage !== "" && (
            <Image
              src={post.postImage}
              alt="image"
              width={300}
              height={300}
              priority={true}
              className="w-full"
            />
          )}
        </Link>
      </CardContent>
      <SignedIn>
        <CardFooter className="px-3 py-2">
          <div className="flex flow-row gap-3">
            <Like isliked={post.isLiked} postId={post._id} />
            <Create_Update_Post_Comment
              type="create"
              parentPostId={post._id}
            />
          </div>
        </CardFooter>
      </SignedIn>
    </Card>
  );
};

export default PostCard;
