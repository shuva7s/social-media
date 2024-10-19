// "use client";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useUploadThing } from "@/lib/uploadthing";
// import { useToast } from "@/hooks/use-toast";
// import { handleError } from "@/lib/utils";
// import { ProfilePhotoUploader } from "../shared/ProfilePhotoUploader";
// import { createComunity } from "@/lib/actions/community.actions";

// const formSchema = z.object({
//   communityImage: z.string(),
//   communityName: z
//     .string()
//     .max(50, "Community name must contain at most 50 characters"),
//   communityDescription: z
//     .string()
//     .max(500, "Community description must contain at most 500 characters"),
// });

// const CreateCommunityForm = () => {
//   const [files, setFiles] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const { startUpload } = useUploadThing("imageUploader");

//   const { toast } = useToast();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       communityImage: "",
//       communityName: "",
//       communityDescription: "",
//     },
//   });

//   // Submit handler
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     if (files.length > 0) {
//       setIsUploading(true);
//       const uploadedImages = await startUpload(files);
//       if (!uploadedImages) {
//         setIsUploading(false);
//         return;
//       }
//       values.communityImage = uploadedImages[0].url;
//       setIsUploading(false);
//     }
//     try {
//       const res = await createComunity({
//         name: values.communityName,
//         description: values.communityDescription,
//         photo: values.communityImage,
//       });

//       form.reset();
//       setFiles([]);
//       form.setValue("communityImage", "");
//       router.push(`/communities/${res.key}`);
//       if (res.success) {
//         toast({
//           title: "Community created",
//           description: "New community has been created successfully.",
//         });
//       } else {
//         toast({
//           title: res.message,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       handleError(error);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
//         <FormField
//           control={form.control}
//           name="communityImage"
//           render={({ field }) => (
//             <FormItem className="w-full">
//               <FormLabel className="text-lg text-muted-foreground font-semibold">
//                 Community profile photo
//               </FormLabel>
//               <FormControl>
//                 <div className="flex justify-center md:justify-start">
//                   <ProfilePhotoUploader
//                     onFieldChange={field.onChange}
//                     imageUrl={field.value || ""}
//                     setFiles={setFiles}
//                   />
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="communityName"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-lg text-muted-foreground font-semibold">
//                 Community name
//               </FormLabel>

//               <FormControl>
//                 <Input
//                   className="rounded-2xl py-6"
//                   placeholder="Enter community name"
//                   {...field}
//                   required
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="communityDescription"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-lg text-muted-foreground font-semibold">
//                 Community description
//               </FormLabel>

//               <FormControl>
//                 <Input
//                   className="rounded-2xl py-6"
//                   placeholder="Enter community description"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           type="submit"
//           size="lg"
//           disabled={!form.formState.isDirty || form.formState.isSubmitting}
//           className="button col-span-2 w-full py-6 rounded-2xl"
//         >
//           {isUploading
//             ? "Uploading photo..."
//             : form.formState.isSubmitting
//             ? "Creating community..."
//             : "Create community"}
//         </Button>
//       </form>
//     </Form>
//   );
// };

// export default CreateCommunityForm;

"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { handleError } from "@/lib/utils";
import { ProfilePhotoUploader } from "../shared/ProfilePhotoUploader";
import { createCommunity } from "@/lib/actions/community.actions";
import { Checkbox } from "../ui/checkbox"; // Importing Checkbox component

// Define the schema for form validation using Zod
const formSchema = z.object({
  communityImage: z.string(),
  communityName: z
    .string()
    .max(50, "Community name must contain at most 50 characters"),
  communityDescription: z
    .string()
    .max(500, "Community description must contain at most 500 characters"),
  isPrivate: z.boolean().default(false), // Add field for private/public toggle
});

const CreateCommunityForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("imageUploader");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      communityImage: "",
      communityName: "",
      communityDescription: "",
      isPrivate: false,
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files.length > 0) {
      setIsUploading(true);
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        setIsUploading(false);
        return;
      }
      values.communityImage = uploadedImages[0].url;
      setIsUploading(false);
    }

    try {
      const res = await createCommunity({
        name: values.communityName,
        description: values.communityDescription,
        photo: values.communityImage,
        isPublic: !values.isPrivate,
      });

      form.reset();
      setFiles([]);
      form.setValue("communityImage", "");
      router.push(`/communities/${res.key}`);
      if (res.success) {
        toast({
          title: "Community created",
          description: "New community has been created successfully.",
        });
      } else {
        toast({
          title: res.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        {/* Profile Photo Uploader */}
        <FormField
          control={form.control}
          name="communityImage"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-muted-foreground font-semibold">
                Community profile photo
              </FormLabel>
              <FormControl>
                <div className="flex justify-center md:justify-start">
                  <ProfilePhotoUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value || ""}
                    setFiles={setFiles}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Community Name Input */}
        <FormField
          control={form.control}
          name="communityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-muted-foreground font-semibold">
                Community name
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-2xl py-6"
                  placeholder="Enter community name"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Community Description Input */}
        <FormField
          control={form.control}
          name="communityDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg text-muted-foreground font-semibold">
                Community description
              </FormLabel>
              <FormControl>
                <Input
                  className="rounded-2xl py-6"
                  placeholder="Enter community description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Checkbox for Private/Public Toggle */}
        <FormField
          control={form.control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-lg text-muted-foreground font-semibold">
                Private Community
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded-sm"
                    />
                  </FormControl>
                  <FormDescription className="font-normal">
                    Check if you want your community to be private.
                  </FormDescription>
                </div>
              </FormLabel>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          className="button col-span-2 w-full py-6 rounded-2xl"
        >
          {isUploading
            ? "Uploading photo..."
            : form.formState.isSubmitting
            ? "Creating community..."
            : "Create community"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCommunityForm;
