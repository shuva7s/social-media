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
import { getPostById } from "@/lib/actions/post.actions";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import ZoomableImageDialog from "../ZoomImage";
import { SignedIn } from "@clerk/nextjs";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Like from "@/components/action-buttons/Like";
import PostDatailCardLoad from "@/components/loaders/PostDatailCardLoad";

async function PostRenderer({ postIdString }: { postIdString: string }) {
  const { success, postData, isLiked, error } = await getPostById(postIdString);
  if (success) {
    return (
      <Card className="flex flex-col justify-between dark:bg-accent">
        <CardHeader className="px-4 py-3 bg-accent">
          <div className="flex gap-2 items-center flex-wrap">
            <Link href={`/${postData.creator.username}`}>
              <Image
                src={postData.creator.photo}
                alt="creator dp"
                className="rounded-full"
                width={40}
                height={40}
              />
            </Link>
            <Link href={`/${postData.creator.username}`}>
              <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all">
                @{postData.creator.username}
              </p>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-0 my-2">
          {postData.message !== "" && <p className="">{postData.message}</p>}
          {postData.postImage !== "" && (
            <Dialog>
              <DialogTrigger className="max-h-[65vh] w-full overflow-hidden">
                <Image
                  src={postData.postImage}
                  alt="image"
                  width={400}
                  height={400}
                  priority={true}
                  className="w-full max-h-[65vh] object-contain mt-2"
                />
              </DialogTrigger>
              <DialogContent>
                <div className="flex gap-2 items-center flex-wrap">
                  <DialogTitle>
                    <Link href={`/${postData.creator.username}`}>
                      <Image
                        src={postData.creator.photo}
                        alt="creator dp"
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                    </Link>
                  </DialogTitle>
                  <DialogDescription>
                    <Link
                      href={`/${postData.creator.username}`}
                      className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all"
                    >
                      @{postData.creator.username}
                    </Link>
                  </DialogDescription>
                </div>
                <ZoomableImageDialog
                  imageSrc={postData.postImage}
                  altText="Post image"
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
        <SignedIn>
          <CardFooter className="px-3 py-2 sticky bottom-0 z-10">
            <div className="flex flow-row gap-3 p-0">
              <Like isliked={isLiked} postId={postData._id} />
            </div>
          </CardFooter>
        </SignedIn>
      </Card>
    );
  } else {
    return (
      <p className="text-red-500 p-4 bg-destructive/20 rounded-md border border-destructive">
        {error}
      </p>
    );
  }
}

const PostDetailCard = ({ postIdString }: { postIdString: string }) => {
  return (
    <section className="w-full">
      <div className="bg-accent rounded-md">
        <Suspense fallback={<PostDatailCardLoad />}>
          <PostRenderer postIdString={postIdString} />
        </Suspense>
        {/* <PostDatailCardLoad /> */}
      </div>
    </section>
  );
};

export default PostDetailCard;
