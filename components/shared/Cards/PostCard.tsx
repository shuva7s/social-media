import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Like from "../../action-buttons/Like";
import { MessageSquareText } from "lucide-react";
import { Button } from "../../ui/button";
import { SignedIn } from "@clerk/nextjs";
import { PostData } from "@/lib/database/models/post.model";

const PostCard = ({ post }: { post: PostData }) => {
  return (
    <Card className="p-3 bg-accent/40 break-inside-avoid">
      <CardHeader className="p-0 flex flex-row gap-3 flex-wrap">
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
            @{post.creator.username}
          </p>
        </Link>
      </CardHeader>
      <CardContent className="p-0 mt-2">
        <Link
          href={`${post.creator.username}/post/${post._id}`}
          className="flex flex-col"
        >
          {post.message !== "" && (
            <p>{post.message}</p>
          )}
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
        <CardFooter className="p-0">
          <div className="flex flow-row gap-3">
            <Like isliked={post.isLiked} postId={post._id} />
            <Button variant="ghost" className="gap-2 px-2 opacity-55">
              <MessageSquareText /> comment
            </Button>
          </div>
        </CardFooter>
      </SignedIn>
    </Card>
  );
};

export default PostCard;
