import CommentButton from "@/components/action-buttons/CommentButton";
import CommentsLoader from "@/components/loaders/CommentsLoader";
import CommentCard from "@/components/shared/Cards/CommentCard";
import PostDetailCard from "@/components/shared/Cards/PostDetailCard";
import CommentsContainer from "@/components/shared/CommentsContainer";
import { Suspense } from "react";

export default function SpecificPost({
  params,
}: {
  params: { postId: string };
}) {
  return (
    <main className="flex-1">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <PostDetailCard postIdString={params.postId} />
        <section className="w-full post-detail-card min-h-[50vh]">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold my-3">Comments</h3>
            <CommentButton parentPostId={params.postId} type="create" />
          </div>
          <Suspense fallback={<CommentsLoader />}>
            <CommentsContainer postIdString={params.postId} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
