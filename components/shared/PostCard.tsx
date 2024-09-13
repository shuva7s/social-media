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
} from "@/components/ui/dialog";
import Image from "next/image";
import ZoomableImageDialog from "./ZoomImage";
import Link from "next/link";
import { Suspense } from "react";
import { Types } from "mongoose";
import { getUserDataFromObjectId } from "@/lib/actions/user.actions";
import PostCreatorLoad from "../loaders/PostCreatorLoad";

async function UserInfoById({
  creatorObjId,
}: {
  creatorObjId: Types.ObjectId;
}) {
  const { userImage, userName } = await getUserDataFromObjectId(creatorObjId);
  return (
    <CardHeader className="px-4">
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

const PostCard = ({ post }: any) => {
  return (
    <Card className="break-inside-avoid">
      <Suspense fallback={<PostCreatorLoad />}>
        <UserInfoById creatorObjId={post.creator} />
      </Suspense>
      <CardContent className="px-4">
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
      <CardFooter className="px-4">
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
