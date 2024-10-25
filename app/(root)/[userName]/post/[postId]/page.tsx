import CommentsLoader from "@/components/loaders/CommentsLoader";
import PostPageLoad from "@/components/loaders/PostPageLoad";
import PostDetailCard from "@/components/shared/Cards/PostDetailCard";
import CommentsContainer from "@/components/shared/CommentsContainer";
import { checkUserAccessToPostFunction } from "@/lib/actions/post.actions";
import { Suspense } from "react";

async function CheckUserAccessToPostAndRender({
  postId,
  userName,
}: {
  postId: string;
  userName: string;
}) {
  try {
    const { success, message, postData, isLiked, editable } =
      await checkUserAccessToPostFunction(postId);

    if (success) {
      return (
        <div className="w-full flex flex-col md:flex-row gap-2">
          <PostDetailCard
            post={postData}
            isLiked={isLiked}
            editable={editable!}
          />
          <section className="w-full min-h-[50vh]">
            <h3 className="text-2xl font-bold my-3">Comments</h3>
            <Suspense fallback={<CommentsLoader />}>
              <CommentsContainer
                postIdString={postId}
                postCreatorUsername={userName}
              />
            </Suspense>
          </section>
        </div>
      );
    } else {
      return <p className="text-red-500">Error: {message}</p>;
    }
  } catch (error) {
    return <p className="text-red-500">Error fetching post details</p>;
  }
}

export default function SpecificPost({
  params,
}: {
  params: { postId: string; userName: string };
}) {
  return (
    <main className="flex-1 mb-20">
      <Suspense fallback={<PostPageLoad />}>
        <CheckUserAccessToPostAndRender
          postId={params.postId}
          userName={params.userName}
        />
      </Suspense>
    </main>
  );
}
