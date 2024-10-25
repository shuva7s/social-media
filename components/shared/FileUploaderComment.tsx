"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Paperclip, X } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean; // Add a disabled prop
};


export function FileUploaderComment({
  imageUrl,
  onFieldChange,
  setFiles,
  disabled = false, // Default to false if not provided
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
    [onFieldChange, setFiles, toast]
  );

  // Handle image deselection
  const handleDeselectImage = () => {
    if (disabled) return; // Prevent deselecting while disabled
    setFiles([]); // Clear the files
    onFieldChange(""); // Reset the image URL
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
    disabled, // Disable dropzone when disabled is true
  });

  return (
    <div
      {...getRootProps()}
      className={`flex justify-center py-8 rounded-2xl relative ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer" disabled={disabled} />

      {imageUrl ? (
        <div className="flex flex-1 w-full max-h-[400px] relative">
          <Image
            src={imageUrl}
            alt="Selected Image"
            width={250}
            height={250}
            className="w-full object-contain"
          />
          {!disabled && (
            <Button
              variant="secondary"
              className="absolute top-3 right-3 rounded-full p-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the dropzone
                handleDeselectImage();
              }}
            >
              <X className="w-5 h-5 opacity-80" />
            </Button>
          )}
        </div>
      ) : (
        <div className="p-10 border-2 border-dotted rounded-full">
          <Paperclip className="opacity-50 hover:opacity-100 transition-all" />
        </div>
      )}
    </div>
  );
}