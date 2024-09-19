"use client";
import { Loader } from "lucide-react";
import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomableImageDialogProps {
  imageSrc: string;
  altText: string;
}

const ZoomableImageDialog = ({
  imageSrc,
  altText,
}: ZoomableImageDialogProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={3}
      disablePadding
      wheel={{ step: 0.2 }}
      pinch={{ step: 5 }}
    >
      <div className="relative h-full">
        {isLoading && (
          <div className="h-[30vh] fl-center">
            <Loader className="w-10 h-10 text-primary animate-spin" />
          </div>
        )}

        <TransformComponent>
          <img
            src={imageSrc}
            alt={altText}
            className="w-[100vw] h-full max-h-[80vh] object-contain"
            onLoad={() => setIsLoading(false)}
          />
        </TransformComponent>
      </div>
    </TransformWrapper>
  );
};

export default ZoomableImageDialog;
