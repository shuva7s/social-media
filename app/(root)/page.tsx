import PostsContainerLoad from "@/components/loaders/PostsContainerLoad";
import PostsContainer from "@/components/shared/PostsContainer";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Suspense } from "react";

export default async function rootPage() {
  return (
    <main>
      <SignedIn>
        <section>
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-3xl font-semibold">Posts</h2>
            <Button asChild>
              <Link href={"/create-post"}>Create post</Link>
            </Button>
          </div>
          <Suspense fallback={<PostsContainerLoad />}>
            <PostsContainer userObjectId={null} />
          </Suspense>
        </section>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-3xl text-muted-foreground transition-all hover:text-primary">
            You are missing out...!!
          </p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}
