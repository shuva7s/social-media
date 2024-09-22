"use client";
import { useState } from "react";
import { Loader, MessageSquareText, Send, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { FileUploaderComment } from "../shared/FileUploaderComment";
import { handleError } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { createPost } from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  commentImage: z.string(),
  comment: z.string(),
});

const CommentButton = ({
  parentPostId,
  type,
}: {
  parentPostId: string;
  type: "create" | "update";
}) => {
  const [files, setFiles] = useState<File[]>([]); // Manage file state
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commentImage: "", // The initial image URL (if updating)
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length > 0) {
      setIsUploading(true); // Start the image upload process
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsUploading(false);
        return;
      }

      values.commentImage = uploadedImages[0].url;
      setIsUploading(false); // Upload completed
    }

    try {
      const res = await createPost({
        message: values.comment,
        postImage: values.commentImage,
        parentPost: parentPostId,
      });

      if (res.message === "success") {
        // Reset the form and the file input
        form.reset(); // Reset the form after submission
        setFiles([]); // Clear the files array
        form.setValue("commentImage", ""); // Reset the commentImage field

        router.refresh(); // Refresh the page

        toast({
          title: "Comment added",
          description: "Your comment has been added successfully",
        });

        // return <DialogClose />;
      } else if (res.message === "swr") {
        toast({
          title: "Something went wrong",
          description: "Please try again",
        });
      } else if (res.message === "user-not-found") {
        toast({
          title: "User not found",
          description: "Please try again",
        });
      } else if (res.message === "ids-not-found") {
        toast({
          title: "Ids not found",
          description: "Please try again",
        });
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 px-2 opacity-55" variant="ghost">
          <MessageSquareText /> Comment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
          <DialogDescription>Write a comment on this post.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="commentImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-72">
                      <FileUploaderComment
                        onFieldChange={field.onChange}
                        imageUrl={field.value || ""}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 flex-row flex-wrap">
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Type your comment..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogClose>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={
                      !form.formState.isDirty || form.formState.isSubmitting
                    }
                  >
                    {isUploading ? (
                      <Upload className="animate-pulse" />
                    ) : form.formState.isSubmitting ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <Send />
                    )}
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentButton;
