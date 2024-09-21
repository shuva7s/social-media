"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Paperclip } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploaderComment({
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

  if (imageUrl) {
    return (
      <div
        {...getRootProps()}
        className="w-full border p-4 rounded-2xl"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="flex flex-1 w-full max-h-[400px]">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-contain"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} className="cursor-pointer" />
        <Button variant="outline" size="icon">
          <Paperclip />
        </Button>
      </div>
    );
  }
}
