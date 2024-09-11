import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/ModeToggle";

const Navbar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8", // Custom width and height
    },
  };
  return (
    <header className="shadow-sm">
      <nav className="flex flex-row justify-between items-center py-4">
        <p>LOGO</p>
        <div className="flex flex-row gap-3">
          <ModeToggle />
          <SignedIn>
            <UserButton appearance={userButtonAppearance} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
