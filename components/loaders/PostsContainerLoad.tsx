import { Skeleton } from "../ui/skeleton";

const PostsContainerLoad = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
      <Skeleton className="min-h-64" />
    </div>
  );
};

export default PostsContainerLoad;
