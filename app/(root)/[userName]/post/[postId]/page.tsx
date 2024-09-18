import CommentCard from "@/components/shared/Cards/CommentCard";
import PostDetailCard from "@/components/shared/Cards/PostDetailCard";

export default function SpecificPost({
  params,
}: {
  params: { postId: string };
}) {
  return (
    <main className="mt-2">
      <div className="w-full flex flex-col md:flex-row gap-2">
        <PostDetailCard postIdString={params.postId} />
        <section className="w-full post-detail-card min-h-[50vh]">
          <h3 className="text-2xl font-bold my-3">Comments</h3>
          <div className="flex flex-col gap-2">
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
            <div className="px-2 py-8 bg-accent/60 rounded-md">Comment</div>
          </div>
        </section>
      </div>
    </main>
  );
}
