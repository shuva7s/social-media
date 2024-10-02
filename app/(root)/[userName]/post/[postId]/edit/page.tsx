import PostForm from "@/components/forms/PostForm";
import { PostFormLoad } from "@/components/loaders/PostFormLoad";
import { checkUserAccess } from "@/lib/actions/post.actions";
import { Suspense } from "react";
async function CheckAccessAndRenderForm({
  postId,
  username,
}: {
  postId: string;
  username: string;
}) {
  try {
    const res = await checkUserAccess({ postId });
    if (res.success) {
      return <PostForm type="edit" postId={postId} username={username} />;
    } else {
      return (
        <div className="mt-4 text-red-500 p-6 rounded-full bg-destructive/50 border border-destructive">
          {res.message}
        </div>
      );
    }
  } catch (error) {}
}
export default function EditPost({
  params,
}: {
  params: { postId: string; userName: string };
}) {
  return (
    <main className="flex-1 mb-24">
      <h1 className="text-3xl font-semibold mt-4 text-foreground/60">
        Edit post
      </h1>
      <Suspense fallback={<PostFormLoad />}>
        <CheckAccessAndRenderForm
          postId={params.postId}
          username={params.userName}
        />
      </Suspense>
    </main>
  );
}
