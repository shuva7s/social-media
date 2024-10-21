import CommentsLoader from "@/components/loaders/CommentsLoader";
import PostDetailCard from "@/components/shared/Cards/PostDetailCard";
import CommentsContainer from "@/components/shared/CommentsContainer";
import { Suspense } from "react";

export default function SpecificPost({
  params,
}: {
  params: { postId: string, userName: string };
}) {
  return (
    <main className="flex-1 mb-20">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <PostDetailCard postIdString={params.postId} />
        <section className="w-full min-h-[50vh]">
          <h3 className="text-2xl font-bold my-3">Comments</h3>

          <Suspense fallback={<CommentsLoader />}>
            <CommentsContainer postIdString={params.postId} postCreatorUsername={params.userName} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
