"use client";
import { useState, useEffect } from "react";
import { Loader, MessageSquareText, Send, Upload, Pencil } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { createPost, updatePost } from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  imageField: z.string(),
  textField: z.string(),
});

const Create_Update_Post_Comment = ({
  isPost = true,
  type,
  previousId,
  previousPhoto = "",
  previousMessage = "",
  parentPostId,
  username,
}: {
  isPost: boolean;
  type: "create" | "update";
  previousId?: string;
  previousPhoto?: string;
  previousMessage?: string;
  parentPostId?: string; // it is only for comments
  username?: string; // After update to revalidate the post path we will use this
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageField: previousPhoto || "",
      textField: previousMessage || "",
    },
  });

  useEffect(() => {
    // Reset form when previousPhoto or previousMessage changes
    form.reset({
      imageField: previousPhoto || "",
      textField: previousMessage || "",
    });
  }, [previousPhoto, previousMessage]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length > 0) {
      setIsUploading(true);
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsUploading(false);
        return;
      }

      values.imageField = uploadedImages[0].url;
      setIsUploading(false);
    }

    try {
      let response;

      if (isPost) {
        if (type === "create") {
          // Create post
          response = await createPost({
            isPost: true,
            message: values.textField,
            postImage: values.imageField,
            parentPost: null,
          });
        } else if (type === "update" && previousId && username) {
          // Update post
          response = await updatePost({
            isPost: true,
            postId: previousId,
            username,
            message: values.textField,
            postImage: values.imageField,
          });
        }
      } else {
        if (type === "create" && parentPostId) {
          // Create comment
          response = await createPost({
            isPost: false,
            message: values.textField,
            postImage: values.imageField,
            parentPost: parentPostId,
          });
        } else if (type === "update" && previousId && username) {
          // Update comment
          response = await updatePost({
            isPost: false,
            postId: previousId,
            username,
            message: values.textField,
            postImage: values.imageField,
          });
        }
      }

      if (response?.success) {
        toast({
          title: `${isPost ? "Post" : "Comment"} ${
            type === "create" ? "Created" : "Updated"
          }`,
          description: response.message,
        });
        form.reset(); // Reset form after successful update or creation
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: response!.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "No response",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isPost && type === "create" ? "default" : "ghost"}
          size={type === "update" ? "icon" : "default"}
          className={`opacity-60 gap-2 ${type === "update" && "p-2.5"} ${
            isPost && type === "create" && "opacity-100"
          }`}
        >
          {isPost ? (
            type === "create" ? (
              "Create Post"
            ) : (
              <Pencil />
            )
          ) : type === "create" ? (
            <>
              <MessageSquareText /> Add comment
            </>
          ) : (
            <Pencil />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create" : "Update"}
            {isPost ? " Post" : " Comment"}
          </DialogTitle>
          <DialogDescription>Some description</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="imageField"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="h-72">
                      <FileUploaderComment
                        onFieldChange={field.onChange}
                        imageUrl={field.value || ""}
                        setFiles={setFiles}
                        disabled={isUploading || form.formState.isSubmitting} // Disable while uploading
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 flex-row flex-wrap">
                <FormField
                  control={form.control}
                  name="textField"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Type your comment..."
                          {...field}
                          value={field.value}
                          disabled={isUploading || form.formState.isSubmitting} // Disable input while uploading
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogClose asChild>
                  <Button
                    type="submit"
                    size="icon"
                    disabled={
                      !form.formState.isDirty ||
                      form.formState.isSubmitting ||
                      isUploading // Disable button while uploading
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

export default Create_Update_Post_Comment;
