"use client";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomableImageDialogProps {
  imageSrc: string;
  altText: string;
}

const ZoomableImageDialog = ({
  imageSrc,
  altText,
}: ZoomableImageDialogProps) => {
  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={3} disablePadding>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <div className="relative h-full">
          <TransformComponent>
            <img
              src={imageSrc}
              alt={altText}
              className="w-[100vw] h-full max-h-[80vh] object-contain"
            />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default ZoomableImageDialog;

