import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/ModeToggle";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8", // Custom width and height
    },
  };
  return (
    <header className="sticky top-0 z-50 bg-accent/80 rounded-b-2xl px-6 bg-blur">
      <nav className="flex flex-row justify-between items-center navbar">
        <p>LOGO</p>
        <div className="flex flex-row gap-3">
          <SignedIn>
            <Button asChild>
              <Link href="/create-post">Create post</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button>
              <SignInButton>Sign In</SignInButton>
            </Button>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
