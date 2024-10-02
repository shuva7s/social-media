import PostsContainerLoad from "@/components/loaders/PostsContainerLoad";
import PostsContainer from "@/components/shared/PostsContainer";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Suspense } from "react";

export default async function rootPage() {
  return (
    <main className="min-h-screen flex-1 mb-32">
      <SignedIn>
        <section>
          <Suspense fallback={<PostsContainerLoad />}>
            <PostsContainer type="normal" />
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
