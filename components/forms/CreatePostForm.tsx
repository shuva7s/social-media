"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPost } from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "../shared/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/lib/utils";

const formSchema = z.object({
  postImage: z.string(),
  message: z.string(),
});

const CreatePostForm = ({
  // creatorObjId,
  parentPost,
}: {
  // creatorObjId: string;
  parentPost: string | null;
}) => {
  const [files, setFiles] = useState<File[]>([]); // Manage file state
  const [isUploading, setIsUploading] = useState(false); // Track image upload progress
  const { startUpload } = useUploadThing("imageUploader");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postImage: "",
      message: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length > 0) {
      setIsUploading(true); // Start the image upload process
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setIsUploading(false);
        return;
      }
      // Update values.postImage with the uploaded image URL
      values.postImage = uploadedImages[0].url;
      setIsUploading(false); // Upload completed
    }

    try {
      const res = await createPost({
        ...values,
        parentPost,
      });

      form.reset();
      router.push(`/`);
      router.refresh();

      if (res.message === "success") {
        toast({
          title: "Post created",
          description: "Your post has been created successfully",
        });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="postImage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value || ""}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message Input Field */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {isUploading
            ? "Uploading image..."
            : form.formState.isSubmitting
            ? "Creating post..."
            : "Create Post"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
