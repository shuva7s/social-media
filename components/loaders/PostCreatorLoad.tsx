import React from "react";
import { CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const PostCreatorLoad = () => {
  return (
    <CardHeader className="px-4 py-3">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </CardHeader>
  );
};

export default PostCreatorLoad;
