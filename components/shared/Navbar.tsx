import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import CreatePostRedirect from "../action-buttons/CreatePostRedirect";

const Navbar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8", // Custom width and height
    },
  };
  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-background rounded-b-2xl px-6 border-b">
      <nav className="flex flex-row justify-between items-center navbar">
        <p>LOGO</p>
        <SignedIn>
          <CreatePostRedirect />
        </SignedIn>
        <SignedOut>
          <Button>
            <SignInButton>Sign In</SignInButton>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Navbar;
