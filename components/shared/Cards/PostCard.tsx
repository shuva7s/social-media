import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/ImageDialog";
import Image from "next/image";
import ZoomableImageDialog from "../ZoomImage";
import Link from "next/link";
import { Suspense } from "react";
import { Types } from "mongoose";
import { getUserDataFromObjectId } from "@/lib/actions/user.actions";
import PostCreatorLoad from "../../loaders/PostCreatorLoad";
import { getPostLikeStatus } from "@/lib/actions/post.actions";
import Like from "../../action-buttons/Like";
import { Skeleton } from "../../ui/skeleton";
import { MessageSquareText } from "lucide-react";
import { Button } from "../../ui/button";
import { SignedIn } from "@clerk/nextjs";

export async function UserInfoById({
  creatorObjId,
}: {
  creatorObjId: Types.ObjectId;
}) {
  const { userImage, userName } = await getUserDataFromObjectId(creatorObjId);
  return (
    <CardHeader className="px-4 py-3">
      <div className="flex gap-2 items-center flex-wrap">
        <Link href={`/${userName}`}>
          <Image
            src={userImage}
            alt="creator dp"
            className="rounded-full"
            width={40}
            height={40}
          />
        </Link>
        <Link href={`/${userName}`}>
          <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all">
            @{userName}
          </p>
        </Link>
      </div>
    </CardHeader>
  );
}

export async function PostAdditionalInfo({
  postObjId,
}: {
  postObjId: Types.ObjectId;
}) {
  let isLiked = await getPostLikeStatus(postObjId);
  return <Like isliked={isLiked} postId={postObjId.toString()} />;
}

const PostCard = ({ post }: any) => {
  return (
    <Card className="break-inside-avoid">
      <Suspense fallback={<PostCreatorLoad />}>
        <UserInfoById creatorObjId={post.creator} />
      </Suspense>
      <CardContent className="px-4 py-0">
        {post.messase !== "" && (
          <p className="my-2 truncate ...">{post.message}</p>
        )}
        {post.postImage !== "" && (
          <Dialog>
            <DialogTrigger className="w-full">
              <Image
                src={post.postImage}
                alt="image"
                width={300}
                height={300}
                priority={true}
                className="w-full"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>hi</DialogTitle>
              <DialogDescription className="truncate ...">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur facere quasi harum maiores natus dolores accusantium
                eum reprehenderit repellendus quod, dolore ratione at velit
                voluptate in cum vitae possimus rem.
              </DialogDescription>
              <ZoomableImageDialog
                imageSrc={post.postImage}
                altText="Post image"
              />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
      <SignedIn>
        <CardFooter className="px-4 py-0">
          <div className="flex flow-row gap-3 p-0 pb-2">
            <Suspense
              fallback={<Skeleton className="h-10 w-10 rounded-full" />}
            >
              <PostAdditionalInfo postObjId={post._id} />
            </Suspense>

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
