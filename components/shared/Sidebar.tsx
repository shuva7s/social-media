import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/ModeToggle";
import SideBarButtons from "./SideBarButtons";

const Sidebar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8", // Custom width and height
    },
  };
  return (
    <aside className="w-64 min-h-screen hidden lg:flex-shrink-0 lg:flex lg:flex-col">
      <nav className="sidebar-content rounded-t-2xl bg-accent/50 flex flex-col justify-between gap-2 p-2 ">
        <SideBarButtons />
        <div className="w-full flex flex-row gap-2 opacity-30 hover:opacity-100 transition-all">
          <ModeToggle />
          <SignedIn>
            <UserButton appearance={userButtonAppearance} />
          </SignedIn>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
