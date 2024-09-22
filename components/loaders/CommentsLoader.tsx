import React from "react";
import { Skeleton } from "../ui/skeleton";

const CommentsLoader = () => {
  return <div className="flex flex-col gap-2">
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
  </div>;
};

export default CommentsLoader;
