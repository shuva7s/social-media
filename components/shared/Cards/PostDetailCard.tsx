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
import Like from "@/components/action-buttons/Like";
import PostDatailCardLoad from "@/components/loaders/PostDatailCardLoad";
import Create_Update_Post_Comment from "@/components/action-buttons/Create_Update_Post_Comment";
import Delete_post_comment_button from "@/components/action-buttons/Delete_post_comment_button";
import { postDataTypeFrontEnd } from "@/lib/database/models/post.model";
const PostDetailCard = ({
  post,
  isLiked,
  editable,
}: {
  post: postDataTypeFrontEnd;
  isLiked: boolean;
  editable: boolean;
}) => {
  console.dir(post);
  console.dir(isLiked);
  console.dir(editable);
  return (
    <section className="w-full">
      <div className="bg-accent rounded-md">
        <Card className="flex flex-col justify-between dark:bg-accent relative">
          <CardHeader className="px-4 py-3 bg-accent">
            <div className="flex gap-2 items-center flex-wrap">
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
                <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all">
                  {editable ? "You" : `@${post.creator.username}`}
                </p>
              </Link>
            </div>

            {editable && (
              <div className="flex flex-row gap-2 absolute right-3 top-0 items-center bg-accent dark:shadow-lg p-1 rounded-md">
                <Create_Update_Post_Comment
                  isPost={true}
                  isCommunityPost={false}
                  type="update"
                  previousId={post._id}
                  previousPhoto={post.postImage}
                  previousMessage={post.message}
                  username={post.creator.username}
                />

                <Delete_post_comment_button
                  postId={post._id}
                  isPost={true}
                />
              </div>
            )}
          </CardHeader>
          <CardContent className="px-4 py-0 my-2">
            {post.message !== "" && (
              <p className="">{post.message}</p>
            )}
            {post.postImage !== "" && (
              <Dialog>
                <DialogTrigger className="max-h-[65vh] w-full overflow-hidden">
                  <Image
                    src={post.postImage}
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
                      <Link href={`/${post.creator.username}`}>
                        <Image
                          src={post.creator.photo}
                          alt="creator dp"
                          className="rounded-full"
                          width={40}
                          height={40}
                        />
                      </Link>
                    </DialogTitle>
                    <DialogDescription>
                      <Link
                        href={`/${post.creator.username}`}
                        className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all"
                      >
                        @{post.creator.username}
                      </Link>
                    </DialogDescription>
                  </div>
                  <ZoomableImageDialog
                    imageSrc={post.postImage}
                    altText="Post image"
                  />
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
          <SignedIn>
            <CardFooter className="px-3 py-2 sticky bottom-0 z-10">
              <div className="flex flow-row gap-3 p-0">
                <Like isliked={isLiked} postId={post._id} />

                <Create_Update_Post_Comment
                  isPost={false}
                  isCommunityPost={false}
                  type="create"
                  parentPostId={post._id}
                />
              </div>
            </CardFooter>
          </SignedIn>
        </Card>
      </div>
    </section>
  );
};

export default PostDetailCard;
