import { Home, Users, PlusCircle, Settings, User } from "lucide-react";
let navlinks = [
  {
    name: "Home",
    icon: Home,
    href: "/",
  },
  {
    name: "Create Post",
    icon: PlusCircle,
    href: "/create-post",
  },
  {
    name: "Communities",
    icon: Users,
    href: "/communities",
  },
  {
    name: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
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
