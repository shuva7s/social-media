import CommunitiesLoad from "@/components/loaders/CommunitiesLoad";
import CommunitiesRender from "@/components/shared/CommunitiesRender";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

export default function Communities() {
  return (
    <main className="flex-1 mb-24">
      <div className="flex gap-4 items-cente flex-wrap mt-4">
        <h1 className="text-3xl font-semibold text-foreground/60">
          Communities
        </h1>

        <Button asChild size="icon" className="rounded-full text-secondary border-2 border-secondary hover:text-primary hover:border-primary" variant="ghost">
          <Link href="/communities/create">
            <Plus />
          </Link>
        </Button>
      </div>

      <Suspense fallback={<CommunitiesLoad />}>
        <CommunitiesRender />
      </Suspense>
    </main>
  );
}
