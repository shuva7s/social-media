"use client";
import { useEffect, useState } from "react";
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
import {
  createPost,
  getPostById,
  updatePost,
} from "@/lib/actions/post.actions";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "../shared/FileUploader";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/lib/utils";

const formSchema = z.object({
  postImage: z.string(),
  message: z.string(),
});

const PostForm = ({
  type,
  postId,
  username,
}: {
  type: "create" | "edit";
  postId?: string;
  username?: string;
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

  // Fetch post data if type is "edit"
  useEffect(() => {
    if (type === "edit" && postId) {
      (async () => {
        try {
          const response = await getPostById(postId);
          if (response.success && response.postData) {
            form.reset({
              postImage: response.postData.postImage || "",
              message: response.postData.message || "",
            });
          }
        } catch (error) {
          handleError(error);
        }
      })();
    }
  }, [type, postId, form]);

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
      let res;
      if (type === "create") {
        res = await createPost({
          ...values,
          parentPost: null,
          isPost: true,
        });
      } else if (type === "edit" && postId && username) {
        res = await updatePost({
          isPost: true,
          postId,
          username,
          message: values.message,
          postImage: values.postImage,
        });
      }

      form.reset();
      setFiles([]);
      form.setValue("postImage", "");
      router.back();

      if (res?.success) {
        toast({
          title: res.message,
        });
      } else {
        toast({
          title: res?.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
            e.preventDefault();
          }
        }}
        className="space-y-8 mt-6"
      >
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
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="rounded-2xl py-6"
                  placeholder="Enter your message"
                  {...field}
                />
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
          className="button col-span-2 w-full py-6 rounded-2xl"
        >
          {isUploading
            ? "Uploading image..."
            : form.formState.isSubmitting
            ? type === "create"
              ? "Creating post..."
              : "Updating post..."
            : type === "create"
            ? "Create Post"
            : "Update Post"}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
