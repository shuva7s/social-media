"use client";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Delete_post_comment_button = ({
  postId,
  isPost,
}: {
  postId: string;
  isPost: boolean;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const res = await deletePost({ postId, isPost });
      if (res.success) {
        toast({
          title: `${isPost ? "Post" : "Comment"} deleted`,
          description: res.message,
        });

        if (isPost) {
          router.replace("/");
        }
      } else {
        toast({
          title: "Error",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {}
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2.5">
          <Trash className="opacity-60" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {isPost ? "post" : "comment"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete_post_comment_button;
