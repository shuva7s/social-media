import PageLoad from "@/components/loaders/PageLoad";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="min-h-screen fl-center flex-1">
      <PageLoad />
    </main>
  );
}
