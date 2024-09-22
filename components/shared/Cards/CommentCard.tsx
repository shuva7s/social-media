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
import { PostData } from "@/lib/database/models/post.model";
import CommentButton from "@/components/action-buttons/CommentButton";

const CommentCard = ({ comm }: { comm: PostData }) => {
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
        <Like isliked={comm.isLiked} postId={comm._id} />
      </div>
    </Card>
  );
};

export default CommentCard;
