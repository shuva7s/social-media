import CreateCommunityForm from "@/components/forms/CreateCommunityForm";

export default function CreateCommunity() {
  return (
    <main className="flex-1 mb-24">
      <h1 className="text-3xl font-semibold mt-4 text-foreground/60">
        Create Community
      </h1>
      <CreateCommunityForm />
    </main>
  );
}
