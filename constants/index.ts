import { Home, Users, PlusCircle, Settings, User } from "lucide-react";
let navlinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Create Post",
    href: "/create-post",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

let bottomBarLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Communities",
    href: "/communities",
    icon: Users,
  },
  {
    name: "Create Post",
    href: "/create-post",
    icon: PlusCircle,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export { navlinks, bottomBarLinks };
