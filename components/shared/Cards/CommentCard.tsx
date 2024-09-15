import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/ImageDialog";
import Image from "next/image";
import { Suspense } from "react";
import ZoomableImageDialog from "../ZoomImage";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MessageSquareText } from "lucide-react";
import PostCreatorLoad from "@/components/loaders/PostCreatorLoad";
import { PostAdditionalInfo, UserInfoById } from "./PostCard";

const CommentCard = ({ post }: any) => {
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

      <CardFooter className="px-4 py-0">
        <div className="flex flow-row gap-3 p-0 pb-2">
          <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
            <PostAdditionalInfo postObjId={post._id} />
          </Suspense>

          <Button variant="ghost" className="gap-2 px-2 opacity-55">
            <MessageSquareText /> comment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
