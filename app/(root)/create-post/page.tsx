import CreatePostForm from "@/components/forms/CreatePostForm";
import { PostFormLoad } from "@/components/loaders/PostFormLoad";
import { getUserObjectId } from "@/lib/actions/user.actions";
import { Suspense } from "react";

async function RenderForm() {
  let creatorObjId = await getUserObjectId();
  return <CreatePostForm parentPost={null} />;
  // <CreatePostForm creatorObjId={creatorObjId} parentPost={null} />;
}
export default function CreatePost() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-semibold mt-4 text-foreground/60">
        Create Post
      </h1>
      <Suspense fallback={<PostFormLoad />}>
        <RenderForm />
      </Suspense>
    </main>
  );
}
