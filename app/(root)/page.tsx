import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";

export default async function rootPage() {
  return (
    <main>
      <SignedIn>
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-4xl"></p>
          <SignOutButton>
            <Button>Sign In</Button>
          </SignOutButton>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
          <p className="font-semibold text-3xl text-muted-foreground transition-all hover:text-primary">You are missing out...!!</p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}
