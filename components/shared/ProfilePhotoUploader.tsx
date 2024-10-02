"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { ImageUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function ProfilePhotoUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const { toast } = useToast();
  const MAX_FILE_SIZE_MB = 4; // 4MB file size limit
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        // Check if the file exceeds the size limit
        if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
          // Show an alert for the size limit
          toast({
            title: "File too large",
            description: `The selected file is too large. Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`,
            variant: "destructive",
          });
          return;
        }

        setFiles([selectedFile]); // Only set the first file
        onFieldChange(convertFileToUrl(selectedFile)); // Set the image URL for the first file
      }
    },
    [onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
    accept: generateClientDropzoneAccept(["image/*"]),
  });

  return (
    <div
      {...getRootProps()}
      className="w-fit flex flex-col md:flex-row gap-3 items-center"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {imageUrl ? (
        <div className="w-36 h-36 border rounded-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      ) : (
        <>
          <div className="w-36 h-36 border rounded-full flex items-center justify-center">
            <ImageUp className="w-10 h-10 opacity-50" />
          </div>

          <Button type="button" className="rounded-full">
            Select from device
          </Button>
        </>
      )}
    </div>
  );
}
