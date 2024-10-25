// "use client";
// import { useCallback, Dispatch, SetStateAction } from "react";
// import { useDropzone } from "@uploadthing/react/hooks";
// import { generateClientDropzoneAccept } from "uploadthing/client";

// import { Button } from "@/components/ui/button";
// import { convertFileToUrl } from "@/lib/utils";
// import Image from "next/image";
// import { useToast } from "@/hooks/use-toast";
// import { X } from "lucide-react";

// type FileUploaderProps = {
//   onFieldChange: (url: string) => void;
//   imageUrl: string;
//   setFiles: Dispatch<SetStateAction<File[]>>;
//   disabled?: boolean;
// };

// export function FileUploader({
//   imageUrl,
//   onFieldChange,
//   setFiles,
//   disabled = false,
// }: FileUploaderProps) {
//   const { toast } = useToast();
//   const MAX_FILE_SIZE_MB = 4;
//   const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

//   const onDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (acceptedFiles.length > 0) {
//         const selectedFile = acceptedFiles[0];

//         if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
//           toast({
//             title: "File too large",
//             description: `The selected file is too large. Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`,
//             variant: "destructive",
//           });
//           return;
//         }

//         setFiles([selectedFile]);
//         onFieldChange(convertFileToUrl(selectedFile));
//       }
//     },
//     [onFieldChange, setFiles, toast]
//   );

//   const handleDeselectImage = () => {
//     if (disabled) return;
//     setFiles([]);
//     onFieldChange("");
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: generateClientDropzoneAccept(["image/*"]),
//     disabled
//   });

//   return (
//     <div
//       {...getRootProps()}
//       onKeyDown={handleKeyDown}
//       className={`flex border justify-center py-8 rounded-2xl relative cursor-pointer ${
//         disabled && "opacity-50 cursor-not-allowed"
//       }`}
//     >
//       <input {...getInputProps()} disabled={disabled} />

//       {imageUrl ? (
//         <div className="flex flex-col items-center w-full h-full">
//           <img
//             src={imageUrl}
//             alt="Selected"
//             width={250}
//             height={250}
//             className="w-full object-cover object-center"
//           />
//           <Button
//             variant="secondary"
//             className="absolute top-3 right-3 rounded-full w-16 h-16 p-0"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleDeselectImage();
//             }}
//           >
//             <X className="w-8 h-8 opacity-80" />
//           </Button>
//         </div>
//       ) : (
//         <div className="flex flex-col justify-center items-center py-5">
//           <Image
//             src="/upload.svg"
//             width={77}
//             height={77}
//             alt="file upload"
//             priority={true}
//           />
//           <h3 className="mb-2 mt-2">Drag photo here or click to select</h3>
//           <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
//           <Button type="button" className="rounded-full">
//             Select from device
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  disabled?: boolean;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  disabled = false,
}: FileUploaderProps) {
  const { toast } = useToast();
  const MAX_FILE_SIZE_MB = 4;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
          toast({
            title: "File too large",
            description: `The selected file is too large. Maximum size allowed is ${MAX_FILE_SIZE_MB}MB.`,
            variant: "destructive",
          });
          return;
        }

        setFiles([selectedFile]);
        onFieldChange(convertFileToUrl(selectedFile));
      }
    },
    [onFieldChange, setFiles, toast]
  );

  const handleDeselectImage = () => {
    if (disabled) return;
    setFiles([]);
    onFieldChange("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(["image/*"]),
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className={`flex border justify-center py-8 rounded-2xl relative cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input {...getInputProps()} disabled={disabled} />

      {imageUrl ? (
        <div className="flex flex-col items-center w-full h-full relative">
          <Image
            src={imageUrl}
            alt="Selected"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
          {!disabled && ( // Only show the button if not disabled
            <Button
              variant="secondary"
              className="absolute top-3 right-3 rounded-full w-16 h-16 p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleDeselectImage();
              }}
            >
              <X className="w-8 h-8 opacity-80" />
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-5">
          <Image
            src="/upload.svg"
            width={77}
            height={77}
            alt="file upload"
            priority={true}
          />
          <h3 className="mb-2 mt-2">Drag photo here or click to select</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full" disabled={disabled}>
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}

