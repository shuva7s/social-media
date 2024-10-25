import PostForm from "@/components/forms/PostForm";
import { PostFormLoad } from "@/components/loaders/PostFormLoad";
import { Suspense } from "react";

async function RenderForm() {
  return <PostForm />;
}
export default function CreatePost() {
  return (
    <main className="flex-1 mb-24">
      <h1 className="text-3xl font-semibold mt-4 text-foreground/60">
        Create Post
      </h1>
      <Suspense fallback={<PostFormLoad />}>
        <RenderForm />
      </Suspense>
    </main>
  );
}
