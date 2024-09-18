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

async function PostRenderer({ postIdString }: { postIdString: string }) {
  const { success, postData, isLiked, error } = await getPostById(postIdString);
  if (success) {
    return (
      <Card className="h-full flex flex-col justify-between">
        <CardHeader className="px-4 py-3 bg-accent/50">
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
        <CardContent className="px-4 py-0">
          {postData.message !== "" && (
            <p className="md:max-w-[48vw] lg:max-w-[40vw]  my-2 truncate ...">
              {postData.message} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Vero doloribus a nesciunt nihil atque voluptate,
              exercitationem nam eaque obcaecati corporis reprehenderit minima,
              doloremque unde excepturi quia animi possimus! Dolorem, inventore!
            </p>
          )}
          {postData.postImage !== "" && (
            <Dialog>
              <DialogTrigger className="max-h-[65vh] w-full overflow-hidden">
                <Image
                  src={postData.postImage}
                  alt="image"
                  width={400}
                  height={400}
                  priority={true}
                  className="w-full max-h-[65vh] object-contain"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>hi</DialogTitle>
                <DialogDescription className="truncate ...">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur facere quasi harum maiores natus dolores
                  accusantium eum reprehenderit repellendus quod, dolore ratione
                  at velit voluptate in cum vitae possimus rem.
                </DialogDescription>
                <ZoomableImageDialog
                  imageSrc={postData.postImage}
                  altText="Post image"
                />
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
        <SignedIn>
          <CardFooter className="px-4 py-2 bg-accent/50">
            <div className="flex flow-row gap-3 p-0">
              <Like isliked={isLiked} postId={postData._id} />
            </div>
          </CardFooter>
        </SignedIn>
      </Card>
    );
  } else {
    return <p className="text-red-500 p-4 bg-destructive/20 rounded-md border border-destructive">{error}</p>;
  }
}

const PostDetailCard = ({ postIdString }: { postIdString: string }) => {
  return (
    <section className="w-full">
      <div className="bg-accent sticky top-[4.5rem] rounded-md">
        <Suspense fallback={<p>loading...</p>}>
          <PostRenderer postIdString={postIdString} />
        </Suspense>
      </div>
    </section>
  );
};

export default PostDetailCard;

// return (
//   <Card className="break-inside-avoid">
//     <CardHeader className="px-4 py-3">
//       <div className="flex gap-2 items-center flex-wrap">
//         <Link href={`/${post.creator.username}`}>
//           <Image
//             src={post.creator.photo}
//             alt="creator dp"
//             className="rounded-full"
//             width={40}
//             height={40}
//           />
//         </Link>
//         <Link href={`/${post.creator.username}`}>
//           <p className="font-semibold text-muted-foreground hover:text-primary hover:underline transition-all">
//             @{post.creator.username}
//           </p>
//         </Link>
//       </div>
//     </CardHeader>
//     <CardContent className="px-4 py-0">
//       {post.message !== "" && (
//         <p className="my-2 truncate ...">{post.message}</p>
//       )}
//       {post.postImage !== "" && (
//         <Dialog>
//           <DialogTrigger className="w-full">
//             <Image
//               src={post.postImage}
//               alt="image"
//               width={300}
//               height={300}
//               priority={true}
//               className="w-full"
//             />
//           </DialogTrigger>
//           <DialogContent>
//             <DialogTitle>hi</DialogTitle>
//             <DialogDescription className="truncate ...">
//               Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//               Aspernatur facere quasi harum maiores natus dolores accusantium
//               eum reprehenderit repellendus quod, dolore ratione at velit
//               voluptate in cum vitae possimus rem.
//             </DialogDescription>
//             <ZoomableImageDialog
//               imageSrc={post.postImage}
//               altText="Post image"
//             />
//           </DialogContent>
//         </Dialog>
//       )}
//     </CardContent>
//     <SignedIn>
//       <CardFooter className="px-4 py-0">
//         <div className="flex flow-row gap-3 p-0 pb-2">
//         <Like isliked={post.isLiked} postId={post._id} />
//           <Button variant="ghost" className="gap-2 px-2 opacity-55">
//             <MessageSquareText /> comment
//           </Button>
//         </div>
//       </CardFooter>
//     </SignedIn>
//   </Card>
// );
