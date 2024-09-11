"use client";

import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

const FileUploader = () => {
  return (
    <div className="w-full">
      <UploadDropzone
        className="bg-white w-full"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default FileUploader;
