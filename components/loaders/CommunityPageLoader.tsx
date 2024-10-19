import { Skeleton } from "../ui/skeleton";
import PostsContainerLoad from "./PostsContainerLoad";

const CommunityPageLoader = () => {
  return (
    <>
      <section className="w-full flex flex-col items-center md:flex-row gap-8 mt-4 p-6 pt-0 border-b border-border/50">
        <Skeleton className="w-44 h-44 rounded-full" />

        <div className="flex flex-col items-center md:items-start">
          <Skeleton className="w-52 h-10 rounded-full" />
          <div className="flex gap-2 flex-row">
            <Skeleton className="w-20 h-5 rounded-full mt-3" />
            <Skeleton className="w-32 h-5 rounded-full mt-3" />
            <Skeleton className="w-10 h-5 rounded-full mt-3" />
            <Skeleton className="w-32 h-5 rounded-full mt-3" />
          </div>
          <Skeleton className="w-20 h-4 rounded-full mt-2" />
        </div>
      </section>
      <Skeleton className="w-full h-10 my-4"/>
      <PostsContainerLoad />
    </>
  );
};

export default CommunityPageLoader;
