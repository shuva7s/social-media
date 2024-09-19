import { Skeleton } from "../ui/skeleton";

const PostsContainerLoad = () => {
  return (
    <div className="columns-1 md:columns-2 xl:columns-3 space-y-2 gap-2 mt-4">
      <Skeleton className="min-h-96 break-inside-avoid" />
      <Skeleton className="min-h-32 break-inside-avoid" />
      <Skeleton className="min-h-64 break-inside-avoid" />
      <Skeleton className="min-h-72 break-inside-avoid" />
      <Skeleton className="min-h-80 break-inside-avoid" />
      <Skeleton className="min-h-64 break-inside-avoid" />
      <Skeleton className="min-h-96 break-inside-avoid" />
      <Skeleton className="min-h-32 break-inside-avoid" />
      <Skeleton className="min-h-64 break-inside-avoid" />
      <Skeleton className="min-h-72 break-inside-avoid" />
      <Skeleton className="min-h-80 break-inside-avoid" />
    </div>
  );
};

export default PostsContainerLoad;
