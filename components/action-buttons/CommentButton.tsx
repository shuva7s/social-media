// "use client";
// import { useState } from "react";
// import { Loader, MessageSquareText, Send, Upload, Pencil } from "lucide-react";
// import { Button } from "../ui/button";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "../ui/input";
// import { FileUploaderComment } from "../shared/FileUploaderComment";
// import { useToast } from "@/hooks/use-toast";
// import { useUploadThing } from "@/lib/uploadthing";
// import { createPost } from "@/lib/actions/post.actions";
// import { useRouter } from "next/navigation";

// const formSchema = z.object({
//   commentImage: z.string(),
//   comment: z.string(),
// });

// const CommentButton = ({
//   parentPostId,
//   commId,
//   commentPhoto,
//   commentMessage,
//   type,
// }: {
//   parentPostId?: string;
//   commId?: string;
//   commentPhoto?: string;
//   commentMessage?: string;
//   type: "create" | "update";
// }) => {
//   const [files, setFiles] = useState<File[]>([]); // Manage file state
//   const [isUploading, setIsUploading] = useState(false);
//   const { toast } = useToast();
//   const router = useRouter();
//   const { startUpload } = useUploadThing("imageUploader");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       commentImage: "",
//       comment: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (files.length > 0) {
//       setIsUploading(true); // Start the image upload process
//       const uploadedImages = await startUpload(files);

//       if (!uploadedImages) {
//         setIsUploading(false);
//         return;
//       }

//       values.commentImage = uploadedImages[0].url;
//       setIsUploading(false); // Upload completed
//     }
//     let res;
//     if (type === "create" && parentPostId) {
//       try {
//         res = await createPost({
//           message: values.comment,
//           postImage: values.commentImage,
//           parentPost: parentPostId,
//         });
//         if (res.success) {
//           form.reset();
//           setFiles([]);
//           form.setValue("commentImage", "");
//           router.refresh();
//           toast({
//             title: "Comment added",
//             description: "Your comment was added successfully",
//           });
//         } else {
//           toast({
//             title: "Error",
//             description: res.message,
//             variant: "destructive",
//           });
//         }
//       } catch (error) {}
//     } else if (type === "update" && commId) {
//       try {
//       } catch (error) {}
//     }
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="gap-2 px-2 opacity-55" variant="ghost">
//           {type === "create" ? (
//             <>
//               <MessageSquareText /> Comment
//             </>
//           ) : (
//             <Pencil />
//           )}
//         </Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Comment</DialogTitle>
//           <DialogDescription>Write a comment on this post.</DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className="flex flex-col gap-2">
//               <FormField
//                 control={form.control}
//                 name="commentImage"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl className="h-72">
//                       <FileUploaderComment
//                         onFieldChange={field.onChange}
//                         imageUrl={field.value || ""}
//                         setFiles={setFiles}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className="flex gap-2 flex-row flex-wrap">
//                 <FormField
//                   control={form.control}
//                   name="comment"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormControl>
//                         <Input placeholder="Type your comment..." {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <DialogClose>
//                   <Button
//                     type="submit"
//                     size="icon"
//                     disabled={
//                       !form.formState.isDirty || form.formState.isSubmitting
//                     }
//                   >
//                     {isUploading ? (
//                       <Upload className="animate-pulse" />
//                     ) : form.formState.isSubmitting ? (
//                       <Loader className="animate-spin" />
//                     ) : (
//                       <Send />
//                     )}
//                   </Button>
//                 </DialogClose>
//               </div>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CommentButton;

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
  commentImage: z.string(),
  comment: z.string(),
});

const CommentButton = ({
  parentPostId,
  type,
  commId,
  commentPhoto = "", // Default to an empty string
  commentMessage = "", // Default to an empty string
}: {
  parentPostId: string;
  type: "create" | "update";
  commId?: string;
  commentPhoto?: string;
  commentMessage?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commentImage: commentPhoto || "", // Use the existing comment image if available
      comment: commentMessage || "", // Use the existing comment message if available
    },
  });

  // Update form values when editing a comment
  useEffect(() => {
    if (type === "update") {
      form.setValue("commentImage", commentPhoto || "");
      form.setValue("comment", commentMessage || "");
    }
  }, [commentPhoto, commentMessage, type, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length > 0) {
      setIsUploading(true);
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsUploading(false);
        return;
      }

      values.commentImage = uploadedImages[0].url;
      setIsUploading(false);
    }

    let res;
    if (type === "create" && parentPostId) {
      try {
        res = await createPost({
          message: values.comment,
          postImage: values.commentImage,
          parentPost: parentPostId,
        });
        if (res.success) {
          form.reset();
          setFiles([]);
          router.refresh();
          toast({
            title: "Comment added",
            description: "Your comment was added successfully",
          });
        } else {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {}
    } else if (type === "update" && commId) {
      console.log("trying to update");
      try {
        res = await updatePost({
          postId: commId,
          message: values.comment,
          postImage: values.commentImage,
        });
        if (res.success) {
          toast({
            title: "Comment updated",
            description: "Your comment was updated successfully",
          });
          form.reset();
          router.refresh();
        } else {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong while updating the comment",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 px-2 opacity-55" variant="ghost">
          {type === "create" ? (
            <>
              <MessageSquareText /> Comment
            </>
          ) : (
            <Pencil />
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Comment" : "Update Comment"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Write a comment on this post."
              : "Update your comment."}
          </DialogDescription>
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
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Type your comment..."
                          {...field}
                          disabled={isUploading || form.formState.isSubmitting} // Disable input while uploading
                        />
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

export default CommentButton;
