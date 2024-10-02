import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/ModeToggle";
import SideBarButtons from "./SideBarButtons";

const Sidebar = () => {
  const userButtonAppearance = {
    elements: {
      userButtonAvatarBox: "w-8 h-8",
    },
  };
  return (
    <aside className="w-64 hidden lg:flex-shrink-0 lg:flex lg:flex-col">
      <nav className="sidebar-content flex flex-col justify-between gap-2 px-2">
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
